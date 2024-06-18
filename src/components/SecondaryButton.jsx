
export const SecondaryButton = ({children, className, ...props}) => {
  const getClasses = () => {
    const baseClasses = "inline-flex items-center justify-center px-4 py-2 bg-white border border-[#FF5C00] rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none disabled:opacity-25 transition ease-in-out duration-150";
    return `${baseClasses} ${className || ''}`;
  };

  return (
    <button
      className={getClasses()}
      {...props}
    >
      { children }
    </button>
  )
}
