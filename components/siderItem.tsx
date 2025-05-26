export default function SiderItem({ mid, name, onClick }: { mid: number, name: string, onClick: (mid: number, name: string) => void }) {
  function handleClick() {
    onClick(mid, name);
  }
  
  return (
    <div onClick={handleClick} className="py-1 text-center text-gray-100 cursor-pointer transition duration-100 hover:bg-gray-700">
      {name}
    </div>
  )
}