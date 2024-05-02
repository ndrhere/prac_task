import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
const [values, setValues] = useState({name: '', email: '', password: ''})
const navigate = useNavigate()

const handleChange = (event) => {
    event.preventDefault();
    setValues({...values, [event.target.name]: event.target.value})
}

const handleClick = async (event) => {
    event.preventDefault();

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: values.name, email: values.email, password: values.password})

    })

    const data = await response.json();
    if(data.authToken){
      navigate('/login')
    }








}

  return (
    <div className="register">
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Name</label>
  <input type="text" class="form-control" id="exampleFormControlInput1" name="name" onChange={handleChange}/>
</div>

<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput2" name="email" onChange={handleChange}/>
</div>

<label for="inputPassword5" class="form-label">Password</label>
<input type="password" id="inputPassword5" class="form-control" name="password" onChange={handleChange}></input>


<button type="button" class="btn btn-primary my-4" onClick={handleClick}>Register</button>

    </div>
  )
}

export default Register