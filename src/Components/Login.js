import React, { useState } from "react";
import {useHistory} from 'react-router-dom';
import './Login.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast} from 'react-toastify';
import Spinner from '../Shared/Validators/Spinner.js';
import ErrorModal from '../Shared/Validators/ErrorModal.js';
import {useStateValue} from './Stateprovider.js';
export default function Login() {
    const [,dispatch]=useStateValue();
    let history=useHistory();
    const [isLoading,setIsloading]=useState(false);
    const [error,setError]=useState();
    const [email,setEmail]=useState([]);
    const [password,setPassword]=useState([]);
    const register=async event=>{
      event.preventDefault();
       if (email=='')
      {
        setError('Please enter a valid Email')
      }
      
      else if(password=='' || password.length<6)
      {
        setError('Please enter a valid password greater than 6')
      }
      else{
      try{
          setIsloading(true);
          const response=await fetch('http://localhost:8000/api/login', {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({ 
              email:email,
              password:password
            })
          });
          const responsedata=await response.json();
          if(!response.ok){
            throw new Error(responsedata.message);
          }
          setIsloading(false);
          toast.success('you are successfully Logged in');
          dispatch({
            type:'SETUSER',
            user:email
          })
          history.push('/');
      }
      catch(err){
          setIsloading(false);
          setError(err.message||'Something went wrong');
          toast.error('Please try again later');
          
      }
    }
    }
    const triggerhandler =()=>{
      setError(null);
    }
  return (
    <React.Fragment>
     <ToastContainer />
         <ErrorModal error={error} onClear={triggerhandler}/>
         {isLoading && <Spinner asOverlay /> }
  
        {!isLoading &&<div className="main1">
            <div className="container">
            <div className="header">
              <h2>Login</h2>
            </div>
            <form id="form" className="form" onSubmit={register}>
          
              <div className="form-control">
                <label for="username">Email</label>
                <input type="email" placeholder="dr@gmail.com" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
              </div>
              <div className="form-control">
                <label for="username">Password</label>
                <input type="password" placeholder="Password please" id="password2" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                
              </div>
              <input className="button" type="submit" value="Submit" />
            </form>
          </div>
          </div>
}
          </React.Fragment>
  )
}
