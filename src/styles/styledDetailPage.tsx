import styled from 'styled-components';
import { PageButtonArea } from './styledListPage';
import TagBox from '@/components/TagBox';
import Button from '@/components/Button';

export const DetailTagBox = styled(TagBox)`
  margin-bottom: 10px;
`;

export const DeleteButton = styled(Button)`
  margin-left: 10px;
`;

export const DetailButtonArea = styled(PageButtonArea)`
  display: flex;
  justify-content: space-between;
  margin-top: 25px;
  text-align: center;
`;

export const TopArea = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #82929f;
`;

export const Title = styled.div`
  font-size: 22px;
  color: #464646;
  margin-bottom: 10px;
  font-weight: bold;
`;
export const DataRow = styled.div`
  font-size: 16px;
  & + & {
    margin-top: 10px;
  }
  @media screen and (min-width: 992px) {
    display: flex;
  }
`;
export const DataLabel = styled.div`
  flex: 0 0 auto;
  color: #005ed8;
  font-size: 18px;
  @media screen and (min-width: 992px) {
    width: 108px;
    text-align: right;
  }
`;
export const DataValue = styled.div`
  font-size: 17px;
`;
