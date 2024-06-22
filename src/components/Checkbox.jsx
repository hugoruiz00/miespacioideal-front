
export const Checkbox = ({name, register, className, validations={}, ...props}) => {
  const getClasses = () => {
    const baseClasses = "before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-[#FF5C00] checked:bg-[#FF5C00] checked:before:bg-[#FF5C00] hover:before:opacity-10 checked:hover:bg-[#FF5C00] checked:focus:bg-[#FF5C00]";
    return `${baseClasses} ${className || ''}`;
  };

  return (
    <input
      type="checkbox"  
      className={getClasses()}
      {...register(name, validations)}
      {...props}
    />
  )
}