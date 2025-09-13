import { catchError, from, fromEvent, Observable, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";


// Generic POST request function returning an Observable
export const  postRequest = <T>(url: string, body: any): Observable<T> => {
  return fromFetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }).pipe(
    switchMap((response) => {
      if (response.ok) {
        return from(response.json() as Promise<T>);
      } else {
        // handle HTTP errors
        return from([null as unknown as T]);
      }
    }),
    catchError((err) => {
      console.error("Request failed", err);
      return from([null as unknown as T]); // return fallback value
    })
  );
}