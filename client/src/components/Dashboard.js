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
        <div style={{background: '#8c94f7', height: '100vh'}}>
            <Nav style={{display: 'flex', position: 'relative', alignItems: 'center'}} activeKey="/home">
                <Nav.Item style={{fontSize: '40px', padding: '30px', marginRight: '30px', color: 'pink', textShadow: '2px 2px 2px black'}}><b><a style={{textDecoration: 'none', color: 'pink'}} href={`/home/${userName}`}>CinDB</a></b>
                </Nav.Item>
                <div style={{display: 'flex', marginLeft: '750px'}}>
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

        <div style={{display: 'flex', padding: '50px'}}>
            {allMovies.map((movie, index) => {
                return (
                  <div style={{padding: '50px', boxShadow: '10px 5px 5px 1px grey', borderRadius: '50px', marginRight: '30px', display: 'flex', flexDirection: 'column', gap: '10px', background: `pink`}} key={movie._id}>
                    <h2>{movie.movieName}</h2>
                    <h5>rating: {movie.rating}</h5>
                    <h6> <a href={`/user/${userName}`}>{movie.userName}</a></h6>
                    <p>"{movie.comment}"</p>


                    <div>
                      <Link to={`/edit/${movie.userName}/${movie._id}`}>
                      <button style={{marginRight: '10px'}} className="btn btn-primary">edit</button>
                      </Link>
                      <Link to={`/${userName}/details/${movie._id}`}>
                        <button className="btn btn-primary">details</button>
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