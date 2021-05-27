import React, { useState } from "react";
import './Signup.css';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer,toast} from 'react-toastify';
import {Link,useHistory} from 'react-router-dom';
import Spinner from '../Shared/Validators/Spinner.js';
import ErrorModal from '../Shared/Validators/ErrorModal.js';
import {useStateValue} from './Stateprovider.js';
const Signup =()=> {
    let history=useHistory();
    const [isLoading,setIsloading]=useState(false);
    const [error,setError]=useState();
    const [fname,setFname]=useState([]);
    const [email,setEmail]=useState([]);
    const [phno,setPhno]=useState([]);
    const [password,setPassword]=useState([]);
    const [rpassword,setRpassword]=useState([]);
    const [,dispatch]=useStateValue();
    const register=async event=>{

      event.preventDefault();
      if(fname=='' || fname.length<3)
      {
        setError('Please enter a valid name');
      } 
      else if (email=='')
      {
        setError('Please enter a valid Email')
      }
      else if(phno=='' || phno.length!=10)
      {
        setError('Please enter a valid Phone number')
      }
      else if(password=='' || password.length<6)
      {
        setError('Please enter a valid password greater than 6')
      }
      else if(rpassword=='' || rpassword.length<6)
      {
        setError('Please enter a valid passwod length gretaer than 6')
      }
      else if(password!=rpassword)
      {
        setError('Both password must be same')
      }
      else{
      try{
          
          setIsloading(true);
          const response=await fetch('http://localhost:8000/api/signup', {
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              fname:fname,
              email:email,
              phno:phno,
              password:password

            })
          });
          const responsedata=await response.json();
          if(!response.ok){
            throw new Error(responsedata.message);
          }
          setIsloading(false);
          dispatch({
            type:'SETUSER',
            user:email
          })
          toast.success('you are successfully registered');
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
         {isLoading && <Spinner asOverlay/> }

          {!isLoading && <div className="main3">
            {isLoading && <Spinner asOverlay/> }
            <div className="container">
            <div className="header">
              <h2>Create Account</h2>
            </div>
            <form id="form" className="form" onSubmit={register}>
              <div className="form-control">
                <label for="username">Username</label>
                <input type="text" placeholder="Rajesh" id="username"  value={fname} onChange={(e)=>{setFname(e.target.value)}}/>
   
              </div>
              <div className="form-control">
                <label for="username">Email</label>
                <input type="email" placeholder="r@dharmisetty.com" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
              </div>
              <div className="form-control">
                <label for="username">Phone Number</label>
                <input type="number" placeholder="Phone Number" id="password" value={phno} onChange={(e)=>{setPhno(e.target.value)}}/>
                
              </div>
              <div className="form-control">
                <label for="username">Password</label>
                <input type="password" placeholder="Password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
              <div className="form-control">
                <label for="username">Password check</label>
                <input type="password" placeholder="Password two" id="password2" value={rpassword} onChange={(e)=>{setRpassword(e.target.value)}}/>
                
              </div>
              <input className="button" type="submit" value="Submit" />
            </form>
          </div>
          </div>}
          
          </React.Fragment>
        );
    }
export default Signup;