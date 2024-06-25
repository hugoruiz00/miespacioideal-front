
export const BackendErrorMessage = ({errorMessage, handleClose, className}) => {
  const getClasses = () => {
    const baseClasses = "fixed right-4 bottom-14 z-[100] py-4 px-6 bg-red-500 text-white rounded-md";
    return `${baseClasses} ${className || ''}`;
  };

  return (
    <div className={getClasses()}>
      <span>{errorMessage}</span>
      <button
        onClick={handleClose}
        className="ml-4 text-white bg-transparent border-none cursor-pointer"
      >
        &times;
      </button>
    </div>
  )
}
