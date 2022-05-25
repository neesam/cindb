import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import "../App.css";
import { Link } from "react-router-dom";


const MovieDetails = (props) => {
    const { id, userName} = useParams();
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

    const handleLogout = () => {
        axios.post("http://localhost:8000/api/user/logout", {}, {withCredentials:true})
            .then((res) => console.log(res), navigate("/"))
            .catch((err) => console.log(err, "Error"));
    };


    const deleteHandler = () => {
        axios.delete(`http://localhost:8000/api/movie/${id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
                
                navigate(`/user/${userName}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        
        <div style={{background: 'rgba(200, 50, 100, .5)', height: '100vh'}} className="movieDetails-component">
            <Nav style={{display: 'flex', justifyContent: 'center', position: 'relative', marginLeft: '600px'}} activeKey="/home">
                <Nav.Item style={{fontSize: '40px', padding: '30px', marginRight: '30px'}}><b>CinDB</b>
                </Nav.Item>
                <div style={{display: 'flex',marginLeft: '200px'}}>
                <Nav.Item class="profile">
                    <Nav.Link style={{fontSize: '20px', padding: '50px'}} href={`/user/${userName}`}><b>{userName}'s profile</b></Nav.Link>
                </Nav.Item>
                <Nav.Item class="profile">
                    <Nav.Link style={{fontSize: '20px', padding: '50px'}} href={`/newRating/${userName}`}><b>Add Rating</b></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Button style={{marginTop:'50px'}} classname="logoutBtn" size="sm" variant="danger" onClick={()=> handleLogout()}>Logout</Button>
                </Nav.Item>
                </div>
            </Nav>
            <div style={{padding: '50px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'white', margin: '50px', borderRadius: '50px', boxShadow: '5px 5px 5px grey', width: '750px'}}>
            <h2>{movieDetails.movieName}</h2>
            <h3>Rating: {movieDetails.rating} | <a href={`/user/${movieDetails.userName}`}>{movieDetails.userName}</a></h3>
            <h4>"{movieDetails.comment}"</h4>
            
            
            <button style={{width: '100px'}}
                onClick={() => deleteHandler(movieDetails.movieName)}
                    className="btn btn-danger"
            >
            Delete
            </button>
            </div>
        </div>
    );
};

export default MovieDetails;