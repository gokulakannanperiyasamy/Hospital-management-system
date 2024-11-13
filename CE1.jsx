/*import React from 'react';
import './App.css';

 const CE1 = () => {
  const display=()=>{
    alert("Message from JavaScript Alert!")
    console.log("Message to developer")
  }
  return (
    <div>
      <h1></h1>
      <h1>Let we see the output of Javascript</h1>
      <button onClick={display}>Check</button>
    </div>
  )
 }
export default CE1;
*/
import React from 'react';
import './App.css';

const CE1 = () => {
  const display = () => {
    alert("Message from JavaScript Alert!")
    console.log("Message to developer")
  }

  return (
    <div>
      <h1>Let's see the output of JavaScript</h1>
      <button onClick={display}>Check</button>
    </div>
  )
}

export default CE1;
