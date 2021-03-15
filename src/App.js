import React, { useEffect, useState } from 'react';
import { Subject, interval, merge, empty, NEVER } from 'rxjs'
import { debounceTime, map, mapTo, scan, startWith, switchMap, tap } from 'rxjs/operators'

const subjectPlay = new Subject().pipe(mapTo({ count: true }))
const subjectPause = new Subject().pipe(mapTo({ count: false }))
const subjectSpeed = new Subject().pipe(
  map((speed) => ({ speed: +speed })),
)

const subjectIncrease = new Subject().pipe(
  map((increase) => ({ increase: +increase })),
)

const clock = interval(1000).pipe(mapTo(-1))




function App() {
  const [state, setState] = useState({})



  useEffect(() => {

    const counter = merge(subjectPlay, subjectPause, subjectSpeed,subjectIncrease)
      .pipe(
        startWith({
          value: 0,
          increase: 1,
          speed: 1000,
          count: false,
          countup: true
        }),
        tap(_ => setState((oldState) => ({ ...oldState, ...state }))),
        scan((state, curr) => ({ ...state, ...curr }), {}),
        switchMap(state => state.count ? interval(state.speed).pipe(
          tap(_ => state.value += state.countup ? state.increase : -state.increase),
          tap(_ => setState((oldState) => ({ ...oldState, ...state })))
        ) : NEVER),
      )

    counter.subscribe(console.log)


  }, [])
  return (
    <div>
      <h1>RxJS</h1>
      <h1>{state?.value}</h1>
      <input type="number" onChange={({ target: { value } }) => subjectSpeed.next(value)} />
      <input type="number" onChange={({ target: { value } }) => subjectIncrease.next(value)} />
      <button onClick={() => subjectPlay.next()}>{!state?.count ?  "EMPEZAR":"CONTINUAR"}</button>
      <button onClick={() => subjectPause.next()}>PAUSAR</button>
      <br/>
      <code>{JSON.stringify(state,null,4)}</code>
    </div>
  );
}

export default App;
