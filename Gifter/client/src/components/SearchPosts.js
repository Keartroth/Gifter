import React, { useContext } from 'react'
import { Card, CardBody, Input, Label } from 'reactstrap'
import { useLocation } from "react-router-dom";
import { PostContext } from '../providers/PostProvider'
import debounce from 'lodash.debounce'

export const SearchPosts = () => {
    const { searchPosts, searchUsersPosts } = useContext(PostContext);
    let routeLocation = useLocation().pathname;

    const debounceSearchPosts = debounce(searchPosts, 500);
    const debounceSearchUsersPosts = debounce(searchUsersPosts, 500);

    const handleChange = (e) => {
        if (routeLocation == '/') {
            debounceSearchPosts(e.target.value);
        } else {
            let [trash1, trash2, userId] = routeLocation.split('/');
            const id = +userId;

            debounceSearchUsersPosts(e.target.value, id);
        }
    };

    return (
        <div className='container mt-1'>
            <Card>
                <CardBody>
                    <Label for="title">Search Posts by Title and Caption</Label>
                    <Input type='text' onChange={handleChange} placeholder="Search Posts" />
                </CardBody>
            </Card>
        </div>
    );
};