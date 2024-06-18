import { useEffect, useRef } from 'react';

export const useClickOutside = (setVisible) => {
    const ref = useRef(null);

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
      }
    };

    useEffect(() => {
      document.addEventListener('click', handleClickOutside, true);
      return () => {
        document.removeEventListener('click', handleClickOutside, true);
      };
    }, []);

    return [ref];
}