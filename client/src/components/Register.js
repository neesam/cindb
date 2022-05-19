import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import axios from 'axios';

const Register = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async(e) => {
        e.preventDefault();
        const userData = {
            firstName, lastName, userName, email, password, confirmPassword,
        };
        try {
            await axios.post("http://localhost:8000/api/user/register", userData);
            navigate("/home");
        } catch (error) {
            setError(error.response.data.error);
            navigate("/")
        }
    };
    return(
        <Form onSubmit={handleSubmit}>
            <h1>Register</h1>
            {error && <p style = {{color: "red"}}>{error}</p>}
            <div>
                <Form.Label>First Name:</Form.Label>
                <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)}/>
            </div>
            <div>
                <Form.Label>Last Name:</Form.Label>
                <Form.Control type="text" onChange={(e) => setLastName(e.target.value)}/>
            </div>
            <div>
                <Form.Label> Username:</Form.Label>
                <Form.Control type="text" onChange={(e) => setUserName(e.target.value)}/>
            </div>
            <div>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="text" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
            </div>
            <Button className="submit-button" variant="primary" size="sm" type="submit">
                    Submit
            </Button>
        </Form>
    )
}

export default Register;
