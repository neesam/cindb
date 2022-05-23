import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
        <div className="container-fluid bg-light">
            <div className="navbar navbar-light bg-dark text-light p-1">
                <h1 className="m-1 text-primary">CinDB</h1>
                <Link className="btn btn-primary m-1" to={`/home/${user.userName}`}>Home</Link>
            </div>
            <div className="d-flex justify-content-between m-2 border border-dark rounded">
                <h2>@{user.userName}</h2>
                <h2>{user.firstName} {user.lastName}</h2>
                <div>
                    <Link className="btn btn-warning m-1" to={`/user/edit/${user.userName}`}>Edit</Link>
                    <button className="btn btn-danger m-1" onClick={() => handleDeleteUser(user._id)}>Delete</button>
                </div>
            </div>
            <h2 className="text-center text-primary">Ratings</h2>
            <div className="m-4 d-flex flex-wrap justify-content-around">
                {ratings.map((rating, index) => {
                    return (
                        <div className="card w-25 m-2" key={index}>
                            <div className="card-body">
                                <h5 className="card-title">{rating.movieName}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Rating: {rating.rating}</h6>
                                <p className="card-text">{rating.comment}</p>
                                <Link className="card-link btn btn-sm btn-warning mr-1" to={`/edit/${user.userName}/${rating._id}`}>Edit</Link>
                                <button className="card-link btn btn-sm btn-danger mr-1" onClick={() => handleDeleteRating(rating._id)}>Delete</button>
                            </div>
                        </div>
                    )})}
            </div>
        </div>
    )
};

export default ProfilePage;