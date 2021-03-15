import React, { useEffect, useState } from 'react';
import { Observable, BehaviorSubject } from 'rxjs'
import { debounceTime, distinctUntilChanged, switchMap, tap, throttleTime } from 'rxjs/operators'
import styled from 'styled-components'
const Container = styled.div`
  height:100vh;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`
const fetchUser = (username) => new Observable(async (observer) => {
  try {
    const response = (await fetch(`http://localhost:5000/github/${username}`))
    if (response.status === 200) {
      observer.next(await response.json())
      observer.complete()
    }else {
      observer.error(await response.text())
      observer.complete()
    }

  } catch (error) {
    observer.error(error)
    observer.complete()
  }
})

const usernameObs = new BehaviorSubject("jetobe95")

function App() {
  const [state, setState] = useState({})
  useEffect(() => {
    usernameObs.pipe(
      debounceTime(1000),
      switchMap((username) => fetchUser(username)),
      tap(userResponse=> setState({ user: userResponse }),()=>console.log('error')),
      tap((e)=>console.log('error',e))
    )
    .subscribe()
    
  }, [])
  const {
    avatar_url,
    bio,
    login,
    message,
  } = state.user ?? {}
  return (
    <Container className="container">
      <input  onChange={(e) => usernameObs.next(e.target.value)} className="form-control mb-4" placeholder="Github Username" />
      <h6>{message}</h6>
      <div className="card" style={{ width: '18rem' }}>
        <img src={avatar_url} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">@{login}</h5>
          <p className="card-text">{bio}</p>
        </div>
      </div>

    </Container>
  );
}

export default App;
