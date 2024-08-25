import { useEffect, useState } from "react"
import { useAuth } from "../store(context API)/authContextAPI"
import { toast } from "react-toastify"
import  {AdminLayout}  from "../layouts/Admin"
export const AdminContacts=()=>{
       const [contacts,setContacts]=useState([])
       const [toastvisible,setToastvisible]=useState(false)
       const [loading,setLoading]=useState(false)
       const {token,API}=useAuth();
       const getAllContacts=async()=>{
              try{
                     const response=await fetch(`${API}/admin/contacts`,{
                            method:"GET",
                            headers:{
                                   'Authorization':`Bearer ${token}`
                            }
                     })
                     const data=await response.json();
                     console.log(data.userContact);
                     setContacts(data.userContact)
                     setLoading(false)
              }
              catch(e)
              {
                     console.log(e);
              }
              
       }
       const deleteContact=async(id)=>{
              try{
                     const response=await fetch(`${API}/admin/contacts/delete/${id}`,{
                            method:"DELETE",
                            headers:{
                                   'Authorization':`Bearer ${token}`
                            }
                     })
                     if(response.ok)
                            {
                                   getAllContacts();
                                   if(!toastvisible)
                                          {
                                              setToastvisible(true);
                                              toast.success("Contact Deleted Successful",
                                                  {onClose:()=>setToastvisible(false)}
                                              );
                                          }
                            }
              }
              catch(e)
              {
                     console.log("Error from Admin-Contacts",e);
              }

       }
       useEffect(()=>{
              getAllContacts()
       },[]);
       if (loading) {
              return (
                  <div className="spinner-container">
                      <div className="loading-text">Fetching Contacts data...</div>
                      <div className="spinner"></div>
                  </div>
              )}
       return<>
       <div className="admin-sidebar-container">
           <AdminLayout/>
       </div>
       <div className="admin-userprofile">
       <h1 className="admin-head"> ADMIN CONTACTS PANEL</h1>
       <div className="admin-users-border">
      <table>
        <thead>
        <tr>
          <td>UserName</td>
          <td>Email</td>
          <td>Message</td>
          <td>Update</td>
          <td>Delete</td>
        </tr>
        </thead>
        <tbody>
     {
        contacts.map(Contact => (
          <tr key={Contact._id}>
            <td > {Contact.username} </td>
            <td>{Contact.email}</td>
            <td>{Contact.message}</td>
            <td><button className="button edit-button">Edit</button></td>
            <td><button className="button delete-button" onClick={()=>deleteContact(Contact._id)}>Delete</button></td>
          </tr>
        ))
     }
     </tbody>
     </table>
     </div>
     </div>
       </>
}