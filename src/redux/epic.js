import { combineEpics, ofType } from 'redux-observable';
import { interval, Observable, of } from 'rxjs';
import { filter, mapTo, delay, switchMap, takeUntil, tap, merge, skip, takeWhile, take, map, throttleTime, debounceTime } from 'rxjs/operators'

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
);

/**
 * 
 * @param {Observable} action$ 
 * @returns 
 */
export const keepPressCountingEpic = action$ => action$.pipe(
    ofType('INCREMENT_KEY_DOWN'),
    switchMap(() => interval(100)
        .pipe(
            takeUntil(
                action$.pipe(
                    ofType('INCREMENT_KEY_UP')
                ),
            ),

        )
    ),
    mapTo({ type: 'INCREMENT' }),
);


/**
 * 
 * @param {Observable} action$ 
 * @returns 
 */
export const funcionesOcultasEpic = action$ => action$.pipe(
    ofType('FN_OCULTA_1'),
    switchMap(() => interval(1000)
        .pipe(
            takeUntil(
                action$.pipe(
                    ofType('FN_OCULTA_1_M_UP')
                )
            ),
            skip(1),
            take(1),
            switchMap(() => of('RESET', 'INCREMENT_AUTO_STOP').pipe(
                map((e) => ({ type: e }))
            ))
        )
    ),
);



export const rootEpic = combineEpics(pingEpic, counterEpic, keepPressCountingEpic, funcionesOcultasEpic)