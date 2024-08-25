import { useEffect, useState } from "react";
import { useAuth } from "../store(context API)/authContextAPI";
import { useNavigate } from "react-router-dom";
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import CommentIcon from '@mui/icons-material/Comment';
// import uploads from "../uploads"
const Blog=()=>{
    const [blogs,setBlogs]=useState([]);
    const [category,setCategory]=useState("all")
    const [loading,setLoading]=useState(true);
    // const [click,setClick]=useState(false);
    // const [blogClicked,setBlogClicked]=useState("");
    const {user}=useAuth();
    const {token,API}=useAuth();
    const navigate=useNavigate();
    const handleCategory=(e)=>{
        // alert(e.target.id)
        setCategory(e.target.id)
    }
    const blog_fetch=async()=>{
        try{
            // alert(category)
            const response=await fetch(`${API}/blogs/${category}`,{
                method:"GET",
                headers:{
                    'Content-Type':'application/json',
                    // 'Authorization':`Bearer ${token}`
                },
                // body:JSON.stringify(response)
            })
            if(response.ok)
                {
                    let blog_data=await response.json();
                    setBlogs(blog_data);
                    setLoading(false);
                    // console.log(blog_data);
                }
                else
                {
                    console.error("Not able to fetch B=blog_data")
                }
        }
        catch(e)
        {
            console.log("Blog not found",e)
        }
        }
        useEffect(()=>{
         blog_fetch()
        },[category])
        const displayBlock=(id)=>{
            // console.log(token)
            if(!token)
                {
                    navigate("/login");
                }
            else
            {
                navigate(`/blogDetail/${id}`)
            }
            // console.log(blog)
           
        //  console.log("clicked",blog)
        //  setBlogClicked(blog);
        //  setClick(true);
        }
        if (loading) {
            return (
                <div className="spinner-container">
                    <div className="loading-text">Fetching Blogs...</div>
                    <div className="spinner"></div>
                </div>
            );
        }
    return<>
    <h2 className="blogs_head"> Welcome {user?user.username:"Buddy"}, To The Blog Posts</h2>
    <div>
        <div className="category-section">
            <ul className="category sections">
                <li id="all"  onClick={(e)=>handleCategory(e)}>All</li>
                <li id="Technology" onClick={(e)=>handleCategory(e)}>Technology</li>
                <li id="Education"  onClick={(e)=>handleCategory(e)}>Education</li>
                <li id="Business"  onClick={(e)=>handleCategory(e)}>Business</li>
                <li id="Health" onClick={(e)=>handleCategory(e)}>Health</li>
                <li id="Sports" onClick={(e)=>handleCategory(e)}>Sports</li>
                <li id="Travel" onClick={(e)=>handleCategory(e)}>Travel</li>
                <li id="LifeStyle" onClick={(e)=>handleCategory(e)}>LifeStyle</li>
                <li id="Others" onClick={(e)=>handleCategory(e)}>Others</li>
            </ul>
        </div>
    <div className="container-blog">
    {blogs.map(blog => (
     
    <div className="container-blog-data" onClick={()=>displayBlock(blog._id)} key={blog._id}>
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
    </>

}

export default Blog;
