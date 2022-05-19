import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const Main = (props) => {
    
    return(
        <div className="logreg">
            <div><Login /></div>
            <div><Register/></div>
        </div>
    )
}

export default Main;