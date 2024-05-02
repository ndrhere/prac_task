import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
  const [data, setData] = useState({email: '', password: ''})
    const handleChange = (event) => {
     event.preventDefault();
    setData({...data, [event.target.name]: event.target.value})
    }

  const handleClick = async (event) => {
  event.preventDefault();
  const response = await fetch('http://localhost:3000/login',{
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({email: data.email, password: data.password})
  })

  const data = await response.json();
if(data.authToken){
    navigate('/blogs')
}
  }


    

  return (
    <div className="login">


<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label">Email address</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" name="email" onChange={handleChange}/>
</div>

<label for="inputPassword5" class="form-label">Password</label>
<input type="password" id="inputPassword5" class="form-control" name="password" onChange={handleChange}></input>


<button type="button" class="btn btn-primary my-4" onClick={handleClick}>Login</button>

    </div>
  )
}

export default Login