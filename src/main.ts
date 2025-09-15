import { fromFetch } from "rxjs/fetch";
import "./style.css";
import {
  catchError,
  from,
  fromEvent,
  fromEventPattern,
  map,
  merge,
  Observable,
  of,
  switchMap,
} from "rxjs"; // Creates Observables from single values or iterables
import { updateGraph$, postRequest, createGraphRoot$ } from "./observable";
import { DEFAULT_BRANCHING_FACTOR, LAYOUT_PARAMS, type TreeNode } from "./types";
import cytoscape from "cytoscape";
import { parseRootTreeNodeAsCy } from "./util";

// HTML elements
const inputTopic = document.getElementById("inputTopic") as HTMLInputElement;
const btnExploreTopic = document.getElementById(
  "btnExploreTopic"
) as HTMLButtonElement;
const container = document.getElementById("graph");
const cy = cytoscape({
  container,

  // Start with empty elements; will be populated on first topic change
  elements: [],

  style: [
    {
      selector: "node",
      style: {
        "background-opacity": 0, // hide fill
        "border-width": 0, // hide border
        label: "data(id)",
        color: "#fff",
        "text-valign": "center",
        "text-halign": "center",
        "font-size": 14,
        "font-weight": "bold",
        "text-wrap": "wrap",
        "text-max-width": "140px",
        padding: "1rem", // no extra space
      },
    },
    {
      selector: "edge",
      style: {
        width: 1,
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
        "line-opacity": 0.2,
      },
    },
  ],

  // initial pan/zoom constraints so user can zoom out/in
  minZoom: 0.25,
  maxZoom: 3,
  //wheelSensitivity: 0.3, // reduce how fast wheel zooms (optional)
});

// Impure Rendering
var root : any = null

//const actions$ = merge()
createGraphRoot$.subscribe((a) => {
  root = [a.value, a.url]
  cy.elements().remove();
  cy.add(parseRootTreeNodeAsCy(a));
  // run a breadthfirst layout but with tighter spacing and label-aware sizing
  const layout = cy.layout(LAYOUT_PARAMS);
  layout.run();
  cy.animate({
    fit: { eles: cy.getElementById(a.value), padding: 250 },
    duration: 3000,
  });
});

updateGraph$(cy).subscribe((evt) => {
  const node = evt.target; 
  if (!node) {
    console.warn("Cytoscape event has no target", evt);
    return;
  }
  console.log("Node clicked:", node.id());
});