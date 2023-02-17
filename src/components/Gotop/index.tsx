import styled from 'styled-components';

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

const scrollTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
export default () => {
  return <StyledGotop onClick={scrollTop}>Top</StyledGotop>;
};
