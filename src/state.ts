import { DEFAULT_BRANCHING_FACTOR, type Action, type State, type TreeNode } from "./types";


export class AdjustGraph implements Action {
  constructor(public readonly subtree : TreeNode, public readonly clearGraph : boolean) {}

  apply(s:State):State {
    return {
        flagClearGraph: this.clearGraph,
        graphEnter: this.subtree
    }
  }
}
