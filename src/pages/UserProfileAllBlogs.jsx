  import { useEffect, useState } from "react";
import { UserDashboard } from "../layouts/UserDashboard"
import { useAuth } from "../store(context API)/authContextAPI"
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import CommentIcon from '@mui/icons-material/Comment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { Typography, Box } from '@mui/material';
import No_Blog from './Noblogfound.png';
import { useNavigate } from "react-router-dom";
  export const UserProfileAllBlogs=()=>{
    const [userblogs,setUserBlogs]=useState([])
    const [loading,setLoading]=useState(true)
    const {token,API}=useAuth();
    const navigate=useNavigate();
    const UserBlogs=async()=>{
        try{
            const response=await fetch(`${API}/dashboard/userblogs`,{
                method:"GET",
                headers:{
                    "Authorization":`Bearer ${token}`
                }
            })
            const data=await response.json();
            if(response.ok)
            {
                setUserBlogs(data.data)
                setLoading(false);
            }
        }
        catch(e)
        {
            console.log(e);
        }
        
    }
    const displayBlock=(id)=>{
        navigate(`/blogDetail/${id}`)
}
const AddNewBlog=()=>{
    navigate("/createBlogs");
}
    useEffect(()=>{
        UserBlogs();
    },[])
    if (loading) {
        return (
            <div className="spinner-container">
                <div className="loading-text">Loading Your Blogs...</div>
                <div className="spinner"></div>
            </div>
        );
    }
    return <div className="userdashboard-container">
    <div className="userdashboard-sidebar-container">
        <UserDashboard/>
    </div>
    <div className="userdashboard-userprofile">
    {userblogs.length>0?
    <div className="container-recent-blog">
    {userblogs.map(blog => (
     
    <div className="container-blog-data" 
    onClick={()=>displayBlock(blog._id)} 
    key={blog._id}>
         {/* <p>{blog.img.data}</p> */}
         <img src={`${API}/createBlog/${blog.img.data}`}/>
    <div  className="blog-data-style">
    
    <h2 className="blog-data-title">{blog.title}</h2>
    <h4 className="blog-data-author">-&nbsp;By&nbsp;{blog.author}</h4>
    <p className="blog-data-desc">{blog.desc}</p>
    </div>
    
    <div className="blog-like-dislike">
        <div className="like-dislike-div">
        <div className="blog-like">
                <span><SentimentSatisfiedOutlinedIcon color="primary"/></span>
                <p name="like">{blog.likes}</p>
        </div>
        <div className="blog-dislike">
                <span ><SentimentVeryDissatisfiedIcon color="secondary"/></span>
                <p name="dislike">{blog.dislikes}</p>
        </div>
        </div>
        <div className="Comment-Icon">
            <span><CommentIcon color="action"/></span>
            <p>{blog.comments.length}</p>
            </div>
    </div>
    </div>
    ))}
      </div>
    :
    <>
<Box textAlign="center" mt={5}>
<img src={No_Blog} alt="No posts found" style={{ maxWidth: '50%', height: '70%' }} />
    <Typography variant="h6" color="textSecondary" gutterBottom>
      You have not posted any blogs yet!
    </Typography>
    <Typography variant="body1" color="textSecondary" gutterBottom>
      Start sharing your thoughts and experiences with the world.
    </Typography>
    <center>
    <button id="create-your-first-post" className="add-new-blog" 
    onClick={AddNewBlog}
    >
                <div className="button-content">
            <AddCircleOutlineIcon />
            <span>Create Your First Post</span>
        </div>
    </button>
    </center>
    
  </Box>
</>
}
    </div>
    </div>
  }