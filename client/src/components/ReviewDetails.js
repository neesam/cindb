import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../App.css";
import { Link } from "react-router-dom";


const MovieDetails = (props) => {
    const { id } = useParams();
    const [movieDetails, setMovieDetails] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`http://localhost:8000/api/movie/${id}`)
            .then((res) => {
                console.log('res',res);
                console.log('data', res.data);
                setMovieDetails(res.data.queriedMovie);
                

            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]); 

    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/movie/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                
                navigate("/");
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        
        <div className="movieDetails-component">
            
            <h2>Movie / Show (title): {movieDetails.movieName}</h2>
            <p><Link to="/">Home</Link></p>
            <p>Ratings: {movieDetails.rating}</p>
            <p>Comment: {movieDetails.comment}</p>
            
            
            <button
                onClick={() => deleteHandler(movieDetails.movieName)}
                    className="btn btn-danger"
            >
            Delete
            </button>
        </div>
    );
};

export default MovieDetails;