import React,{useState,useEffect} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Spinner from '../Shared/Validators/Spinner.js';
import {ToastContainer,toast} from 'react-toastify';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Problem.css';

function Problem() {
    const [fname,setFname]=useState([]);
    const [image,setImage]=useState("image-1620727194375.png");
    const [isloading,setIsloading]=useState(false);
    const [cname,setCname]=useState([]);
    const [cdes,setCdes]=useState([]);
    const [details,setDetails]=useState([]);
    useEffect(async()=>{
          const response= await fetch('http://localhost:8000/api/getpdetails');
          const responsedata=await response.json();
          if(!response.ok){
          }
          setDetails(responsedata.details);
    },[]); 
    const onSubmitgetdata=async()=>{
        const response= await fetch('http://localhost:8000/api/getpdetails');
          const responsedata=await response.json();
          if(!response.ok){
              toast.error('could not problem data')
          }
          setDetails(responsedata.details);
          toast.success('Problem data loaded successfully');
    }
    console.log(details)
    const setCname1=(e)=>{
        setCname(e.target.value);
    }
    const setCdes1=e=>{
        setCdes(e.target.value);
    }
    const setfilename1=(e)=>{
        setFname(e.target.files[0]);
    }
    const handleChange=async(e)=>{
        if(cname.length==0){
            toast.error('please provide a city name')
        }
        else if(cdes.length==0){
            toast.error('please provide a description')
        }
        else if(fname.length==0){
            toast.error('please provide a file ')
        }
        else{
        try{
        e.preventDefault();
        setIsloading(true);
        const formdata=new FormData();
        formdata.append('photo',fname);
        formdata.append('city',cname);
        formdata.append('description',cdes);
        const config={
            headers:{
                'content-type': 'multipart/form-data'
            }
        };
        
        axios.post('http://localhost:8000/api/upload',formdata,config).then((response)=>{
            
            toast.success('problem details uploaded successfully');
            setIsloading(false);   

        }).catch((error)=>{
            setIsloading(false);
        toast.error('Something went wrong');
        
        }) 
    }
    catch(err){
        setIsloading(false);
        toast.error('Something went wrong1');
    }
}
    }
    return (
        <React.Fragment >
        <ToastContainer />
        <div className="pro-style">
        {isloading && <Spinner asOverlay />}
        {!isloading && <div className="pfstyle">
             <h1 className="head-style1"> Post Problem</h1>
              <br />
              <form onSubmit={handleChange}>
              <p>City Name</p>
              <input className="input1"  name="city" type="text" placeholder="enter your cityname" onChange={setCname1} /><br />
              <p>Problem Description</p>
              <input className="input1" name="description" type="text" placeholder="enter your problem description" onChange={setCdes1} /><br /><br/>
              <input className="input1" type="file"  name="photo" onChange={setfilename1} /><br />
              <input  type="submit" value="POSTPROBLEM" className="button1" />
             <Link to="/"> <input  value="gotothome" type="button"  value="GOTOHOME" className="button1"/></Link>
              </form>
        </div>}
        { details.length!=0 && details.slice(0).reverse().map((det,key)=><div className="pdatastyle"><div className="inner-style"><p className="paragraph-style">City Name:{det.city}</p>
                <p className="paragraph-style">Problem Description{det.description}</p>
                <img className="image-style1" src={require(`../uploads/${det.image}`).default}   alt={det.image}/></div></div>
            )
        }
        </div>
        </React.Fragment>
    )
}

export default Problem
