import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../store(context API)/authContextAPI";
import { toast } from "react-toastify";
export const AdminUpdateUser=()=>{
    const params=useParams();
    const [user,setUser]=useState({
        username:"",
        email:"",
        phone:""
    });
    const {token,API}=useAuth();
    const navigate=useNavigate();
    // const UserName=user.username;
    const getUserData=async()=>{
        try{
            const response=await fetch(`${API}/admin/edit/userData/${params.id}`,{
                method:"GET",
                headers:{
                    'Authorization':`Bearer ${token}`,
                    'Content-Type':'application/json'
                }
            });
            const data=await response.json();
            if(response.ok)
            {
               setUser(data.userdata)
            }
            else
            {
                console.log("Internal Backend error")
            }
        }
        catch(e)
        {
            console.log(e);
        }
        
    }
    const HandleInput=(e)=>{
      const value=e.target.value;
      const name=e.target.name;
      setUser({...user,[name]:value})
    }
    const HandleSubmit=async(e)=>{
        e.preventDefault();
        try{
          const response=await fetch(`${API}/admin/edit/userData/update/${params.id}`,{
            method:"POST",
            headers:{
                'Authorization':`Bearer ${token}`,
                'Content-Type':'application/json'
            },
            body: JSON.stringify(user)
          })
        //   console.log(await response.json())
          if(response.ok)
          {
            toast.success("User Updated Successfully")    
            navigate('/admin/users')       
          }
          else
          {
            toast.error("Some Error Occurs")
          }

        }
        catch(e)
        {
            console.log(e)
        }
    }
    useEffect(()=>{
        getUserData();
    },[])
    return <>
    <div className="contact-form-container">
    <div className="contact-form">
        <div className="contact-form-border">
        <h2 className="contact-heading">Update User</h2>
        <form className='contact-grid'  onSubmit={HandleSubmit}>
        <label className="contact-label" >UserName</label>
        <input 
        className="contact-input" 
        type="text" 
        name="username"
        value={user.username} 
        autoComplete="off"
        onChange={HandleInput}
            required
        ></input><br/>
        <label className="contact-label">Email</label>
        <input 
        className="contact-input" 
        type="email"
        name="email"
        onChange={HandleInput}
         required
        value={user.email} 
        ></input><br/>
        <label className="contact-label">Phone</label>
        <input 
        className="contact-input" 
        type="number"
        name="phone"
        onChange={HandleInput}
        autoComplete="off"
            required
        value={user.phone} 
        /><br/>
      <center><button className="contact-submit" type="submit">Update</button></center>  
    </form> 
    </div>
    </div>
    </div>
    </>
}