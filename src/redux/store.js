import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducer';
// Redux observable
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epic'

const epicMiddleware = createEpicMiddleware();


const store = createStore(
    reducer,
    applyMiddleware(epicMiddleware)
)
epicMiddleware.run(rootEpic)

export default store