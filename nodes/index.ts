import type { BuiltInNode } from "@xyflow/react";

export const initialNodes: BuiltInNode[] = [
  {
    id: "a",
    type: "input",
    position: { x: 0, y: -100 },
    data: { label: "1. 点击左侧按钮添加模块" }
  },
  {
    id: "b",
    position: { x: 0, y: 0 },
    data: { label: "2. 连接模块" }
  },
  {
    id: "c",
    type: "output",
    position: { x: 0, y: 100 },
    data: { label: "3. 运行工作流" }
  }
];
