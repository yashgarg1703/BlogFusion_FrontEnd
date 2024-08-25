
import { NavLink, Outlet } from "react-router-dom"
import { IoPersonCircle } from "react-icons/io5";
import { RiContactsBook2Fill } from "react-icons/ri";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { RiLogoutCircleLine } from "react-icons/ri";
export const UserDashboard=()=>{
   return<>
   
   <header>
    <ul>
    <div className="userdashboard-sidebar">
        <div className="userdashboard-sidebar-content">
        <div className="userdashboard-navlinks"><li className="userdashboard-navlinks-content"><NavLink className="profile" to="/dashboard/userprofile"><IoPersonCircle size={30}/>&nbsp;Profile </NavLink></li></div>
        <div className="userdashboard-navlinks"><li className="userdashboard-navlinks-content"><NavLink className="myblogs"to="/dashboard/myBlogs"><RiContactsBook2Fill size={25}/>&nbsp;My Blogs</NavLink></li></div>
        <div className="userdashboard-navlinks"><li className="userdashboard-navlinks-content"><NavLink className="liked" to="/dashboard/likedPost"><AiFillLike size={25}/>&nbsp;Liked Blogs</NavLink></li></div>
        <div className="userdashboard-navlinks"><li className="userdashboard-navlinks-content"><NavLink className="disliked" to="/dashboard/dislikedPost">< AiFillDislike size={25}/>&nbsp;Disliked Blogs</NavLink></li></div>
        <div className="userdashboard-navlinks"><li className="userdashboard-navlinks-content"><NavLink className="logout" to="/logout">< RiLogoutCircleLine size={25}/>&nbsp;Logout</NavLink></li></div>
        </div>
        </div>
    </ul>
   </header>
   
   <Outlet/>
   
   </>
   
}