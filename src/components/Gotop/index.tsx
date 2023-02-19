import styled from 'styled-components';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
`;

const Icon = styled(KeyboardArrowUpIcon)`
  font-size: 40px;
  color: #fff;
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
