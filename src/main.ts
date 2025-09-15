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
  scan,
  switchMap,
} from "rxjs"; // Creates Observables from single values or iterables
import {
  postRequest,
  getSubtree$,
  inputRootTopic$,
  inputNonRootTopic$,
} from "./observable";
import {
  DEFAULT_BRANCHING_FACTOR,
  LAYOUT_PARAMS,
  type Action,
  type State,
  type TreeNode,
} from "./types";
import cytoscape from "cytoscape";
import { parseRootTreeNodeAsCy } from "./util";
import { AdjustGraph } from "./state";

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
        "line-color": "#fff",
        "target-arrow-color": "#fff",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
        "line-opacity": 1,
      },
    },
  ],

  // initial pan/zoom constraints so user can zoom out/in
  minZoom: 0.25,
  maxZoom: 3,
  //wheelSensitivity: 0.3, // reduce how fast wheel zooms (optional)
});

// Impure Rendering
var root: any = null;

const createGraph$ = getSubtree$(inputRootTopic$).pipe(
  map((subtree) => new AdjustGraph(subtree, true))
);
const updateGraph$ = getSubtree$(inputNonRootTopic$(cy)).pipe(
  map((subtree) => new AdjustGraph(subtree, false))
);

inputNonRootTopic$(cy).subscribe(console.log)

const actions$ = merge(createGraph$, updateGraph$);

const state$ = actions$.pipe(
  scan((currState: State, action: Action) => action.apply(currState), {
    graphEnter: null,
    flagClearGraph: false,
  })
);

state$.subscribe((s: State) => {
  if (s.flagClearGraph) {
    cy.elements().remove();
  }

  if (s.graphEnter) {
    cy.add(parseRootTreeNodeAsCy(s.graphEnter));
    const layout = cy.layout(LAYOUT_PARAMS);
    layout.run();

    cy.animate({
      fit: { eles: cy.getElementById(s.graphEnter.value), padding: 250 },
      duration: 3000,
    });
  }
});
