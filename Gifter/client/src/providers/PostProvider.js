import React, { useState, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = React.createContext();

export const PostProvider = (props) => {
    const { getToken } = useContext(UserProfileContext);
    const [posts, setPosts] = useState([]);

    const apiUrl = '/api/post'

    const getAllPosts = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setPosts));
    };

    const addPost = (post) => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post),
            }));
    };

    const searchPosts = (q, id) => {
        getToken().then((token) => {
            if (id) {
                if (!q) {
                    getAllPostsByUser(id);
                } else {
                    fetch(apiUrl + `/search?q=${q}&id=${id}`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((res) => res.json())
                        .then(setPosts);
                };
            } else {
                if (!q) {
                    getAllPosts();
                } else {
                    fetch(apiUrl + `/search?q=${q}`, {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }).then((res) => res.json())
                        .then(setPosts);
                };
            };
        });
    };

    const getPost = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
        );
    };

    const getAllPostsByUser = (id) => {
        return getToken().then((token) =>
            fetch(apiUrl + `/getbyuser/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setPosts)
        );
    };

    return (
        <PostContext.Provider value={{ posts, getAllPosts, addPost, searchPosts, getPost, getAllPostsByUser }}>
            {props.children}
        </PostContext.Provider>
    );
};