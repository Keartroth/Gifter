import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Comment } from "./Comment";
import { Link } from "react-router-dom";

export const Post = ({ post }) => {
    debugger
    return (
        <Card className="m-4">
            <p className="text-left px-2"><span>Posted by: </span>
                <Link to={`/users/${post.userProfile.id}`}>
                    {post.userProfile.name}
                </Link>
            </p>
            <CardImg top src={post.imageUrl} alt={post.title} />
            <CardBody>
                <Link to={`/posts/${post.id}`}>
                    <p><strong>{post.title}</strong></p>
                </Link>
                <p>{post.caption}</p>
            </CardBody>
        </Card>
    );
};