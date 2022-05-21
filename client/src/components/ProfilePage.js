import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.css";

const ProfilePage = () => {
    const {userName} = useParams();
    const [user, setUser] = useState("");
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

    const handleDelete = (id) => {
        axios.delete(`http://localhost:8000/api/user/${id}`)
        .then((res) => {
            console.log('User deleted succesfully.', res)
            navigate('/');
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
            <div className="d-flex justify-content-between m-2">
                <h2>@{user.userName}</h2>
                <h2>{user.firstName} {user.lastName}</h2>
                <div>
                    <Link className="btn btn-warning m-1" to={`/home/${user.userName}`}>Edit</Link>
                    <button className="btn btn-danger m-1" onClick={() => handleDelete(user._id)}>Delete</button>
                </div>
            </div>
            <h1>{user._id}</h1>
        </div>
    )
};

export default ProfilePage;