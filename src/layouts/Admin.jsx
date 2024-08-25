import { NavLink} from "react-router-dom"
import { FiUsers } from "react-icons/fi";
import { RiContactsBook2Fill } from "react-icons/ri";
// import { useAuth } from "../store(context API)/authContextAPI";
// import { useEffect } from "react";
// import {toast} from 'react-toastify'
export const AdminLayout=()=>{
    // const {user}=useAuth();
    // const navigate=useNavigate();

    // useEffect(()=>{
    //     if(user && !user.isAdmin)
    //     {
    //         navigate('/');
    //         toast.error("Admin Access Denied!")
    //     }
    //  },[user,navigate])
     return(
    <>
      <header className="userdashboard-sidebar">
      <div className="admin-sidebar-content">
      
      <div className="admin-navlinks"><li className="userdashboard-navlinks-content"><NavLink to="/admin/users"><FiUsers />&nbsp;Users </NavLink></li></div>
      <div className="admin-navlinks"><li className="userdashboard-navlinks-content"><NavLink to="/admin/contacts"><RiContactsBook2Fill />&nbsp;Contacts</NavLink></li></div>
      
      </div>
     </header>
     
   </>
     )
}
