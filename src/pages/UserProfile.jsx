import { UserDashboard } from "../layouts/UserDashboard";
import Blog_img from './Blog-img.png';
import image from './UserProfile3.png';
import like_img2 from './like-img2.png';
import dislike_img from './dislike-img.png';
import comment_img from './comment-img.jpg';
import WaveHandIcon from '@mui/icons-material/WavingHand';
import { PieChart } from '@mui/x-charts/PieChart';
import { useAuth } from "../store(context API)/authContextAPI";
import { useState } from "react";
import { useEffect } from "react";
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import CommentIcon from '@mui/icons-material/Comment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import {Typography, Box } from '@mui/material';
import No_Blog from './Noblogfound.png';
// import NoPostsIllustration from './NoPostsIllustration'; // Assume this is an illustration component
import { useNavigate } from "react-router-dom";
export const UserProfile=()=>{
    const[totalPost,setTotalPost]=useState(0);
    const[recentblogs,setRecentBlogs]=useState([]);
    const[likes,setLikes]=useState(0);
    const[dislikes,setDislikes]=useState(0);
    const[comments,setComments]=useState(0);
    const[Education,setEducation]=useState(0);
    const[Technology,setTechnology]=useState(0);
    const[Travel,setTravel]=useState(0);
    const[Health,setHealth]=useState(0);
    const[LifeStyle,setLifestyle]=useState(0);
    const[Sports,setSports]=useState(0);
    const[Business,setBusiness]=useState(0);
    const[Others,setOthers]=useState(0);
    const[loading,setLoading]=useState(true)
    const {user}=useAuth();
    const {token,API}=useAuth();
    const navigate=useNavigate();
    console.log(user)
    const userDashboard=async()=>{
        try{
        const response=await fetch(`${API}/user/dashboard`,{
            method:"GET",
            headers:{
               'Authorization':`Bearer ${token}`
            }
        })
        const data=await response.json();
        if(response.ok)
        {
            console.log(data)
            setTotalPost(data.total_post)
            setLikes(data.total_likes)
            setDislikes(data.total_dislikes)
            setComments(data.total_comments)
            
            setEducation(data.category.Education)
            setTechnology(data.category.Technology)
            setHealth(data.category.Health)
            setLifestyle(data.category.LifeStyle)
            setSports(data.category.Sports)
            setBusiness(data.category.Business)
            setTravel(data.category.Travel)
            setOthers(data.category.Others)

            setRecentBlogs(data.recent_blogs)
            setLoading(false)
        }
        else
        {
            console.log("Error in fetching response")
        }

    }
    catch(e)
    {
        console.log(e)
    }

    }
    
    const displayBlock=(id)=>{
            navigate(`/blogDetail/${id}`)
    }
    const AddNewBlog=()=>{
        navigate("/createBlogs");
    }
    const ShowAllBlogs=()=>{
        navigate("/dashboard/myBlogs")
    }
    useEffect(()=>{
       userDashboard();
    },[]);
    if (loading) {
        return (
            <div className="spinner-container">
                <div className="loading-text">Loading Dashboard...</div>
                <div className="spinner"></div>
            </div>
        );
    }
    return  user && <div className="userdashboard-container">
    <div className="userdashboard-sidebar-container">
        <UserDashboard/>
    </div>
    <div className="userdashboard-userprofile">
        <div className="welcome-msg">
        <div className="welcome-content">Welcome Back !
        <span className="hello-icon-container"><WaveHandIcon className="hello-icon" style={{color: '#FC0' }}></WaveHandIcon></span>
        </div>
        </div>
        
       
    <div className="userprofile-first-sec">
        <div className="userprofile-first-sec-content">
            <p className="top-heading">{user.username}</p>
            <p className="userdashboard-details">{user.email}</p>
            <p className="userdashboard-details">{user.phone}</p>
            <button className="userdashboard-edit-btn" type="submit">Edit</button>
            <img className="user-profile-img-1" src={image} alt="hello"/>
        </div>
        <div className="userprofile-first-sec-content"> 
            <p className="top-heading count-posts">Total Blogs</p>
            <p className="count-heading count-posts">{totalPost}</p>
            <img className="user-profile-img-2" src={Blog_img} alt="hello"/>
        </div>
        </div>
        <div className="userprofile-third-sec">
        <div className="userprofile-third-sec-content">
            {totalPost?
            <>
        <PieChart
        
        colors={["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40", "#FF4500", "#00FF7F"]}
  series={[
    {
      data: [
        { id: 0, value: Education, label: 'Education' }, //no {Education}..without curly braces
        { id: 1, value: Sports, label: 'Sports' },
        { id: 2, value: Health, label: 'Health' },
        { id: 3, value: Technology, label: 'Technology' },
        { id: 4, value: Business, label: 'Business' },
        { id: 5, value: LifeStyle, label: 'Lifestyle' },
        { id: 6, value: Travel, label: 'Travel' },
        { id: 7, value: Others, label: 'Others' }
      ],
      innerRadius: 0,
      outerRadius: 100,
      paddingAngle: 0,
      cornerRadius: 5,
      startAngle: 0,
      endAngle: 360,
      cx: 152,
      cy: 150,
    }
  ]}
  width={600}
  height={300}
/>
<p>PieChart Displaying Total Blogs Posted By You Of Various Categories</p>
</>
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
        <div className="userprofile-second-sec">
        <div className="userprofile-second-sec-content">
        <p className="top-heading count-likes">Total Likes</p>
        {/* by user */}
        <p className="count-heading count-likes">{likes}</p>
        <img className="like-img" src={like_img2} alt="hello"/>
        </div>
        
        <div className="userprofile-second-sec-content"> 
            <p className="top-heading count-comments">Total Comments</p>
            <p className="count-heading count-comments">{comments}</p>
            <img className="comment-img" src={comment_img} alt="hello"/>
        </div>
        <div className="userprofile-second-sec-content"> 
            <p className="top-heading count-dislikes">Total Dislike</p>
            <p className="count-heading count-dislikes">{dislikes}</p>
            <img className="dislike-img" src={dislike_img} alt="hello"/>
        </div>
        
    </div>
    <div className="userprofile-fourth-sec">
        <div className="recent-blogs-head">
            <div className="recent-blogs-head-content">
                Recent Blogs
            </div>

            <div className="recent-blogs-btn">
            <div className="add-new-blog-btn">
             <button className="add-new-blog" onClick={AddNewBlog}>
                <div className="button-content">
            <AddCircleOutlineIcon />
            <span>Add New</span>
        </div>
    </button>
</div>

                <div className="show-all-blogs-btn">
                    <button className="show-all-blogs" onClick={ShowAllBlogs}>
                    <div className="button-content">
                    <DescriptionOutlinedIcon/> 
                    <span>Show All Blogs</span>
                    </div>
                    </button>
                </div>
            </div>
        </div>
         
        <div className="recent-blogs-post">
            {totalPost?
            <div className="recent-blogs-post-content">
             
            <div className="container-recent-blog">
    {recentblogs.map(blog => (
     
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
            </div>
            :
            <center><h2>No Blogs Added Yet !</h2></center>
}
        </div>
    </div>
    </div>
    </div>
}