import type { Edge } from "@xyflow/react";

export const initialEdges = [
  { id: "a->b", source: "a", target: "b" },
  { id: "b->c", source: "b", target: "c" }
] satisfies Edge[];
