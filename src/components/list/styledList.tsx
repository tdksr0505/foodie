import styled from 'styled-components';
import StarIcon from '@mui/icons-material/Star';
import BasePostTag from '@/components/PostTag';

export const Title = styled.div`
  font-size: 20px;
  color: #464646;
  margin-bottom: 6px;
`;

export const SimpleAddress = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #306dad;
  margin-bottom: 8px;
`;

export const PostTag = styled(BasePostTag)`
  position: absolute;
  top: 10px;
  right: 4px;
  transform: rotate(35deg);
`;

export const ListItemBox = styled.div`
  padding: 15px;
`;
export const ListItem = styled.div`
  position: relative;
  width: 100%;
  background-color: #fff;
  cursor: pointer;
  &:focus-visible,
  &:focus,
  &:active {
    outline: 0;
  }
  & + & {
    margin-top: 20px;
  }
  &:before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    background: #ebb950;
    width: 100%;
    height: 0px;
    transition: height 0.3s;
  }
  @media (hover: hover) {
    &:hover {
      &:before {
        height: 8px;
      }
    }
  }
`;

export const Star = styled(StarIcon)`
  color: #f0d90f;
`;
export const Rate = styled.div`
  color: #747456;
  font-size: 16px;
  margin-left: 4px;
`;
export const RateBox = styled.div`
  display: flex;
  align-items: center;
`;
export const List = styled.div`
  width: 100%;
  flex: 1 1 auto;
  @media screen and (min-width: 992px) {
    padding-left: 20px;
  }
`;
