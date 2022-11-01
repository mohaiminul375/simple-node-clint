import { useEffect, useState } from 'react';
import './App.css';

function App() {
const [users,setUser] = useState([]);
useEffect(()=>{
  fetch('http://localhost:5000/users')
  .then(res => res.json())
  .then(data =>setUser(data))
},[])

const handleSubmit=(event)=>{
  event.preventDefault();
  const name = event.target.name.value;
  const email = event.target.email.value;
  const user = {name,email};
  console.log(name,user);
  
  fetch('http://localhost:5000/users',{
    method: 'POST',
    headers:{
      'content-type': 'application/json'
    },
    body:JSON.stringify(user)
  })
  .then(res => res.json())
  .then(data =>{console.log(data)
  const newUser =[...users,data]
  setUser(newUser);
  })
  .catch(error => console.error())
 
  event.target.reset();
}

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" placeholder='Name' required/>
        <br/>
        <input type="email" name="email" id="" placeholder='email' required/>
        <br/>
        <button type="submit">Add User</button>
      </form>
    <h2>User: {users.length}</h2>
    <div>
      {
        users.map(user => <p
        key={user.id}>{user.name} {user.email}</p>)
      }
    </div>
    </div>
  );
}

export default App;
