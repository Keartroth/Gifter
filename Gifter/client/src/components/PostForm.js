import React, { useContext, useState } from "react"
import { PostContext } from "../providers/PostProvider";

export const PostForm = () => {
    const { addPost } = useContext(PostContext);
    const [formState, setformState] = useState({})

    const handleFormChange = (e) => {
        const updatedState = { ...formState }
        updatedState[e.target.id] = e.target.value
        debugger
        setformState(updatedState)
    }

    const submitNewPost = (e) => {
        e.preventDefault();
        debugger
        const today = new Date();
        const now = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        formState.userProfileId = 1;
        formState.dateCreated = now;

        addPost(formState);
        e.target.reset();
    };

    return (
        <section class="container">
            <form onSubmit={submitNewPost}>
                <div class="form-group" id="newPostForm">
                    <label for="title">Post Title</label>
                    <input type="text" class="form-control" id="title" onChange={handleFormChange} required />
                </div>
                <div class="form-group">
                    <label for="imageUrl">Image Url</label>
                    <input type="url" class="form-control" id="imageUrl" onChange={handleFormChange} required />
                </div>
                <div class="form-group">
                    <label for="caption">Caption</label>
                    <input type="text" class="form-control" id="caption" onChange={handleFormChange} />
                </div>
                <div class="form-group">
                    <input type="hidden" class="form-control" id="userProfileId" value="1" />
                </div>
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </section>
    );
};