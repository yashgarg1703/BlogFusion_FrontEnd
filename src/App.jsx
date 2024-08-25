import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {UserDashboard} from './layouts/UserDashboard' 
import {UserProfile} from './pages/UserProfile'
import { UserProfileAllBlogs } from "./pages/UserProfileAllBlogs";
import { UserProfileLikedPost } from "./pages/UserProfileLikedPost"; 
import { UserProfileDisLikedPost } from "./pages/UserProfileDisLikedPost";
import Home from './pages/Home'
import About from "./pages/About";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Blogs from "./pages/blogs"
import { BlogDetail } from "./pages/BlogDetail";
import { Logout } from "./pages/Logout";
// import {AdminLayout} from "./layouts/Admin"
import  {AdminUsers}  from "./pages/Admin-Users";
import  {AdminContacts}  from "./pages/Admin-Contacts";
import {AdminUpdateUser} from "./pages/AdminUpdateUser";
import {UpdateBlog} from "./pages/UpdateBlog"
import WriteBlog from "./pages/WriteBlog";
import './index.css'
import PrivacyPolicy from "./pages/PrivatePolicy";
const App=()=>{
  return <>
  <BrowserRouter>
  <Navbar/>
  <Routes>
    <Route path="/" element={<Home/>} />
    <Route path="/BlogFusion/policy" element={<PrivacyPolicy/>} />
    <Route path="/about" element={<About/>} />
    <Route path="/blogs" element={<Blogs/>} />
    <Route path="/contact" element={<Contact/>} />
    <Route path="/logout" element={<Logout/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/login" element={<Login/>} />
    <Route path="/createBlogs" element={<WriteBlog/>}/>
    {/* Route to display specific Blog Details */ }

    <Route path="/blogDetail/:id" element={<BlogDetail/>}/>
    <Route path="/blogs/update/:id" element={<UpdateBlog/>}/>
    {/* Nested Routes dont forget to use <Outlet/> */}
    <Route path="/admin" element={<AdminUsers/>}/>
    <Route path="/admin/users" element={<AdminUsers/>}/>
    <Route path="/admin/contacts" element={<AdminContacts/>}/>
    <Route path="updateUser/:id" element={<AdminUpdateUser/>}/>
    <Route path="/dashboard" element={<UserProfile/>}/>
    <Route path="/dashboard/userprofile" element={<UserProfile/>}/>
     <Route path="/dashboard/myBlogs" element={<UserProfileAllBlogs/>}/>
     <Route path="/dashboard/likedPost" element={<UserProfileLikedPost/>}/>
     <Route path="/dashboard/dislikedPost" element={<UserProfileDisLikedPost/>}/>


  </Routes>
  </BrowserRouter>
  </>
}
export default App;