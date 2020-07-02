import React, { useContext, useEffect } from "react";
import { PostContext } from "../providers/PostProvider";
import Post from "./Post";

const PostList = () => {
    const { posts, getAllPosts } = useContext(PostContext);

    useEffect(() => {
        getAllPosts();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div class="cards-column">
                    {
                        (posts.length > 0)
                            ? posts.map((post) => (
                                <Post key={post.id} post={post} />
                            ))
                            : <div class="alert alert-info" role="alert">No matching posts fit your criteria</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default PostList;