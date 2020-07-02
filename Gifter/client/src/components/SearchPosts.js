import React, { useContext } from 'react'
import { Input } from 'reactstrap'
import { PostContext } from '../providers/PostProvider'
import debounce from 'lodash.debounce'

export const SearchPosts = () => {
    const { searchPosts } = useContext(PostContext);

    const debounceSearchPosts = debounce(searchPosts, 500);

    const handleChange = (e) => {
        debounceSearchPosts(e.target.value);
    };

    return (
        <div className='container mt-1'>
            <label for="title">Search Posts by Title and Caption</label>
            <Input type='text' onChange={handleChange} placeholder="Search Posts" />
        </div>
    );
};