import React from 'react';

const useScroll = () => {
  const moveToSection = (
    userRef: React.RefObject<HTMLHeadingElement> | null,
  ) => {
    if (userRef && userRef.current) {
      const element = userRef.current;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return { moveToSection };
};

export default useScroll;
