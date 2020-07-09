import React from "react";
import { Card, CardBody } from "reactstrap";

export const Comment = ({ comment, userProfile }) => {
    return (
        <Card className="m-4">
            <p className="text-left px-2">Comment by: {userProfile.name}</p>
            <CardBody>
                <p>{comment.message}</p>
            </CardBody>
        </Card>
    );
};