import styled from 'styled-components';
import { PageButtonArea } from './styledListPage';
import TagBox from '@/components/TagBox';

export const DetailTagBox = styled(TagBox)`
  margin-bottom: 10px;
`;

export const DetailButtonArea = styled(PageButtonArea)`
  margin-top: 25px;
  text-align: center;
`;

export const TopArea = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0c756;
`;

export const Title = styled.div`
  font-size: 22px;
  color: #464646;
  margin-bottom: 10px;
`;
export const DataRow = styled.div`
  display: flex;
  font-size: 16px;
  & + & {
    margin-top: 10px;
  }
`;
export const DataLabel = styled.div`
  flex: 0 0 auto;
  width: 96px;
  text-align: right;
  color: #646b73;
`;
export const DataValue = styled.div``;
