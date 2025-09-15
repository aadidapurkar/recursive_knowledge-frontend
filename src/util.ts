import type { TreeNode } from "./types";
import cytoscape, { type ElementDefinition } from "cytoscape";

export const parseRootTreeNodeAsCy = (root: TreeNode) : ElementDefinition[] => {
  // Nodes
  const rootNodeCy = {
    data: {
      id: root.value,
      branchingFactor: root.displayBranchingFactor,
      url: root.url,
    },
  };
  const rootChildrenCy = root.children!.slice(1).map((child) => ({
    data: {
      id: child.value,
      branchingFactor: child.displayBranchingFactor,
      url: child.url,
    },
  }));

  // Edges
  const edgesCy = rootChildrenCy.map((child) => ({
    data: { id: root.value + child.data.id,
            source: root.value,
            target: child.data.id
    },
  }));
  return [rootNodeCy, ...rootChildrenCy, ...edgesCy]
};
