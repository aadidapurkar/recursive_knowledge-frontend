import { fromFetch } from "rxjs/fetch";
import "./style.css";
import { catchError, from, fromEvent, map, Observable, of, switchMap } from "rxjs"; // Creates Observables from single values or iterables
import { postRequest } from "./observable";

// test
const o$ = from([1, 2, 3]);
o$.subscribe(console.log);

// HTML elements
const inputTopic = document.getElementById("inputTopic") as HTMLInputElement;
const btnExploreTopic = document.getElementById(
  "btnExploreTopic"
) as HTMLButtonElement;

// Observables
const topicChange$ = fromEvent(btnExploreTopic!, "click").pipe(
  map(() => inputTopic!.value),
  switchMap((topic: string) => postRequest<string[]>("http://localhost:3000/api/rankConcepts", { parent: topic }))
);
// Impure
topicChange$.subscribe(console.log);
