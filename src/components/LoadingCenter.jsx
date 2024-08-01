import { Loading } from "./Loading";
  
export const LoadingCenter = ({className, loadingClass=''}) => {
  const getClasses = () => {
    const baseClasses = "min-h-screen flex items-center justify-center";
    return `${baseClasses} ${className || ''}`;
  };

  return (
    <div className={getClasses()}>
      <Loading className={loadingClass}/>
    </div>
  )
}