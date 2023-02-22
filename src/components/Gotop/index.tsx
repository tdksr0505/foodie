import styled from 'styled-components';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Icon = styled(KeyboardArrowUpIcon)`
  color: #fff;
`;

const StyledGotop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 50px;
  height: 50px;
  color: #fff;
  background-color: #196ea8;
  border-radius: 50%;
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
const Gotop = () => {
  return (
    <StyledGotop onClick={scrollTop}>
      <Icon />
    </StyledGotop>
  );
};

export default Gotop;
