using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Gifter.Data;
using Gifter.Models;
using System;

namespace Gifter.Repositories
{
    public class PostRepository
    {
        private readonly ApplicationDbContext _context;

        public PostRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Post> GetAll()
        {
            return _context.Post
                           .Include(p => p.UserProfile)
                           .Include(p => p.Comments)
                           .ToList();
        }

        public Post GetById(int id)
        {
            return _context.Post
                           .Include(p => p.UserProfile)
                           .Include(p => p.Comments)
                           .FirstOrDefault(p => p.Id == id);
        }

        public List<Post> GetByUserProfileId(int id)
        {
            return _context.Post.Include(p => p.UserProfile)
                            .Where(p => p.UserProfileId == id)
                            .Include(p => p.Comments)
                            .OrderBy(p => p.Title)
                            .ToList();
        }

        public void Add(Post post)
        {
            _context.Add(post);
            _context.SaveChanges();
        }

        public void Update(Post post)
        {
            _context.Entry(post).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            // Remove related comments first
            var relatedComments = _context.Comment.Where(c => c.PostId == id);
            _context.Comment.RemoveRange(relatedComments);

            var post = GetById(id);
            _context.Post.Remove(post);
            _context.SaveChanges();
        }

        public List<Post> Search(string criterion, int id, bool sortDescending)
        {
            var query = _context.Post
                                .Include(p => p.UserProfile)
                                .Include(p => p.Comments)
                                .Where(p => p.Title.Contains(criterion) || p.Caption.Contains(criterion));

            if (id != 0)
            {
                query = query.Where(p => p.UserProfileId == id);
            }

            return sortDescending
                ? query.OrderByDescending(p => p.DateCreated).ToList()
                : query.OrderBy(p => p.DateCreated).ToList();
        }

        public List<Post> SearchByDate(DateTime criterion, bool sortDescending)
        {
            var query = _context.Post
                                .Include(p => p.UserProfile)
                                .Include(p => p.Comments)
                                .Where(p => p.DateCreated >= criterion);

            return sortDescending
                ? query.OrderByDescending(p => p.DateCreated).ToList()
                : query.OrderBy(p => p.DateCreated).ToList();
        }
    }
}