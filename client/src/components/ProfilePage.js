import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const ProfilePage = () => {
    const {userName} = useParams();
    const [user, setUser] = useState("");
    
    useEffect(() => {
        axios.get(`http://localhost:8000/api/user/${userName}`, {withCredentials : true})
        .then(res => {
            setUser(res.data);
        })
        .catch(err => {
            console.log(err)
        })
    }, []);

    return(
        <div>
            <h1>{user.userName}</h1>
            <h2>{user.firstName} {user.lastName}</h2>
        </div>
    )
};

export default ProfilePage;