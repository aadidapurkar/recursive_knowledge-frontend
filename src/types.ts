// Constants
export const DEFAULT_BRANCHING_FACTOR = 4

// Types
export type State = {
    graphEnter: TreeNode | null;
    flagClearGraph: boolean
}

export interface Action {
  apply(s: State): State;
}

export type TreeNode = {
    value: string,
    url: string,
    displayBranchingFactor: number,
    children?: TreeNode[]
}

export const LAYOUT_PARAMS = {
    name: "breadthfirst",
    directed: true,
    // spacingFactor < 1 makes nodes closer together; tweak between 0.5 - 1.2
    spacingFactor: 0.75,
    fit: true, // fit to viewport after layout
    padding: 20,
    avoidOverlap: true,
    nodeDimensionsIncludeLabels: true, // important: layout accounts for label size
    transform: (node: any, pos: { x: number; y: number }) => ({
      x: pos.x * 1.5, // horizontal spacing
      y: pos.y * 0.8, // vertical spacing
    }),
  }
