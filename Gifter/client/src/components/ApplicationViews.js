import React from "react";
import { Switch, Route } from "react-router-dom";
import { PostList } from "./PostList";
import { PostForm } from "./PostForm";
import { PostDetails } from "./PostDetails";
import { UserPosts } from "./UserPosts";
import { SearchPosts } from "./SearchPosts";

export const ApplicationViews = () => {
    return (
        <Switch>
            <Route path="/" exact>
                <SearchPosts />
                <PostList />
            </Route>

            <Route path="/posts/add">
                <PostForm />
            </Route>

            <Route path="/posts/:id">
                <PostDetails />
            </Route>

            <Route path="/users/:id">
                <SearchPosts />
                <UserPosts />
            </Route>
        </Switch>
    );
};