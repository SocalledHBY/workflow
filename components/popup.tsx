import { useState, useEffect } from "react";

export default function Popup({ result, visible, onClose }: { result: string, visible: boolean, onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  function onTransitionStart(e: React.TransitionEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    if (isVisible) {
      target.style.visibility = 'visible';
    }
  }

  function onTransitionEnd(e: React.TransitionEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    if (!isVisible) {
      target.style.visibility = 'hidden';
    }
  }

  return (
    <div className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-8 z-50 bg-white rounded-lg shadow-2xl transition duration-150 invisible ${isVisible ? "opacity-100" : "opacity-0"}`}
      onTransitionStart={onTransitionStart}
      onTransitionEnd={onTransitionEnd}>
      <div className="text-lg font-semibold mb-4">运行结果</div>
      <div className="mb-6">{result}</div>
      <button className="float-right px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700" onClick={onClose}>关闭</button>
    </div>
  );
}