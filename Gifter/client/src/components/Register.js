import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../providers/UserProfileProvider";

export const Register = () => {
    const history = useHistory();
    const { register } = useContext(UserProfileContext);

    const [registrationState, setRegistrationState] = useState();

    const handlePromiseChange = (e) => {
        const updatedPromises = [...registrationState]
        updatedPromises[e.target.id] = e.target.value
        setRegistrationState(updatedPromises)
    }


    const registerClick = (e) => {
        e.preventDefault();
        if (registrationState.password && registrationState.password !== registrationState.confirmPassword) {
            alert("Passwords don't match. Do better.");
        } else {
            const today = new Date();
            const now = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

            registrationState.dateCreated = now;
            delete registrationState.confirmPassword;

            register(registrationState)
                .then(() => history.push("/"));
        }
    };

    return (
        <Form onSubmit={registerClick}>
            <fieldset>
                <FormGroup>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" type="text" onChange={setRegistrationState} required />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" type="text" onChange={setRegistrationState} required />
                </FormGroup>
                <FormGroup>
                    <Label for="imageUrl">ImageUrl</Label>
                    <Input id="imageUrl" type="url" onChange={setRegistrationState} />
                </FormGroup>
                <FormGroup>
                    <Label for="bio">Bio</Label>
                    <Input id="bio" type="textarea" onChange={setRegistrationState} required />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" onChange={setRegistrationState} required />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" onChange={setRegistrationState} required />
                </FormGroup>
                <Button type="submit">Register</Button>
            </fieldset>
        </Form>
    );
}