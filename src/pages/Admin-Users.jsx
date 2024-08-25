import { useEffect, useState } from "react"
import { useAuth } from "../store(context API)/authContextAPI"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { AdminLayout } from "../layouts/Admin"
export const AdminUsers=()=>{
    const [users,setUsers]=useState([])
    const [toastvisible,setToastvisible]=useState(false)
    const [loading,setLoading]=useState(true);
    const {token,user,API}=useAuth();
    
    const navigate=useNavigate();
    useEffect(()=>{
      console.log("user",user)
      if(user && !user.isAdmin)
        {
            navigate('/');
            toast.error("Admin Access Denied!")
            return;
        }
      
    },[user,navigate]);

    useEffect(()=>{
      console.log("user",user)
      if(user && user.isAdmin)
        {
          getAllUsers();
        }
      
    },[user]);

    const getAllUsers=async()=>{
         try{
             const response=await fetch(`${API}/admin/users`,{

                method:"GET",
                headers:{
                  'Authorization': `Bearer ${token}`
                }
            }
             )
             const data=await response.json();
            setUsers(data.userData)
            setLoading(false);
            console.log(data.userData)
        }
        catch(e)
        {
            console.log(e);
        }
    }
    const deleteUser=async(id)=>{
      try{
         const response=await fetch(`${API}/admin/users/delete/${id}`,{
          method:"DELETE",
                headers:{
                  'Authorization': `Bearer ${token}`
                }
         })
         if(response.ok)
          {
            getAllUsers();
            if(!toastvisible)
              {
                  setToastvisible(true);
                  toast.success("User Deleted Successful",
                      {onClose:()=>setToastvisible(false)}
                  );
              }
          }
         console.log("Response after delete",response)
         
      }
      catch(e){
       console.log(e);
      }
    }
    const updateUser=async(id)=>{
      navigate(`/admin/updateUser/${id}`)
    }
    

    

    if (loading) {
      return (
          <div className="spinner-container">
              <div className="loading-text">Fetching Users data...</div>
              <div className="spinner"></div>
          </div>
      )}

    return user && <>
     <div className="admin-sidebar-container">
      <AdminLayout/>
    </div>
    <div className="admin-userprofile">
    <h1 className="admin-head"> ADMIN USERS PANEL</h1>
    <div className="admin-users-border">
      <table>
        <thead>
        <tr>
          <td>UserName</td>
          <td>Email</td>
          <td>Phone</td>
          <td>Update</td>
          <td>Delete</td>
        </tr>
        </thead>
        <tbody>
     {
        users.map(User => (
          <tr key={User._id}>
            <td > {User.username} </td>
            <td>{User.email}</td>
            <td>{User.phone}</td>
            <td><button className="button edit-button" onClick={()=>updateUser(User._id)}>Edit</button></td>
            <td><button className="button delete-button" onClick={()=>deleteUser(User._id)}>Delete</button></td>
          </tr>
        ))
     }
     </tbody>
     </table>
     </div>
     </div>
    </>
}