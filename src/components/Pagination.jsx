import React from 'react'
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr'
import { RxTrackNext, RxTrackPrevious } from 'react-icons/rx'

export const Pagination = ({paginationData, className, onChangePage}) => {
  const { currentPage, lastPage } = paginationData;

  return (
    <div className={`${'flex items-center justify-center gap-4'} ${className || ''}`}>
      <button
        onClick={() => onChangePage(1)}
        disabled={currentPage==1}
        className="flex items-center gap-2 px-3 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-[#FF5C00]/20 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button">
        <RxTrackPrevious className='size-5'/>
      </button>
      <button
        onClick={() => onChangePage(currentPage - 1)}
        disabled={currentPage==1}
        className="flex items-center gap-2 px-3 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-[#FF5C00]/20 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button">
        <GrCaretPrevious className='size-4'/>
      </button>
      <div className="flex items-center gap-2">
        <button
          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full bg-[#FF5C00] text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button">
          <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            {currentPage}
          </span>
        </button>
      </div>
      <button
        onClick={() => onChangePage(currentPage + 1)}
        disabled={currentPage==lastPage}
        className="flex items-center gap-2 px-3 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-[#FF5C00]/20 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button">
        <GrCaretNext className='size-4'/>
      </button>

      <button
        onClick={() => onChangePage(lastPage)}
        disabled={currentPage==lastPage}
        className="flex items-center gap-2 px-3 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-[#FF5C00]/20 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button">
        <RxTrackNext className='size-5'/>
      </button>
    </div> 
  )
}
