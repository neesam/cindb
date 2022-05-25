import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const Main = (props) => {
    
    return(
        <div style={{padding: '50px', background: 'white', background: '#8c94f7', height: '100vh'}} className="logreg">
            <div><Login /></div>
            <div><Register/></div>
        </div>
    )
}

export default Main;