import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


import './App.css';
import Navbar from './Navbar';
function App() {
  const dispatch = useDispatch()
  const counterState = useSelector(state => state)
  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <p>
          {counterState}
        </p>
        <div>
          <button className='btn btn-primary m-2' onClick={() => dispatch({ type: 'INCREMENT' })}>{"+"}</button>
          <button className='btn btn-danger' onClick={() => dispatch({ type: 'DECREMENT' })}>{"-"}</button>
        </div>
      </header>
    </div>
  );
}

export default App;
