import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const Blogs = () => {
const [blogs, setBlogs] = useState([])
const [data, setData] = useState({title:'', description: '', blog_category:'', slug: '', status: ''})

    useEffect(() => {
       fetchData()
    }, [])

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3000/deleteBlogs/${id}`, {
        method: 'DELETE'});
        fetchData();

    }

    const handleUpdate = () => {

    }

const handleChange = async (event) => {
setData({...data, [event.target.name]: event.target.value})
}



    const fetchData = async () => {
    const response = await fetch ('http://localhost:3000/getAllBlogs');
    const data = await response.json();
     setBlogs(data)

    }

const handleFormSubmit = async (event) => {
    event.preventDefault()
    await axios.post('http://localhost:3000/createBlogs',{
        title: data.title,
        description: data.description,
        blog_category: data.blog_category,
        slug: data.slug,
        status: data.status
    })

     setData({
        title:'', description: '', blog_category:'', slug: '', status: ''
     })
}


  return (
    <div className="blogs">
<div>
    <form onSubmit={handleFormSubmit}>

    <input type="text" className="mx-2" name="title" id="title" onChange={handleChange} placeholder="Enter Title"></input>
    <input type="text" className="mx-2" name="description" id="description" onChange={handleChange} placeholder="Enter description"></input>
    <select name="blog_category" onChange={handleChange}>
        <option value="personal">Personal</option>
        <option value="professional">Professional</option>
    </select>
    <input type="text" className="mx-2" name="slug" id="slug" onChange={handleChange} placeholder="Enter slug"></input>
    <select name="status" onChange={handleChange}>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
    </select>
    <button type="submit" className="btn btn-primary mx-2">Create Blog</button>

    </form>
    
<ul>
    {Array.isArray(blogs) && blogs.map((items) => (
        <div key={items._id}>
       <h3>{items.title}</h3>
       <p>{items.description}</p>
       <p>{items.blog_category}</p>
        <p>{items.status}</p>
       <button>Edit</button>
       <button onClick = {() => handleUpdate(items._id)}>Update</button>
       <button onClick={() => handleDelete(items._id)}>Delete</button>
        </div>
    ))}
    
   
</ul>




</div>


    </div>
  )
}

export default Blogs
