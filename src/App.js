import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


import './App.css';
import Navbar from './Navbar';
function App() {
  const dispatch = useDispatch()
  const counterState = useSelector(state => state)
  return (
    <div className="App" >
      <Navbar />
      <header className="App-header">
        <p>
          Contador <br />
          {counterState.toString().padStart(2,'0')}
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

          <button
            className='btn btn-danger m-1'
            onMouseUp={() => dispatch({ type: 'INCREMENT_KEY_UP' })}
            onMouseDown={() => dispatch({ type: 'INCREMENT_KEY_DOWN' })}
          >
            {"+ Mantener Presionado"}
          </button>
        </div>

        <h5 className="mt-4">Funciones escondidas</h5>
        <div>
          <button
            className='btn btn-secondary m-1'
            onMouseDown={() => dispatch({ type: 'FN_OCULTA_1' })}
            onMouseUp={() => dispatch({ type: 'FN_OCULTA_1_M_UP' })}
          >
            {"Presiona por 2 segundos, para reiniciar"}
          </button>
        </div>


      </header>
    </div>
  );
}

export default App;
