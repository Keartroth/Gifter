import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { UserProfileContext } from "../../providers/UserProfileProvider";

export const Register = () => {
    const history = useHistory();
    const { register } = useContext(UserProfileContext);

    const [registrationState, setRegistrationState] = useState({});

    const handleChange = (e) => {
        const update = { ...registrationState }
        update[e.target.id] = e.target.value
        setRegistrationState(update)
    };


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
                    <Input id="name" type="text" onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email</Label>
                    <Input id="email" type="text" onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="imageUrl">ImageUrl</Label>
                    <Input id="imageUrl" type="url" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="bio">Bio</Label>
                    <Input id="bio" type="textarea" onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="password">Password</Label>
                    <Input id="password" type="password" minLength="6" onChange={handleChange} required />
                </FormGroup>
                <FormGroup>
                    <Label for="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" minLength="6" onChange={handleChange} required />
                </FormGroup>
                <Button type="submit">Register</Button>
            </fieldset>
        </Form>
    );
}