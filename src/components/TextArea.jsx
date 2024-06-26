
export const TextArea = ({children, name, register, className, validations = {}, ...props}) => {
  const getClasses = () => {
    const baseClasses = "border-gray-300 focus:border-[#FF5C00] focus:ring-[#FF5C00] rounded-md shadow-sm";
    return `${baseClasses} ${className || ''}`;
  };

  return (
    <textarea
      name={name}
      {...register(name, validations)}
      className={getClasses()}
      {...props}>
        {children}
    </textarea>
  )
}