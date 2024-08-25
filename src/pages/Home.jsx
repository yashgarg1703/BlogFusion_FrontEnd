
import { Button } from '@mui/material';
import image from './blog2.jpg';
import { useEffect, useState } from 'react';
import SentimentSatisfiedOutlinedIcon from '@mui/icons-material/SentimentSatisfiedOutlined';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import CommentIcon from '@mui/icons-material/Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn,faGithub } from '@fortawesome/free-brands-svg-icons';
import { useAuth } from '../store(context API)/authContextAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home=()=>{

    const [blogs,setBlogs]=useState([])
    const {token,API}=useAuth();
    const navigate=useNavigate();
    const handleBlogs=()=>{
       navigate('/blogs');
    }
    const handleContact=()=>{
        navigate('/contact');
    }
    const handleLogin=()=>{
        if(token)
        {
            navigate('/')
            toast.success("Already Logged In")
        }
        else
        {
            navigate('/login')
        }
    }
    const createBlog=()=>{
        navigate('/createBlogs')
    }
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
    }
    const getRecentBlogs=async()=>{
        const response=await fetch(`${API}/home/recentBlogs`,{
            method:'GET'
        })
        const data=await response.json();
        
        if(response.ok)
        {
            setBlogs(data.data);
        }
    }
    useEffect(()=>{
        getRecentBlogs();
    },[])
    return <>
    <div className="Home">
        <div className="grid-home">
            <div className="grid-text">
                <h1 className='grid-head'>Welcome To Blogging</h1>
                <img  className="responsive-home-img" src={image}/>
                <p className="grid-para">
                Blogging is a dynamic and versatile platform that empowers individuals and businesses to share their stories, expertise, and passions with a global audience. Whether you are a writer, entrepreneur, or hobbyist, blogging offers a space to express your ideas, connect with like-minded people, and build a loyal community. By consistently producing valuable content, you not only enhance your own creativity but also establish yourself as an authority in your field. Blogging can drive traffic to your website, boost brand awareness, and foster meaningful interactions with your audience. 
                It is an opportunity to document your journey, inspire others, and make a lasting impact. Embrace blogging as a powerful tool to amplify your voice and engage with the world.<br/>
                Regularly publishing valuable content not only enhances your visibility online but also allows you to engage in meaningful conversations with your readers. Blogging fosters creativity, encourages thoughtful reflection, and provides a space to document your personal or professional journey.
                Moreover, effective blogging can significantly boost your brands presence and reputation. By addressing your audience needs and interests with authenticity and passion, you can create lasting connections and inspire change. In a world where digital presence is crucial, blogging offers a unique opportunity to make an impact, share your expertise, and build a lasting relationship with your audience. Embrace blogging as a tool for growth, engagement, and meaningful interaction.
                </p>
                <button type="submit" className="login-btn" onClick={handleLogin}>LOG IN</button>
                <button type="submit" className="all-blogs-btn" onClick={handleBlogs}>ALL BLOGS</button>
            </div>
            <div className="grid-img">
                <img 
                src={image}
                height="500"
                width="500"
                />
            </div>
        </div>
        <div className='home-sec-second'>
            <div className='home-sec-second-content'>
                <div className='home-sec-second-content-white'>
                <h2>Join our BlogFusion Family!</h2>
            <p>Discover a platform where millions share their expertise, breaking news, and passions. 
            <span style={{cursor:'pointer'}}onClick={handleLogin}>Sign up</span> now to discover why <span>BlogFusion</span>  is the go-to platform for creators like you.
            </p>
                </div>
            
           <center><Button type="submit" onClick={createBlog}>Create Blog</Button></center> 
            </div>
        </div>
        <div id="third" className='home-sec-third'>
            <h2>Recent Blogs</h2>
          
            <div className="container-blog">
    {blogs.map(blog => (
     
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

        <div className='home-sec-fourth'>
        <div className='home-sec-second-content'>
                <div className='home-sec-second-content-white'>
                <h2>Having Query Or Suggestions !</h2><br/>
            <p>Do not hesitate to reach out to us at any time. Your input is invaluable in helping us enhance our services and ensure your satisfaction.
           <br/> 
           <p><span>BlogFusion</span> Welcomes Your Queries And Suggestions.</p><br/>
           <p>Fell Free To <span style={{cursor:'pointer'}} onClick={handleContact}>Contact Us</span>.</p>
            </p>
                </div>
            
           <center><Button type="submit" onClick={handleContact}>Contact Us</Button></center> 
            </div>
        </div>
        <div className='home-sec-fifth'>
        <footer style={{ backgroundColor: '#3A7CA5', color: '#F4F4F9', padding: '20px 0', textAlign: 'center' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <h3 style={{ marginBottom: '10px',fontSize:'22px' }}>About BlogFusion</h3>
                        <p className='home-sec-fifth-para' style={{ margin: 0 }}>BlogFusion is your go-to platform for insightful articles and engaging blog posts across a variety of categories. Join our community and stay updated with the latest trends and topics.</p>
                    </div>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <h3 style={{ marginBottom: '10px' }}>Quick Links</h3>
                        <ul className='home-sec-fifth-links' style={{ listStyle: 'none', padding: 0 }}>
                            <li><a href="/" style={{ color: '#FFCC00', textDecoration: 'none' }}>Home</a></li>
                            <li><a href="#" style={{ color: '#FFCC00', textDecoration: 'none' }} onClick={handleBlogs}>Blogs</a></li>
                            <li><a href="#" style={{ color: '#FFCC00', textDecoration: 'none' }} onClick={handleContact}>Contact</a></li>
                            <li><a href="#third" style={{ color: '#FFCC00', textDecoration: 'none' }}>Recent Blogs</a></li>
                            <li><a href="/BlogFusion/policy" style={{ color: '#FFCC00', textDecoration: 'none' }}>Privacy Policy</a></li>
                        </ul>
                    </div>
                    <div className="sec-fifth-follow-us"style={{ flex: 1, minWidth: '200px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Follow Us</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                            <a href="#" style={{ color: '#FFCC00', textDecoration: 'none', fontSize: '24px' }}><FontAwesomeIcon icon={faFacebookF} /></a>
                            <a href="#" style={{ color: '#FFCC00', textDecoration: 'none', fontSize: '24px' }}><FontAwesomeIcon icon={faTwitter} /></a>
                            <a href="https://github.com/yashgarg1703" style={{ color: '#FFCC00', textDecoration: 'none', fontSize: '24px' }}><FontAwesomeIcon icon={faGithub} /></a>
                            <a href="https://www.linkedin.com/in/yash-garg-777455227/" style={{ color: '#FFCC00', textDecoration: 'none', fontSize: '24px' }}><FontAwesomeIcon icon={faLinkedinIn} /></a>
                        </div>
                    </div>
                </div>
                <hr style={{ border: '1px solid #FFCC00', margin: '20px 0 20px 0' }} />
                <p style={{ margin: 0 }}>&copy; 2024 BlogFusion. All rights reserved.</p>
            </div>
        </footer>
        </div>
    </div>
    </>
}

export default Home;