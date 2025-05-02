import type { BuiltInNode } from "@xyflow/react";

export const initialNodes: BuiltInNode[] = [
  {
    id: "a",
    type: "input",
    position: { x: 0, y: -100 },
    data: { label: "1. Add modules on the left" }
  },
  {
    id: "b",
    position: { x: 0, y: 0 },
    data: { label: "2. Connect modules in order" }
  },
  {
    id: "c",
    type: "output",
    position: { x: 0, y: 100 },
    data: { label: "3. Run your own workflow" }
  }
];
