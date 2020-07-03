import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Comment } from "./Comment";

const Post = ({ post }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2">Posted by: {post.userProfile.name}</p>
            <CardImg top src={post.imageUrl} alt={post.title} />
            <CardBody>
                <p>
                    <strong>{post.title}</strong>
                </p>
                <p>{post.caption}</p>
            </CardBody>
            <CardBody>
                {
                    (post.comment.length > 0)
                        ? post.comment.map((c) => (
                            <Comment key={c.id} comment={c} userProfile={post.userProfile} />
                        ))
                        : <div>Be the first to comment!</div>
                }
            </CardBody>
        </Card>
    );
};

export default Post;