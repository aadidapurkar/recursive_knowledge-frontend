import { fromFetch } from "rxjs/fetch";
import "./style.css";
import {
  catchError,
  from,
  fromEvent,
  fromEventPattern,
  map,
  merge,
  mergeMap,
  Observable,
  of,
  scan,
  switchMap,
} from "rxjs";
import { decrementTopic$, incrementTopic$, newTopic$, exploreSubtopic$ } from "./observable";
import { initialState } from "./state";
import type { Action, State, Topic } from "./types";
import { render } from "./render";


// (CONTROLLER)Merged stream of controller observables, mapped to Actions
const action$ = merge(newTopic$, exploreSubtopic$, decrementTopic$, incrementTopic$)

// (MODEL) Reduced stream of State 
const state$ = action$.pipe(
  scan((accState : State , action: Action) => action.apply(accState), initialState)
)

// (VIEW Update view every time state changes
state$.subscribe((s) => render(s))

//state$.subscribe(console.log)


