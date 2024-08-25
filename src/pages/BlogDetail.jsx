// import { useLocation} from "react-router-dom"
// import { useEffect } from "react";
import { useAuth } from "../store(context API)/authContextAPI";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import {toast} from 'react-toastify'
// import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
// import { io } from "socket.io-client";
// const socket = io("${API}");


export const BlogDetail=()=>{
    // to fetch id from the URL
    const params = useParams()
  console.log("id from params",params)
  
// const location=useLocation();
const navigate=useNavigate();

const [blogdata,setBlogdata]=useState(null);
// const [islike,setIsLike]=useState(false);
const [like,setLike]=useState(0)
const [dislike,setDislike]=useState(0)
const [comment,setComment]=useState("");
const [allcomments,setAllComments]=useState([])
const [loading,setLoading]=useState(true);
const {user}=useAuth();
const {token,API}=useAuth();
// const blog_data=location.state;
// console.log(blog_data)

const getBlockbyID=async()=>{
    const response=await fetch(`${API}/blog/${params.id}`,{
       method:"GET",
       headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
       }
    })
    console.log("response",response)
    if(response.ok)
        {
          const data=await response.json();
          console.log(data)
          if(data.Blog)
          {
            setBlogdata(data.Blog)
            setLike(data.Blog.likes || 0)//set initial like count
            setDislike(data.Blog.dislikes || 0)//set initial dislike count
            setAllComments(data.Blog.comments)//set initial comment
            setLoading(false);
          }
          else
          {
            console.log(response.status)
            console.log("Blog not found",data)
          }
         
        }
}
//comment 
const onhandleComment=(e)=>{
   setComment(e.target.value)
//    console.log(comment)
}
const handleAddComment=async()=>{
    if(!comment)
    {
      toast.warn("Comment Cannot be NULL")
    }
    else
    {
        try{
            const response=await fetch(`${API}/blog/addComment/${params.id}`,{
                method:'POST',
                headers:{
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body:JSON.stringify({comment,user})
            })
            const data=await response.json();
            if(response.ok)
            {
                setAllComments(data.comments)
                setComment("");
              
                toast.success("Comment Added Successfully")
                console.log(data)
                
                
            }
            else
            {
                toast.error("Internal Error")
            }
        }
    catch(e)
    {
        console.log("Not able to add comment",e)
    }
}   
}
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

useEffect(()=>{
    getBlockbyID();
        
},[])
const handleLike=async()=>{
    try{
        const response=await fetch(`${API}/addLike/${params.id}`,{
        method:"POST",
       headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
       }
    })
    const data=await response.json();
    console.log(data)
    if(response.status===200)
    { 
        // socket.emit('addLike', { blog_id: params.id, likes: data.likes, dislikes: data.dislikes });
        toast.success("Post Liked Successfully")
        setLike(data.likes)
        setDislike(data.dislikes)
        
    }
    else if(response.status===201)
    {
        toast.success("Like Removed Successfully")
        setLike(data.likes)
        setDislike(data.dislikes)
    } 
}
    catch(e)
    {
        console.log(e)
    }
}
const handledisLike=async()=>{
    try{
        const response=await fetch(`${API}/removeLike/${params.id}`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json',
                "Authorization":`Bearer ${token}`
            }
        })
        const data=await response.json();
        console.log(data)
        if(response.status===200)
        {
            
            // socket.emit('addDislike', { blog_id: params.id, likes: data.likes, dislikes: data.dislikes });
            toast.success("Post Disliked Succesfully")
            setLike(data.likes)
        setDislike(data.dislikes)
        }
        else if(response.status===201)
        {
            toast.success("Dislike Removed Succesfully")
            setLike(data.likes)
        setDislike(data.dislikes)
        }
        
    }
   
   catch(e)
   {
    console.log(e);
   }
}
const deleteBlog=async(id)=>{
    // console.log(id)
    try{
        const response=await fetch(`${API}/blogs/delete/${id}`,{
        method:"DELETE",
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
       console.log(response);
       navigate("/blogs")
    }
    catch(e)
    {
        console.log(e);
    }
}
const updateBlog=async(id)=>{
    navigate(`/blogs/update/${id}`);
}
if (loading) {
    return (
        <div className="spinner-container">
            <div className="loading-text">Fetching Blog data...</div>
            <div className="spinner"></div>
        </div>
    );
}
    return blogdata &&<div>
    <h2 className="blogs_head"> Welcome {user?user.username:"Buddy"}, To The Blog Posts</h2>
    <div className="container-blog-clicked">
      <div className="container-blog-data-clicked">
         {/* <p>{blog.img.data}</p> */}
         <img src={`${API}/createBlog/${blogdata.img.data}`}/>
    <div  className="blog-data-style-clicked">
    
    <h2 className="blog-data-title-clicked">{blogdata.title}</h2>
    <h4 className="blog-data-author-clicked">-&nbsp;By&nbsp;{blogdata.author}</h4>
    <p className="blog-data-desc-clicked">{blogdata.desc}</p>
    </div>
    <div className="like-dislike-btn">
    {user.email===blogdata.email
    ?
    <div className="like-dislike">
        <div className="like">
                <span><SentimentSatisfiedOutlinedIcon className="like-dislike-icon" color="primary"></SentimentSatisfiedOutlinedIcon></span>
                <p name="like">{like}</p>
        </div>
        <div className="dislike">
                <span ><SentimentVeryDissatisfiedIcon className="like-dislike-icon" color="secondary"></SentimentVeryDissatisfiedIcon></span>
                <p name="dislike">{dislike}</p>
        </div>
    </div>
    :
    <div className="like-dislike">
        <div className="like">
                <span onClick={handleLike}><SentimentSatisfiedOutlinedIcon className="like-dislike-icon" color="primary" /></span>
                <p name="like">{like}</p>
        </div>
        <div className="like">
                <span onClick={handledisLike}><SentimentVeryDissatisfiedIcon className="like-dislike-icon" color="secondary" /></span>
                <p name="dislike">{dislike}</p>
        </div>
    </div>}
   
    {user.email===blogdata.email
    ?
    <>
    <div className="div-BlogDetails">
    <div><button className="btn-BlogDetails-first" onClick={()=>updateBlog(blogdata._id)}>Edit</button></div>
     <div><button className="btn-BlogDetails-second" onClick={()=>deleteBlog(blogdata._id)}>Delete</button></div>
    </div>
     
     </>
    :
    ""
    }
    </div>
    </div>
    </div>
    {/*comment box*/}
    {user.email===blogdata.email
    ?
    ""
    :
    <div className="comment-section">
    <h2 className="comment-head">Comments:</h2>
    <div className="comment-div">
    <textarea name="textarea" onChange={onhandleComment} className="comment-textarea" rows="6" cols="50" value={comment}/>
    <button className="comment-submit" onClick={handleAddComment} type="submit">Add Comment</button>
    </div>
    </div>
    }
    
    <div className="display-comment">
    {allcomments.map((comment, index) => (
        <div className="user-comment" key={index}>
            <div className="comment-header">
                <p className="commented-by">Commented By: {comment.postedBy}</p>
                <p className="commented-on">Commented On: {formatDate(comment.created)}</p>
            </div>
            <p className="comment-content">{comment.text}</p>
        </div>
    ))}
</div>

</div>

    

}