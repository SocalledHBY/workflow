import type { Node } from "@xyflow/react";
import ModuleNode from "./moduleNode";

export type ModuleNode = Node<
  {
    mid: number;
    label: string;
    input?: any;
  },
  "module"
>;
export const nodeTypes = { module: ModuleNode };

export const initialNodes: ModuleNode[] = [
  {
    id: "a",
    type: "module",
    position: { x: 150, y: 150 },
    data: {
      mid: -1,
      label: "1. 点击左侧按钮添加模块"
    }
  },
  {
    id: "b",
    type: "module",
    position: { x: 150, y: 300 },
    data: {
      mid: -2,
      label: "2. 连接模块"
    }
  },
  {
    id: "c",
    type: "module",
    position: { x: 150, y: 450 },
    data: {
      mid: -3,
      label: "3. 运行工作流"
    }
  }
];
