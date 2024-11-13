
import React from 'react';
import "./style.css";
import "./LoginForm.css";

const Signup = () => {
  const signdis=()=>{
    alert("Successfully Signup");
  }
  return (
    <div className="wrapper">
      <header>
        <h1>Signup</h1>
      </header>
      <main>
       
        <form>
          <label>
            <div className='input-box'>
            <input placeholder='UserName' type="text" name="username" required/></div>
          </label>
          <label>
            <div className='input-box'>
            <input placeholder='Enter your Email' type="email" name="username" required/></div>
          </label>
          <label>
          <div className='input-box'>
            <input placeholder="Password" type="password" name="password" /></div>
            <div className='input-box'>
            <input placeholder="Conform Password" type="password" name="password" />
            </div>
          </label>
          <button type="submit" onClick={signdis}>Signup</button>
        </form>
      </main>
    </div>
  );
};

export default Signup;