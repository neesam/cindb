import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const ProfilePage = () => {
    const {userName} = useParams();
    const [user, setUser] = useState("");
    const [ratings, setRatings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${userName}`, {withCredentials : true})
        .then(res => {
            setUser(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

    const handleLogout = () => {
        axios.post("http://localhost:8000/api/user/logout", {}, { withCredentials: true })
            .then((res) => console.log(res), navigate("/"))
            .catch((err) => console.log(err, "Error"));
    };

    useEffect(() => {
        axios.get(`http://localhost:8000/api/ratings/${userName}`, {withCredentials : true})
        .then(res => {
            setRatings(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

    const handleDeleteUser = (id) => {
        axios.delete(`http://localhost:8000/api/user/${id}`)
        .then((res) => {
            console.log('User deleted succesfully.', res)
            navigate('/');
        })
        .catch((err) => {
            console.log(err)
        })};

        const handleDeleteRating = (id) => {
            axios.delete(`http://localhost:8000/api/rating/${id}`)
            .then((res) => {
                console.log('Deleted succesfully.', res)
                setRatings(ratings.filter(rating => rating._id != id));
            })
            .catch((err) => {
                console.log(err)
            })};

    return(
        <div style={{ background: '#8c94f7', height: '100vh' }}>
            <Nav style={{ display: 'flex', position: 'relative', alignItems: 'center', fontFamily: 'limelight' }} activeKey="/home">
                <Nav.Item style={{ fontSize: '40px', padding: '30px', marginRight: '30px', color: 'pink', textShadow: '2px 2px 2px black' }}><b>CinDB</b>
                </Nav.Item>
                <div style={{ display: 'flex', marginLeft: '1000px' }}>
                    <Nav.Item class="profile">
                        <Nav.Link style={{ fontSize: '20px', padding: '50px', marginLeft: '-20px', color: 'pink', textShadow: '2px 2px 2px black' }} href={`/newRating/${userName}`}><b>add rating</b></Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Button style={{ marginTop: '50px', marginLeft: '30px', backgroundColor: 'pink', color: 'black', border: 'none', boxShadow: '2px 2px 2px black' }} classname="logoutBtn" size="sm"
                            onClick={() => handleLogout()}>logout</Button>
                    </Nav.Item>
                </div>
            </Nav>
            <div style={{border: '9px dotted pink', borderRadius: '5px', padding: '10px', fontFamily: 'limelight'}} className="d-flex justify-content-between m-4">
                <h2>@{user.userName}</h2>
                <h2>{user.firstName} {user.lastName}</h2>
                <div>
                    <Link style={{background: 'pink'}} className="btn m-1" to={`/user/edit/${user.userName}`}>edit</Link>
                    <button className="btn btn-danger m-1" onClick={() => handleDeleteUser(user._id)}>delete</button>
                </div>
            </div>
            <h2 style={{color: 'pink', textShadow: '1px 1px 1px black', marginTop: '30px'}} className="text-center">Ratings</h2>
            <div className="m-4 d-flex flex-wrap justify-content-around">
                {ratings.map((rating, index) => {
                    return (
                        <div className="card w-25 m-2" key={index}>
                            <div className="card-body">
                                <h5 className="card-title">{rating.movieName}</h5>
                                <h6>{rating.movieDetail}</h6>
                                <h6 className="card-subtitle mb-2 text-muted">Rating: {rating.rating}</h6>
                                <p className="card-text">"{rating.comment}"</p>
                                <Link style={{background: 'pink'}} className="card-link btn btn-smmr-1" to={`/edit/${user.userName}/${rating._id}`}>Edit</Link>
                                <button className="card-link btn btn-sm btn-danger mr-1" onClick={() => handleDeleteRating(rating._id)}>Delete</button>
                            </div>
                        </div>
                    )})}
            </div>
        </div>
    )
};

export default ProfilePage;