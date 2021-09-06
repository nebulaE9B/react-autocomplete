import React from 'react';
import './Card.css';

const Card = props => {
    const {email, first_name, last_name, avatar} = props.users;
    return (
        <div className="card">
            <img src={avatar} alt="Avatar" style={{width:'100%'}}/>
            <div className="container">
                <h4><b>{`${first_name} ${last_name}`}</b></h4> 
                <p>{email}</p>
            </div>
        </div>
    );
}

export default Card;