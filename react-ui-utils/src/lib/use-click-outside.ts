import React, { useCallback, useEffect } from 'react';

interface Params {
  refs: React.MutableRefObject<HTMLElement>[];
  onClickOutside: () => void;
}

export const useClickOutside = ({ refs, onClickOutside }: Params) => {
  const documentClickHandler = useCallback(
    (event: MouseEvent) => {
      event.preventDefault();
      const isClickedOutsideElements = refs.every((ref) => {
        if (ref?.current) {
          if (!ref.current.contains(event.target as Node)) {
            return true;
          }
        }

        return false;
      });
      if (isClickedOutsideElements) {
        onClickOutside();
      }
    },
    [onClickOutside, refs]
  );

  useEffect(() => {
    document.addEventListener('mousedown', documentClickHandler);

    return () => {
      document.removeEventListener('mousedown', documentClickHandler);
    };
  }, [documentClickHandler]);
};
