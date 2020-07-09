import React, { useState, useContext } from "react";
import {
    Form,
    FormGroup,
    Card,
    CardBody,
    Label,
    Input,
    Button,
} from "reactstrap";
import { PostContext } from "../../providers/PostProvider";
import { useHistory } from "react-router-dom";

export const PostForm = () => {
    const { addPost } = useContext(PostContext);
    const [formState, setformState] = useState({});

    console.log(JSON.parse(sessionStorage.getItem("userProfile")).id);

    const handleUserInput = (e) => {
        const updatedState = { ...formState }
        updatedState[e.target.id] = e.target.value
        setformState(updatedState)
    }

    // Use this hook to allow us to programatically redirect users
    const history = useHistory();

    const submit = (e) => {
        e.preventDefault();

        const today = new Date();
        const now = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        formState.dateCreated = now;
        formState.userProfileId = JSON.parse(sessionStorage.getItem("userProfile")).id;
        formState.userProfileId = +formState.userProfileId;

        addPost(formState).then((p) => {
            history.push("/");
        });
    };

    return (
        <div className="container pt-4">
            <div className="row justify-content-center">
                <Card className="col-sm-12 col-lg-6">
                    <CardBody>
                        <Form onSubmit={submit}>
                            <FormGroup>
                                <Label for="imageUrl">Gif URL</Label>
                                <Input
                                    id="imageUrl"
                                    onChange={handleUserInput}
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="title">Title</Label>
                                <Input id="title" onChange={handleUserInput} required />
                            </FormGroup>
                            <FormGroup>
                                <Label for="caption">Caption</Label>
                                <Input
                                    id="caption"
                                    onChange={handleUserInput}
                                    required
                                />
                            </FormGroup>
                            <Button color="info" type="submit">
                                SUBMIT
                            </Button>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};