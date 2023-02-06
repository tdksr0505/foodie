import React from 'react';
import * as Styled from './styledList';

interface ITagProps {
  children: React.ReactNode;
}
const Tag = ({ children }: ITagProps) => {
  return <Styled.Tag>{children}</Styled.Tag>;
};

export default Tag;
