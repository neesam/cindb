import axios from "axios";
import { useState } from "react";
import "../App.css";
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import React from 'react';


const MovieForm = () => {
    const [user, setUser] = useState("");
    const [movieName, setMovieName] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");
    const [movieDetail, setMovieDetail] = useState("");

    const navigate = useNavigate();
    const { userName } = useParams();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${userName}`, { withCredentials: true })
            .then(res => {
                setUser(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, []);

    const handleLogout = () => {
        axios.post("http://localhost:8000/api/user/logout", {}, {withCredentials:true})
            .then((res) => console.log(res), navigate("/"))
            .catch((err) => console.log(err, "Error"));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/movie", { movieName, movieDetail, rating, comment, userName })
            .then((response) => {
                console.log("success", response);
                navigate(`/home/${userName}`);
            })
            .catch((err) => {
                console.log("error", err.response.data.err.errors);
                setErrors(err.response.data.err.errors);
            });
    };
    return (
        <div style={{background: '#8c94f7', height: '100vh'}}>
            <Nav style={{display: 'flex', position: 'relative', alignItems: 'center'}} activeKey="/home">
                <Nav.Item style={{fontSize: '40px', padding: '30px', marginRight: '30px', color: 'pink', textShadow: '2px 2px 2px black'}}><b><a style={{textDecoration: 'none', color: 'pink'}} href={`/home/${userName}`}>CinDB</a></b>
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
        <div style={{padding: '50px', background: 'white', margin: '50px', borderRadius: '50px', boxShadow: '5px 5px 5px grey', display: 'flex', flexDirection: 'column'}} className="movieForm-component">
            <div className="container">
                <div className="row">
                        <form onSubmit={handleSubmit}>
                            <input type="hidden" name="userName" value={{ userName }} />
                            <div className="form-group">
                                <h2 className="purple-text">create a rating</h2>
                                <div style={{marginTop: '40px'}}>
                                    <label htmlFor="name">show / movie</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setMovieName(e.target.value)}
                                        value={movieName}
                                    />
                                    {errors.movieName ? <p>{errors.movieName.message}</p> : null}
                                </div>

                                <div style={{marginTop: '10px'}}>
                                    <label>details</label><br />
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setMovieDetail(e.target.value)}
                                        value={movieDetail}
                                    />
                                    {errors.movieDetail ? <p>{errors.movieDetail.message}</p> : null}
                                </div>

                                
                                <div style={{marginTop: '10px'}}>
                                    <label>rating</label><br />
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setRating(e.target.value)}
                                        value={rating}
                                    />
                                    {errors.rating ? <p>{errors.rating.message}</p> : null}
                                </div>

                                <div style={{marginTop: '10px'}}>
                                    <label>comment</label><br />
                                    <input
                                        type="text"
                                        className="form-control"
                                        onChange={(e) => setComment(e.target.value)}
                                        value={comment}
                                    />
                                    {errors.comment ? <p>{errors.comment.message}</p> : null}
                                </div>




                                <div style={{marginTop: '30px'}} className="button-space">
                                    <button className="btn btn-primary" type="submit">
                                        submit
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