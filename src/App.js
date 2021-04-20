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
          Contador <br/>
          {counterState}
        </p>
        <div>
          <button
            className='btn btn-primary m-1'
            onClick={() => dispatch({ type: 'INCREMENT' })}>{"+"}</button>
          <button
            className='btn btn-danger' onClick={() => dispatch({ type: 'DECREMENT' })}>{"-"}</button>
        </div>
        <h5 className="mt-4">Observable</h5>
        <div>
          <button
            className='btn btn-primary m-2'
            onClick={() => dispatch({ type: 'INCREMENT_ASYNC' })}>{"+ ASYNC (1s) "}
          </button>
          <button
            className='btn btn-danger' onClick={() => dispatch({ type: 'INCREMENT_AUTO' })}>{"+ Auto"}</button>
          <button
            className='btn btn-secondary m-1' onClick={() => dispatch({ type: 'INCREMENT_AUTO_STOP' })}>{"+ Auto STOP"}</button>
        </div>
      </header>
    </div>
  );
}

export default App;
