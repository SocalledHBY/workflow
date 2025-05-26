import { Handle, Position, type NodeProps } from "@xyflow/react";
import { type ModuleNode } from "./index";

export default function ModuleNode({ data }: NodeProps<ModuleNode>) {
  return (
    <div className="flex flex-col border border-gray-200 rounded-md shadow-xs bg-white">
      <Handle type="target" position={Position.Top} />
      <div className="px-2.5 py-1.5 border-b border-gray-200 text-lg font-semibold">{data.label}</div>
      <div className="px-2.5 py-1.5 text-md">
        <label htmlFor="text">输入：</label>
        <input className="nodrag" name="text" placeholder="请输入" onChange={(e) => { data.input = e.target.value }} />
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}