import styled from 'styled-components';
import bgImg from '../../assets/bg.jpg';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: url(${bgImg.src}) top center no-repeat;
  background-size: 1920px auto;
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
      <Mask />
    </Container>
  );
};

export default Background;
