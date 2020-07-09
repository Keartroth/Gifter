import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { PostList } from "./posts/PostList";
import { PostForm } from "./posts/PostForm";
import { PostDetails } from "./posts/PostDetails";
import { UserPosts } from "./users/UserPosts";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const ApplicationViews = () => {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <Switch>
            <Route path="/" exact>
                {isLoggedIn ? <PostList /> : <Redirect to='/login' />}
            </Route>

            <Route path="/posts/add">
                {isLoggedIn ? <PostForm /> : <Redirect to='/login' />}
            </Route>

            <Route path="/posts/:id">
                {isLoggedIn ? <PostDetails /> : <Redirect to='/login' />}
            </Route>

            <Route path="/users/:id">
                {isLoggedIn ? <UserPosts /> : <Redirect to='/login' />}
            </Route>

            <Route path="/login">
                <Login />
            </Route>

            <Route path="/register">
                <Register />
            </Route>
        </Switch>
    );
};