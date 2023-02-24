import { useState, useEffect } from 'react';

const GOTOP_THRESHOLD = 250;
const useGotop = () => {
  const [showGotop, setShowGotop] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowGotop(window.top!.scrollY >= GOTOP_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll);
  }, []);
  return { showGotop };
};
export default useGotop;
