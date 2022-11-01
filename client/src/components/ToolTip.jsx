

export default function Tooltip({ message, children }) {
  return (
    <div className="flex flex-col items-center group ">
      {children}
      <div className="absolute bottom-2 right-20 md:bottom-6 md:right-24 hidden flex flex-col items-center mb-6 group-hover:flex">
        <span className="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-600 shadow-lg rounded-md">{message}</span>
      </div>
    </div>
  );
};