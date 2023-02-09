import styled from 'styled-components';
import { PageButtonArea as BasePageButtonArea } from './styledListPage';

export const PageButtonArea = styled(BasePageButtonArea)`
  margin-top: 25px;
  text-align: center;
`;

export const TopArea = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0c756;
`;

export const Title = styled.div`
  font-size: 20px;
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
