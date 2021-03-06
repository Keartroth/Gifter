﻿using Gifter.Models;
using Gifter.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace Gifter.Tests
{
    public class PostRepositoryTests : EFTestFixture
    {
        public PostRepositoryTests()
        {
            AddSampleData();
        }

        [Fact]
        public void Search_Should_Match_A_Posts_Title()
        {
            var repo = new PostRepository(_context);
            var results = repo.Search("Dude", 0, false);

            Assert.Equal(2, results.Count);
            Assert.Equal("El Duderino", results[0].Title);
            Assert.Equal("The Dude", results[1].Title);
        }

        [Fact]
        public void Search_Should_Match_A_Posts_Caption()
        {
            var repo = new PostRepository(_context);
            var results = repo.Search("it is no dream", 0, false);

            Assert.Equal(1, results.Count);
            Assert.Equal("If you will it, Dude, it is no dream", results[0].Caption);
        }

        [Fact]
        public void Search_Should_Return_Empty_List_If_No_Matches()
        {
            var repo = new PostRepository(_context);
            var results = repo.Search("foobarbazcatgrill", 0, false);

            Assert.NotNull(results);
            Assert.Empty(results);
        }

        [Fact]
        public void Search_Can_Return_Most_Recent_First()
        {
            var mostRecentTitle = "The Dude";
            var repo = new PostRepository(_context);
            var results = repo.Search("", 0, true);

            Assert.Equal(4, results.Count);
            Assert.Equal(mostRecentTitle, results[0].Title);
        }

        [Fact]
        public void Search_Should_Return_Post_With_UserProfile()
        {
            var repo = new PostRepository(_context);
            var results = repo.Search("", 0, true);

            Assert.Equal(4, results.Count);
            Assert.NotNull(results[0].UserProfile);
            Assert.NotNull(results[1].UserProfile);
            Assert.NotNull(results[2].UserProfile);
            Assert.NotNull(results[3].UserProfile);
        }

        [Fact]
        public void Search_Can_Return_Most_Recent_Last()
        {
            var mostRecentTitle = "The Dude";
            var repo = new PostRepository(_context);
            var results = repo.Search("", 0, false);

            Assert.Equal(4, results.Count);
            Assert.Equal(mostRecentTitle, results[3].Title);
        }

        [Fact]
        public void Search_Can_Return_All_Posts_By_User()
        {
            var userId = 1;
            var repo = new PostRepository(_context);
            var results = repo.Search("", 1, false);

            Assert.Equal(2, results.Count);
            Assert.Equal(userId, results[0].UserProfileId);
            Assert.Equal(userId, results[1].UserProfileId);
        }

        [Fact]
        public void User_Can_Delete_Post_Without_Comments()
        {
            var postIdWithoutComment = 1;
            var repo = new PostRepository(_context);

            // Attempt to delete it
            repo.Delete(postIdWithoutComment);

            // Now attempt to get it
            var result = repo.GetById(postIdWithoutComment);

            Assert.Null(result);
        }

        [Fact]
        public void User_Can_Delete_Post_With_Comment()
        {
            var postIdWithComment = 2;
            var repo = new PostRepository(_context);

            // Attempt to delete it
            repo.Delete(postIdWithComment);

            // Now attempt to get it
            var result = repo.GetById(postIdWithComment);

            Assert.Null(result);
        }

        [Fact]
        public void Posts_Should_Be_Ordered_Alphabetically_By_Title()
        {
            var userId = 1;
            var repo = new PostRepository(_context);

            // Now attempt to get it
            var results = repo.GetByUserProfileId(userId);

            Assert.NotNull(results);
            Assert.Equal("Opinions", results[0].Title);
            Assert.Equal("The Dude", results[1].Title);
            Assert.Equal(1, results[0].UserProfileId);
            Assert.Equal(1, results[1].UserProfileId);
        }

        [Fact]
        public void An_Empty_List_Should_Be_Returned_If_UserId_Does_Not_Exist()
        {
            var userId = 5;
            var repo = new PostRepository(_context);

            // Now attempt to get it
            var results = repo.GetByUserProfileId(userId);

            Assert.Equal(0, results.Count);
        }

        [Fact]
        public void Get_Most_Recent_Should_Return_One_Result()
        {
            var numResults = 1;
            var repo = new PostRepository(_context);

            var result = repo.GetMostRecent(numResults);

            Assert.Equal("The Dude", result[0].Title);
            Assert.Equal(1, result.Count);
        }

        [Fact]
        public void Get_Most_Recent_Should_Return_Three_Results()
        {
            var numResults = 3;
            var repo = new PostRepository(_context);

            var result = repo.GetMostRecent(numResults);

            Assert.Equal("The Dude", result[0].Title);
            Assert.Equal(3, result.Count);
        }

        [Fact]
        public void Get_Most_Recent_Should_Return_Maximum_Post_Count_If_Parameter_Exceeds_Post_Count()
        {
            var numResults = 100;
            var repo = new PostRepository(_context);

            var result = repo.GetMostRecent(numResults);

            Assert.Equal("The Dude", result[0].Title);
            Assert.Equal(4, result.Count);
        }

        [Fact]
        public void Get_Most_Recent_Should_Return_An_Empty_List()
        {
            var numResults = 0;
            var repo = new PostRepository(_context);

            var result = repo.GetMostRecent(numResults);

            Assert.Equal(0, result.Count);
        }

        // Add sample data
        private void AddSampleData()
        {
            var user1 = new UserProfile()
            {
                Name = "Walter",
                Email = "walter@gmail.com",
                DateCreated = DateTime.Now - TimeSpan.FromDays(365),
                FirebaseUserId = "TEST_FIREBASE_UID_1"
            };

            var user2 = new UserProfile()
            {
                Name = "Donny",
                Email = "donny@gmail.com",
                DateCreated = DateTime.Now - TimeSpan.FromDays(400),
                FirebaseUserId = "TEST_FIREBASE_UID_2"
            };

            var user3 = new UserProfile()
            {
                Name = "The Dude",
                Email = "thedude@gmail.com",
                DateCreated = DateTime.Now - TimeSpan.FromDays(400),
                FirebaseUserId = "TEST_FIREBASE_UID_3"
            };

            var user4 = new UserProfile()
            {
                Name = "Maude Lebowski",
                Email = "maude@gmail.com",
                DateCreated = DateTime.Now - TimeSpan.FromDays(500),
                FirebaseUserId = "TEST_FIREBASE_UID_4"
            };

            _context.Add(user1);
            _context.Add(user2);
            _context.Add(user3);
            _context.Add(user4);

            var post1 = new Post()
            {
                Caption = "If you will it, Dude, it is no dream",
                Title = "The Dude",
                ImageUrl = "http://foo.gif",
                UserProfile = user1,
                DateCreated = DateTime.Now - TimeSpan.FromDays(10)
            };

            var post2 = new Post()
            {
                Caption = "If you're not into the whole brevity thing",
                Title = "El Duderino",
                ImageUrl = "http://foo.gif",
                UserProfile = user2,
                DateCreated = DateTime.Now - TimeSpan.FromDays(11),
            };

            var post3 = new Post()
            {
                Caption = "It really ties the room together",
                Title = "My Rug",
                ImageUrl = "http://foo.gif",
                UserProfile = user3,
                DateCreated = DateTime.Now - TimeSpan.FromDays(12),
            };

            var post4 = new Post()
            {
                Caption = "That's like, your opinion, man.",
                Title = "Opinions",
                ImageUrl = "http://foo.gif",
                UserProfile = user1,
                DateCreated = DateTime.Now - TimeSpan.FromDays(13)
            };

            var comment1 = new Comment()
            {
                Post = post2,
                Message = "This is great",
                UserProfile = user3
            };

            var comment2 = new Comment()
            {
                Post = post2,
                Message = "The post really tied the room together",
                UserProfile = user2
            };

            _context.Add(post1);
            _context.Add(post2);
            _context.Add(post3);
            _context.Add(post4);
            _context.Add(comment1);
            _context.Add(comment2);
            _context.SaveChanges();
        }
    }
}