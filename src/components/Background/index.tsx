import styled from 'styled-components';
import bgImg from '../../assets/bg.jpg';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;

const BgImg = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
`;

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.5;
`;
const Background = () => {
  return (
    <Container>
      <BgImg src={bgImg.src} />
      <Mask />
    </Container>
  );
};

export default Background;
