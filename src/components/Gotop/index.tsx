import styled from 'styled-components';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useEffect, useState } from 'react';

const Icon = styled(KeyboardArrowUpIcon)`
  color: #fff;
`;

interface IGotopProps {
  visible: boolean;
}
const StyledGotop = styled.div<IGotopProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  color: #fff;
  background-color: #f0a4c6;
  border-radius: 50%;
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  cursor: pointer;
  ${Icon} {
    font-size: 40px;
  }
`;

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

const GOTOP_THRESHOLD = 250;
const Gotop = () => {
  const [showGotop, setShowGotop] = useState<boolean>(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowGotop(window.top!.scrollY >= GOTOP_THRESHOLD);
    };
    window.addEventListener('scroll', handleScroll);
  }, []);
  return (
    <StyledGotop onClick={scrollTop} visible={showGotop}>
      <Icon />
    </StyledGotop>
  );
};

export default Gotop;
