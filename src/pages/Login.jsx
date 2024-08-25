import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../store(context API)/authContextAPI";
import { toast } from 'react-toastify';
import login_img from './blog-login.png';
const Login=()=>{

    const [User,setUser]=useState({
        email:"",
        password:""
    })
    const [toastvisible,setToastvisible]=useState(false);
    const navigate=useNavigate();
    const {storetokenInLS,API}=useAuth();
    const HandleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setUser({
            ...User,
            [name]:value
        })
    }
    const HandleSubmit=async (e)=>{
        e.preventDefault();
        console.log(User);
        const response=await fetch(`${API}/login`,{
          method:'POST',
          headers:{
          'Content-Type':'application/json'
          },
          body:JSON.stringify(User)
        })
        let res_data=await response.json();
        console.log('res from json',res_data);
        if(response.ok)
        {
            if(!toastvisible)
                {
                    setToastvisible(true);
                    toast.success("Login Successful",
                        {onClose:()=>setToastvisible(false)}
                    );
                }
        storetokenInLS(res_data.token);
        // localStorage.setItem("token",res_data.token);
            setUser({
                email:"",
                password:""
            })
            navigate('/');
        }
        else
        {
            if(!toastvisible)
                {
                    setToastvisible(true);
                        res_data.errorDetails?
                        toast.error(res_data.errorDetails,
                          {
                            onClose: ()=> setToastvisible(false)
                          }):
                          toast.warn(res_data.message,
                          {
                              onClose: ()=> setToastvisible(false)
                          });               
                }
           
        }
        console.log(response);
        }
    return <>

<div className="login-container">
    <div className="login-img">
        <img src={login_img} alt="Login"/>
    </div>
    <div className="login-form">
        <div className="form_border">
            <h2 className="heading">LogIn</h2>
            <form className='login-form' action="/login" method="POST" onSubmit={HandleSubmit}>
                <label className="label" name="email">Email</label>
                <input className="input" 
                onChange={HandleInput}
                type="email" id="email" name="email" placeholder='Your Email' required/>
                
                <label className="label" name="password">Password</label>
                <input className="input" 
                onChange={HandleInput}
                type="password" id="password" name="password" placeholder='Enter Password' required/>
                
               <center><button className="submit" type="submit">LogIn</button></center> 
               </form>
        </div>
        <div className="register-login">
            <span>OR</span>
            <a href="/register" className="register-link">Register</a>
        </div>
    </div>
</div>
    </>
}
export default Login;