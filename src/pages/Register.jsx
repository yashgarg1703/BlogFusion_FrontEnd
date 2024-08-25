import './Register.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store(context API)/authContextAPI';
import { toast } from 'react-toastify';
import register_img from './register-img.png'
const Register=()=>{
    const [User,setUser]=useState({
        username:"",
        email:"",
        phone:"",
        password:""
    });
    const [toastvisible,setToastvisible]=useState(false);
    const navigate=useNavigate();
    const {storetokenInLS,API}=useAuth();
    const HandleInput=(e)=>{
    //   console.log(e);
      let name=e.target.name;
      let value=e.target.value;
      setUser({
        ...User,
        [name]:value,
      })
      
    }

    const HandleSubmit=async (e)=>{
      try{
        e.preventDefault();
        // console.log(User);

        const response=await fetch(`${API}/register`,{
          method:'POST',
          headers:{
          'Content-Type':'application/json'
          },
          body:JSON.stringify(User)
        })
        let res_data=await response.json();
        // console.log('res from json',res_data);
        if(response.ok)
        {
          
          storetokenInLS(res_data.token);
          if(!toastvisible)
            {
                setToastvisible(true);
                toast.success("Login Successful",
                    {onClose:()=>setToastvisible(false)}
                );
            }
        //          OR
        // storetokenInLS(res_data.token);
        // localStorage.getItem("token",res_data.token);

          setUser({username:"",
          email:"",
          phone:"",
          password:""});
          navigate('/')

        }
        else
        {
          // Attempt to read the error message from the response
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
          //res_data.msg for email already exists
          // alert(errorData.msg);
        }
        // console.log(response);
      }
      catch(e){
        console.log("Register Error :"+e);
      }
    }
   return  <>
    <div className="registration-form-container">
      <div className='register-img'>
      <img src={register_img} className="register-img" alt="Register image"/>
      </div>
    <div className="registration-form">
        <div className="registration-form-border">
            <h2 className="registration-heading">Registration Form</h2>
            <form className="registration-grid" action="/register" method="POST" onSubmit={HandleSubmit}>
                <label className="registration-label">UserName</label>
                <input 
                    className="registration-input" 
                    type="text" 
                    name="username"
                    placeholder="Your Name"
                    value={User.username} 
                    autoComplete="off"
                    required
                    onChange={HandleInput}
                /><br/>
                <label className="registration-label">Email</label>
                <input 
                    className="registration-input" 
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    required
                    value={User.email} 
                    onChange={HandleInput}
                /><br/>
                <label className="registration-label">Phone</label>
                <input 
                    className="registration-input" 
                    type="number"
                    name="phone"
                    placeholder="Phone number"
                    autoComplete="off"
                    required
                    value={User.phone} 
                    onChange={HandleInput}
                /><br/>
                <label className="registration-label">Password</label>
                <input 
                    className="registration-input" 
                    type="password"
                    name="password"
                    placeholder="Choose Strong Password"
                    autoComplete="off"
                    required
                    value={User.password} 
                    onChange={HandleInput}
                /><br/>
               <center><button className="registration-submit" type="submit">Register</button></center> 
            </form>
        </div>
    </div>
</div>

    </>
}

export default Register;