"use client";
import { useState, useEffect } from "react";

interface SiderProps {
  addModuleBlock: (moduleName: string) => void;
}

type Module = {
  name: string;
}

function SiderItem({name, onClick}: {name: string, onClick: (name: string) => void}) {
  function handleClick() {
    onClick(name);
  }
  return (
    <div onClick={handleClick} className="text-center text-gray-200">
      {name}
    </div>
  )
}

export function SiderItems({addModuleBlock}: SiderProps) {
  const [modules, setModules] = useState<Module[]>([]);
  useEffect(() => {
    fetch(`${process.env.API_URL}/modules`)
      .then(res => res.json())
      .then(data => setModules(data))
      .catch(err => {
        console.error("Error fetching modules:", err);
        return [];
      });
  }, []);
  const moduleNames = modules.map((module: { name: string }) => module.name);

  return (
    <div>
      { moduleNames.map((module: string, index: number) => <SiderItem key={index} name={module} onClick={addModuleBlock} />) }
    </div>
  )
}