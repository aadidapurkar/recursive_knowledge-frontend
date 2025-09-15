import { catchError, from, fromEvent, fromEventPattern, map, Observable, switchMap } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { DEFAULT_BRANCHING_FACTOR, type TreeNode } from "./types";


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


/**
 * Input: Topic
 * Mapping: Topic -> Topic + Sorted Subtopics -> Graph/Tree of depth 1
 */
const inputTopic = document.getElementById("inputTopic") as HTMLInputElement;
const btnExploreTopic = document.getElementById(
  "btnExploreTopic"
) as HTMLButtonElement;

export const createGraphRoot$ = fromEvent(btnExploreTopic!, "click").pipe(
  map(() => inputTopic!.value),
  switchMap(
    (topic: string) =>
      postRequest<string[]>("http://localhost:3000/api/rankConcepts", {
        parent: topic,
      }) //.pipe(map((res) => [topic, res]))
  ),
  map((a) => {
    const childrenTreeNodes = a.slice(1).map(([topicName, topicLink], i) => {
      return {
        value: topicName,
        url: topicLink,
        displayBranchingFactor: DEFAULT_BRANCHING_FACTOR
      } as TreeNode
    })
    return {
      value: a[0][0],
      url: a[0][1],
      displayBranchingFactor: DEFAULT_BRANCHING_FACTOR,
      children: childrenTreeNodes
    } as TreeNode
  }
  )
);

/**
 * 
 * @param cy cy graph object
 * @returns cytoscape event
 */
export const updateGraph$: (cy : cytoscape.Core) => Observable<cytoscape.EventObject> = (cy : cytoscape.Core) => fromEventPattern(
  // Add handler
  (handler: (evt: cytoscape.EventObject) => void) => {
    cy.on("tap", "node", (evt) => {
      handler(evt); // make sure handler gets the Cytoscape event
    });
  },
  // Remove handler
  (handler: (evt: cytoscape.EventObject) => void) => {
    cy.off("tap", "node");
  }
);
