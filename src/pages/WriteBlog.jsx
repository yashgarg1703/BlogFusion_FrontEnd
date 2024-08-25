import { useState, useRef } from 'react';
import { useAuth } from '../store(context API)/authContextAPI';
import create_blog from './create-blog.png';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
const WriteBlog = () => {
    const [createBlog, setCreateBlog] = useState({
        title: "",
        desc: "",
        category:""
    });
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { token,API} = useAuth();
    const navigate=useNavigate();
    const [file, setFile] = useState(null); // State to store the selected file

    const handleInput = (e) => {
        const { name, value } = e.target;
        setCreateBlog({
            ...createBlog,
            [name]: value
        });
    };
    const handleCategoryChange=(e)=>{
        setCreateBlog({
            ...createBlog,
            category:e.target.value
        });
    }
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setFile(selectedImage); // Store the file
            const imageUrl = URL.createObjectURL(selectedImage);
            setImagePreview(imageUrl);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('img', file); // Append the file to FormData
        formData.append('title', createBlog.title);
        formData.append('category',createBlog.category);
        formData.append('desc', createBlog.desc);


        try {
            const response = await fetch(`${API}/createBlog`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            let data = await response.json();
            console.log('Response from createBlog:', data);
            toast.success("Created Blog Successfully");
            navigate('/blogs')
            setCreateBlog({
                title: "",
                desc: "",
                category:""
            });

            setImagePreview(null); // Reset the image preview
            setFile(null); // Reset the file input
        } catch (e) {
            console.log(e);
        }
    };

    const handleClickUpload = () => {
        fileInputRef.current.click();
    };

    return (
        <div className='create-blog-container'>
    <div>
    <center><img className="create-img" src={create_blog} alt="create blog"/></center>  
    </div>
        <div className="write-post-container">
            <form onSubmit={handleSubmit}>
                <h1>Create a New Post</h1>
                <div className="image-upload-container" onClick={handleClickUpload}>
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="image-preview" />
                    ) : (
                        <div className="image-placeholder">
                            <span>Click to Upload Image</span>
                        </div>
                    )}
                    <input
                        type="file"
                        id="image"
                        accept="image/jpeg, image/png"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                        ref={fileInputRef}
                        name="img"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name='title'
                        value={createBlog.title}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Category</label>
                    <select
                    name="category"
                    value={createBlog.category}
                    onChange={handleCategoryChange}
                    required>
                        <option value="" disabled >Select</option>
                        <option>Technology</option>
                        <option>Education</option>
                        <option>Business</option>
                        <option>Health</option>
                        <option>Sports</option>
                        <option>Travel</option>
                        <option>LifeStyle</option>
                        <option>Others</option>
                        </select>
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name='desc'
                        value={createBlog.desc}
                        rows="8"
                        cols="8"
                        onChange={handleInput}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-btn">Submit</button>
            </form>
        </div>
        </div>
    );
};

export default WriteBlog;
