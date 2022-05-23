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

    const [ratings, setRatings] = useState([]);
    const [authorList, setAuthorList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api')
            .then(res => setRatings(res.data))
            .catch(err => console.log(err))
    }, []) 

    function handleDelete(index) {
        axios.delete('http://localhost:8000/api/author/' + id)
            .then(res => {
                setAuthorList(authorList.filter((item) => item._id !== index))
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    const handleLogout = () => {
        axios.post("http://localhost:8000/api/user/logout", {}, {withCredentials:true})
            .then((res) => console.log(res), navigate("/"))
            .catch((err) => console.log(err, "Error"));
    };

    return (
        <div>
            <Nav className="justify-content-end" activeKey="/home">
                <Nav.Item>
                    <Nav.Link style={{fontSize: '40px', padding: '30px', marginRight: '30px'}} href="/authors/new"><b>CinDB</b></Nav.Link>
                </Nav.Item>
                <Nav.Item class="profile">
                    <Nav.Link style={{fontSize: '20px', padding: '50px'}} href={`/user/${userName}`}><b>View Profile</b></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Button style={{marginTop:'50px'}} classname="logoutBtn" size="sm" variant="danger" onClick={()=> handleLogout()}>Logout</Button>
                </Nav.Item>
            </Nav>

    {/* <div>
        {ratings ? ratings.map((item, index) => {
            <h2 src={item.title}></h2>
            {item.star === '5' ? <img>{}</img> : null}
        <i class="fa-solid fa-star"></i>
    }) : null}
    </div>  This need to be fixed*/}

    <i class="fa-solid fa-star"></i>


    </div>
    )
}
export default Dashboard;