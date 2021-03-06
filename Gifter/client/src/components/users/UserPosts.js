import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";
import { SearchPosts } from "../posts/SearchPosts";
import { Post } from "../posts/Post";

export const UserPosts = () => {
    const { posts, getAllPostsByUser } = useContext(PostContext);
    const { id } = useParams();

    useEffect(() => {
        getAllPostsByUser(id);
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