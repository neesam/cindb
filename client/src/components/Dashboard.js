import axios from 'axios';
import React, {useEffect, useState} from 'react';
import Table from 'react-bootstrap/Table';
import Nav from 'react-bootstrap/Nav';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';


const Dashboard = (props) => {

    const {id, userName} = useParams();

    const navigate = useNavigate()

    const [allMovies, setAllMovies] = useState([]);
    useEffect(() => {
        axios
        .get("http://localhost:8000/api/movie")
        .then((response) => {
            console.log(response.data);
            setAllMovies(response.data);
        })
        .catch((err) => {
            console.log(err.response);
        });
    }, []);

    const handleLogout = () => {
        axios.post("http://localhost:8000/api/user/logout", {}, {withCredentials:true})
            .then((res) => console.log(res), navigate("/"))
            .catch((err) => console.log(err, "Error"));
    };

    return (
        <div>
            <Nav style={{display: 'flex', justifyContent: 'center', position: 'relative', left: '300px'}} activeKey="/home">
                <Nav.Item style={{fontSize: '40px', padding: '30px', marginRight: '30px'}}><b>CinDB</b>
                </Nav.Item>
                <div style={{display: 'flex',marginLeft: '200px'}}>
                <Nav.Item class="profile">
                    <Nav.Link style={{fontSize: '20px', padding: '50px'}} href={`/user/${userName}`}><b>View Profile</b></Nav.Link>
                </Nav.Item>
                <Nav.Item class="profile">
                    <Nav.Link style={{fontSize: '20px', padding: '50px'}} href={`/newRating/${userName}`}><b>Add Rating</b></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Button style={{marginTop:'50px'}} classname="logoutBtn" size="sm" variant="danger" onClick={()=> handleLogout()}>Logout</Button>
                </Nav.Item>
                </div>
            </Nav>

        <div style={{display: 'flex', padding: '20px'}}>
            {allMovies.map((movie, index) => {
                return (
                  <div style={{padding: '50px'}} key={movie._id}>
                    <h2>{movie.movieName}</h2>
                    <h5>Rating: {movie.rating}</h5>
                    <h6> <a href={`/user/${userName}`}>{movie.userName}</a></h6>
                    <p>"{movie.comment}"</p>


                    <div>
                      <Link to={`/edit/${movie._id}`}>
                      <button style={{marginRight: '10px'}} className="btn btn-primary">Edit</button>
                      </Link>
                      <Link to={`/details/${movie._id}`}>
                        <button className="btn btn-primary">Details</button>
                      </Link>

                      
                    </div>
                  </div>
                );
              })}
        </div>

    </div>
    )
}
export default Dashboard;