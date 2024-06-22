
export const ErrorMessage = ({message, className}) => {
  const getClasses = () => {
    const baseClasses = "text-sm text-red-600 space-y-1";
    return `${baseClasses} ${className || ''}`;
  };

  return (
    <ul className={getClasses()}>
      <li>{ message }</li>
    </ul>
  )
}
