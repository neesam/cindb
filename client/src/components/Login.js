import axios from 'axios';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { InputGroup } from 'react-bootstrap';

const Login = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const loginData = { userName, password };
        try{
            await axios.post("http://localhost:8000/api/user/login", loginData, {withCredentials: true});
            console.log("Login Successful!");
            navigate(`/home/${userName}`);
        } catch(error) {
            setError(error.response.data.error);
            navigate("/");
        }
    }

    return(
        <Form onSubmit={handleSubmit}>
            <h1>Login</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            {successMessage.length > 0 && (<p style={{color: "green"}}>{successMessage}</p>)}
            <div>
                <InputGroup>
                    <InputGroup.Text>@</InputGroup.Text>
                    <Form.Control id="inlineFormInputGroupUsername" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
                </InputGroup>
            </div>
            <div className="mt-3">
                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>
            </div>
            <div>
                <Button className="submit-button" type="submit" size="sm">Submit</Button>
            </div>
        </Form>
    )
}

export default Login;