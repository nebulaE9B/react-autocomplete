import './App.css';
import React, {useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

function App() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get('https://reqres.in/api/users');
      console.log(response.data.data);
      setUsers(response.data.data);
    }
    loadUsers();
  }, []);

  const onChangeHandler = (text) => {
    let matches = [];
    if(text.length > 0) {
      matches = users.filter(user => {
        const regex = new RegExp(`${text}`, "gi");
        return user.email.match(regex);
      })
    }
    setSuggestions(matches);
    console.log('suggestions ',suggestions);
    setText(text);
  }

  const onClickHandler = (str) => {
    console.log('str ', str);
    setText(str);
    setSuggestions([]);
  }



  return (
    <div className="container">
      <input type="text" className="col-md-12"
        style={{marginTop: '10px'}}
        placeholder="Search Users"
        onChange={e=> onChangeHandler(e.target.value)}
        value = {text}
        // onBlur={() => {
        //   setTimeout( () => {
        //     setSuggestions([]);
        //   }, 100)
        // }}
      />
      {/* { suggestions && suggestions.map((suggestion, i) => 
        <div key={i} className="suggestion col-md-12" onClick={() => onClickHandler(suggestion.email)}>{suggestion.email}</div>
      )} */}
      <div className="row">
        {users.filter((val) => {
          if(text === "") {
            return val;
          } else if(val.first_name.toLowerCase().includes(text.toLowerCase())){
            return val;
          }
        }).map((user, i) => 
          <Card key={i} users={user}/>
        )}
      </div>
    </div>
  );
}

export default App;
