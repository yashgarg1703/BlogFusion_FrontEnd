import { useEffect, useState } from "react";
import './Contact.css'
import { useAuth } from "../store(context API)/authContextAPI";
import { toast } from 'react-toastify';
import contact_img from "./contact-img.png"
const Contact=()=>{
     
    const [User,setUser]=useState({
        username:"",
        email:"",
        message:""
    })
    const [toastvisible,setToastvisible]=useState(false);
    const {user,API}=useAuth();
    const HandleInput=(e)=>{
        let name=e.target.name;
        let value=e.target.value;
        setUser({
            ...User,
            [name]:value
        })
    }
    const HandleSubmit=async (e)=>{
        try{
        e.preventDefault();
        // console.log(User);
        const response= await fetch(`${API}/contact`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(User)
        })
        if(response.ok) 
            {
                let data=await response.json();
                console.log("data from contact",data);
                if(!toastvisible)
                    {
                        setToastvisible(true);
                        toast.success(data.message,{
                            onClose: ()=> setToastvisible(false)
                        })              
                    }
                setUser ({username:user.username,
                          email:user.email,
                          message:""
                        });
            }
        }
        catch(e)
        {
            console.log("Error from Contact",e);
        }

    }
    // console.log(user)

    useEffect(()=>{
        if(user)
            {
                setUser(
                    {
                        username:user.username,
                        email:user.email,
                        message:""
                    }
                )
            }
            else
            {
                setUser(
                    {
                        username:"",
                        email:"",
                        message:""
                    }
                )
            }
    },[user])
    
        

    return<>
   <div className="contact-form-container">
    <div>
    <img className="contact-img" src={contact_img} alt="contact-img"/>
    </div>
    <div className="contact-form">
        <div className="contact-form-border">
            <h2 className="contact-heading">Contact Us</h2>
            <form className="contact-grid" onSubmit={HandleSubmit}>
                <label className="contact-label">UserName</label>
                <input 
                    className="contact-input"
                    type="text"
                    name="username"
                    value={User.username}
                    onChange={HandleInput}
                    autoComplete="off"
                    required
                    placeholder="Enter Your Name"
                /><br/>
                <label className="contact-label">Email</label>
                <input
                    className="contact-input" 
                    type="email"
                    name="email"
                    value={User.email}
                    onChange={HandleInput}
                    autoComplete="off"
                    required
                    placeholder="Enter Your Email"
                /><br/>
                <label className="contact-label">Message</label>
                <textarea
                    className="contact-input"
                    name="message"
                    value={User.message}
                    onChange={HandleInput}
                    autoComplete="off"
                    required
                    placeholder="Enter Your Message Here"
                    rows="6"
                    cols="90"
                /><br/>
              <center> <button className="contact-submit" type="submit">Submit</button></center> 
              </form>
        </div>
    </div>
</div>
</>
}

export default Contact