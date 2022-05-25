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
                
                navigate(`/home/${userName}`);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        
        <div style={{background: '#8c94f7', height: '100vh'}} className="movieDetails-component">
            <Nav style={{display: 'flex', position: 'relative', alignItems: 'center'}} activeKey="/home">
                <Nav.Item style={{fontSize: '40px', padding: '30px', marginRight: '30px', color: 'pink', textShadow: '2px 2px 2px black'}}><b>CinDB</b>
                </Nav.Item>
                <div style={{display: 'flex', marginLeft: '700px'}}>
                <Nav.Item class="profile">
                    <Nav.Link style={{fontSize: '20px', padding: '50px', color: 'pink', textShadow: '2px 2px 2px black'}} href={`/user/${userName}`}><b>{userName}'s profile</b></Nav.Link>
                </Nav.Item>
                <Nav.Item class="profile">
                    <Nav.Link style={{fontSize: '20px', padding: '50px', marginLeft: '-20px', color: 'pink', textShadow: '2px 2px 2px black'}} href={`/newRating/${userName}`}><b>add rating</b></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Button style={{marginTop:'50px', marginLeft: '30px', backgroundColor: 'pink', color: 'black', border: 'none', boxShadow: '2px 2px 2px black'}} classname="logoutBtn" size="sm" 
                    onClick={()=> handleLogout()}>logout</Button>
                </Nav.Item>
                </div>
            </Nav>
            <div style={{padding: '50px', display: 'flex', flexDirection: 'column', gap: '20px', background: 'white', margin: '50px', borderRadius: '50px', boxShadow: '5px 5px 5px grey', width: '750px'}}>
            <h2 style={{fontSize: '50px'}}>{movieDetails.movieName}</h2>
            <h3>Rating: {movieDetails.rating}</h3>
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