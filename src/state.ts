import { DEFAULT_BRANCHING_FACTOR, type Action, type State, type TreeNode } from "./types";


class AdjustGraph implements Action {
  constructor(public readonly info : string[], public readonly clearGRAPH : boolean) {}

  apply(s:State):State {

        const childrenTreeNodes = this.info.slice(1).map(([topicName, topicLink], i) => {
          return {
            value: topicName,
            url: topicLink,
            displayBranchingFactor: DEFAULT_BRANCHING_FACTOR
          } as TreeNode
        })

    return {
        flagClearGraph: this.clearGRAPH,
        graphEnter: {
            value: this.info[0][0],
            url: this.info[0][1],
            children: childrenTreeNodes
        } as TreeNode
    }
  }
}
