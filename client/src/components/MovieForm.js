import axios from "axios";
import { useState } from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";
import React from 'react';


const MovieForm = () => {
    const [movieName, setMovieName] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const handleSubmit = (e) => {
        e.preventDefault();
        axios
        .post("http://localhost:8000/api/movie", { movieName, rating, comment })
        .then((response) => {
            console.log("r",response);
            navigate("/");
    })
        .catch((err) => {
            console.log("error", err.response.data.err.errors); 
            setErrors(err.response.data.err.errors);
    });
};
    return (
        <div className="movieForm-component">
        <div className="container">
        <div className="row">
        <div className="col-md-4 offset-md-2">
        
            <Link to="/">Home</Link>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                <h3 className="purple-text">Create A Movie Rating</h3>
                <div>
                    <label htmlFor="name">Show / Movie (title)</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setMovieName(e.target.value)}
                        value={movieName}
                    />
                    {errors.movieName ? <p>{errors.movieName.message}</p> : null}
                </div>
                
                <div>
                    <label>Rating</label><br/>
                    <input 
                        type="text" 
                        className="form-control"
                        onChange = {(e)=>setRating(e.target.value)}
                        value={rating}
                    />
                    {errors.rating ? <p>{errors.rating.message}</p> : null}
                </div>
                
                <div>
                    <label>Comment</label><br/>
                    <input 
                        type="text" 
                        className="form-control"
                        onChange = {(e)=>setComment(e.target.value)}
                        value={comment}
                    />
                    {errors.comment ? <p>{errors.comment.message}</p> : null}
                </div>




                <div className="button-space">
                <button className="btn btn-primary" type="submit">
                    SUBMIT
                </button>
                </div>
                </div>
            </form>
        </div>
        </div>
        </div>
    </div>
    );
};


export default MovieForm;