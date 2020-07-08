import React, { useContext, useEffect } from "react";
import { PostContext } from "../providers/PostProvider";
import { SearchPosts } from "./SearchPosts";
import { Post } from "./Post";

export const PostList = () => {
    const { posts, getAllPosts } = useContext(PostContext);

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <SearchPosts />
                <div className="cards-column">
                    {
                        (posts.length > 0)
                            ? posts.map((post) => (
                                <Post key={post.id} post={post} />
                            ))
                            : <div className="alert alert-info" role="alert">No matching posts fit your criteria</div>
                    }
                </div>
            </div>
        </div>
    );
};