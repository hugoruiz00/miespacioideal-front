
export const TextInput = ({name, register, className, validations = {}, ...props}) => {
  const getClasses = () => {
    const baseClasses = "border-gray-300 focus:border-[#FF5C00] focus:ring-[#FF5C00] rounded-md shadow-sm";
    return `${baseClasses} ${className || ''}`;
  };

  return (
    <input
      name={name}
      className={getClasses()}
      {...register(name, validations)}
      {...props}
    />
  )
}
