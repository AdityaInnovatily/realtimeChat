
import { useState , useEffect} from "react";
import "./Otp.css";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {emailVerificationRoute} from "../utils/APIRoutes";

export default function Otp() {
    const navigate = useNavigate();
    const [values,setValues] = useState("");
    
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };
    const localStorageUserDetails = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY));

    let changeHandler = async (e)=>{
        
      // console.log('eee',e.target.value);
        await setValues((val) => val += e.target.value);
        // console.log("va", values);
    }

    let submitHandler = async(e) =>{
  
        e.preventDefault();
        const otp = values;
      
        // console.group('1111111111',localStorageUserDetails,localStorageUserDetails.user, localStorageUserDetails.user.email);
        const email = localStorageUserDetails.userDetails.email;
       
        const response = await fetch(emailVerificationRoute, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              otp,
            }),
          });
          
          const data = await response.json();
          
          console.log('dsdfa1111111111',data);
          if (data == {}) {
            toast.error(data.msg, toastOptions);
          }else{

            localStorageUserDetails.userDetails.isEmailVerified = true;
            localStorage.setItem(
              process.env.REACT_APP_LOCALHOST_KEY,
              JSON.stringify(localStorageUserDetails)
            );
            navigate("/");
          }
      
    }

    return <div className="main">



    <div className="otp_page_main">

   <div><h1 style={{color: "white"}}> Email Verification </h1></div>
<div className= "otp_input">

  <input type="text" maxLength={1}  onChange = {changeHandler}></input>
  <input type="text" maxLength={1}  onChange = {changeHandler}></input>
  <input type="text" maxLength={1} onChange = {changeHandler}></input>
  <input type="text" maxLength={1} onChange = {changeHandler}></input>
 
  

  </div>

  <div className="submit">

  <button className = "submit_btn" onClick = {submitHandler}>Submit</button>
  </div>
  
 <ToastContainer/>

    </div>
    
    </div>
}