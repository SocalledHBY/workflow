export function SiderItem({name, onClick}: {name: string, onClick: (name: string) => void}) {
  function handleClick() {
    onClick(name);
  }
  
  return (
    <div onClick={handleClick} className="py-1 text-center text-gray-200 cursor-pointer transition hover:font-medium hover:scale-105">
      {name}
    </div>
  )
}