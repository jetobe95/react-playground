import { combineEpics, ofType } from 'redux-observable';
import { interval, Observable, of } from 'rxjs';
import { filter, mapTo, delay, switchMap, takeUntil, tap } from 'rxjs/operators'

/**
 * 
 * @param {Observable} action$ 
 * @returns 
 */
export const pingEpic = action$ => action$.pipe(
    filter(action => action.type === 'INCREMENT_ASYNC'),
    delay(1000),
    mapTo({ type: 'INCREMENT' }),
);

/**
 * 
 * @param {Observable} action$ 
 * @returns 
 */
export const counterEpic = action$ => action$.pipe(
    ofType('INCREMENT_AUTO'),
    switchMap(() => interval(1000)
        .pipe(
            takeUntil(action$.pipe(ofType('INCREMENT_AUTO_STOP')))
        )
    ),
    mapTo({ type: 'INCREMENT' }),
    tap(console.log)
);

export const rootEpic = combineEpics(pingEpic, counterEpic)