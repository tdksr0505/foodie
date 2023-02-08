import styled from 'styled-components';
import BaseTag from '../Tag';
import StarIcon from '@mui/icons-material/Star';

export const Title = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #646667;
  margin-bottom: 6px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const SimpleAddress = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: #306dad;
  margin-bottom: 8px;
`;

export const Tag = styled(BaseTag)`
  & + & {
    margin-left: 10px;
  }
`;

export const TagBox = styled.div`
  display: flex;
  align-items: center;
  ${Tag}+${Tag} {
    margin-left: 10px;
  }
`;
export const VisitMark = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  border: 2px solid #ff0000;
  padding: 2px;
  color: #ff0000;
  font-weight: bold;
  font-size: 18px;
  transform: rotate(35deg);
`;

export const ListItemBox = styled.div`
  padding: 15px;
`;
export const ListItem = styled.div`
  position: relative;
  width: 100%;
  height: 140px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 5px 9px -3px rgba(110, 106, 106, 0.75);
  cursor: pointer;
  & + & {
    margin-top: 20px;
  }

  &:hover {
    background-color: #fff0d7;
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
export const List = styled.div``;
