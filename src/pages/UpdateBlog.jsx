import { useEffect, useRef, useState } from "react";
import { useAuth } from "../store(context API)/authContextAPI";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

export const UpdateBlog = () => {
    const params = useParams();
    const [blog, setBlog] = useState({
        title: "",
        desc: "",
        category: ""
    });
    const { token,API } = useAuth();
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState(null);
    const [file, setFile] = useState(null);
    const fileInputRef = useRef(null);
    const [loading, setLoading] = useState(true);
    const getBlogDetails = async () => {
        try {
            const response = await fetch(`${API}/blogs/blogdata/${params.id}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                setBlog(data.data);
                setLoading(false);
                
                setImagePreview(`${API}/createBlog/${data.data.img}`);
                // if(data)
                // {
                //     setFile(data.data.img);
                //     console.log(data.data.img)
                //     console.log(file)
 
            }
        } catch (e) {
            console.log(e);
        }
    };

    const updateBlog = async (e) => {
        try {
            e.preventDefault();
            const formData = new FormData();
            if (file && typeof file !== 'string') { // Only append img if a new file is selected
                formData.append('img', file);
            }
            formData.append('title', blog.title);
            formData.append('category', blog.category);
            formData.append('desc', blog.desc);

            const response = await fetch(`${API}/blogs/update/blogdata/${params.id}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });

            if (response.ok) {
                toast.success("Blog Updated Successfully");
                navigate(`/blogDetail/${params.id}`);
            } else {
                toast.error("Unable to Update Blog");
            }
        } catch (e) {
            console.log(e);
        }
    };

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBlog({ ...blog, [name]: value });
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setFile(selectedImage);
            const imageUrl = URL.createObjectURL(selectedImage);
            setImagePreview(imageUrl);
        }
    };

    const handleClickUpload = () => {
        fileInputRef.current.click();
    };

    useEffect(() => {
        getBlogDetails();
       
    }, []);

    if (loading) {
        return (
            <div className="spinner-container">
                <div className="loading-text">Fetching Blog data...</div>
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="write-post-container">
            <form onSubmit={updateBlog}>
                <h1>Update Post Details</h1>
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
                        value={blog.title}
                        onChange={handleInput}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        name="category"
                        value={blog.category}
                        onChange={handleInput}
                        required>
                        <option value="" disabled>Select</option>
                        <option>Technology</option>
                        <option>Education</option>
                        <option>Business</option>
                        <option>Health/Fitness</option>
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
                        value={blog.desc}
                        rows="8"
                        cols="8"
                        onChange={handleInput}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="submit-btn">Update</button>
            </form>
        </div>
    );
};
