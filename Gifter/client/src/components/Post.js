import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

export const Post = ({ post }) => {
    let routeLocation = useLocation().pathname;

    return (
        <Card className="m-4">
            {
                (routeLocation == `/users/${post.userProfile.id}`)
                    ? <p className="text-left px-2">Posted by: {post.userProfile.name}</p>
                    : <p className="text-left px-2"><span>Posted by: </span>
                        <Link to={`/users/${post.userProfile.id}`}>
                            {post.userProfile.name}
                        </Link>
                    </p>
            }
            <CardImg top src={post.imageUrl} alt={post.title} />
            <CardBody>
                {
                    (routeLocation == `/posts/${post.id}`)
                        ? <p><strong>{post.title}</strong></p>
                        : <Link to={`/posts/${post.id}`}>
                            <p><strong>{post.title}</strong></p>
                        </Link>
                }
                <p>{post.caption}</p>
            </CardBody>
        </Card>
    );
};