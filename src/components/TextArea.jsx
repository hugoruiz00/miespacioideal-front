
export const TextArea = ({children, className, ...props}) => {
  const getClasses = () => {
    const baseClasses = "border-gray-300 focus:border-[#FF5C00] focus:ring-[#FF5C00] rounded-md shadow-sm";
    return `${baseClasses} ${className || ''}`;
  };

  return (
    <textarea
      className={getClasses()}
      {...props}>
        {children}
    </textarea>
  )
}