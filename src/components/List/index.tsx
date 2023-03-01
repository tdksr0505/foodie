import React from 'react';
import Link from 'next/link';
import * as Styled from './styledList';
import TagBox from '@/components/TagBox';
import Tag from '@/components/Tag';
import { getStationName, getStationColor } from '../../utils/mrtUtil';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import Slide from '@mui/material/Slide';

const List = () => {
  const state = useSelector((state: RootState) => state.list);
  const data = state.filteredList;
  const BASE_DETAIL_URL = '/restaurant/detail/';
  return (
    <Styled.List>
      {data &&
        data.map((item) => {
          return (
            <Slide direction="up" in={true} key={item._id}>
              <Styled.ListItem>
                <Link href={BASE_DETAIL_URL + item._id}>
                  <Styled.ListItemBox>
                    {item.isVisited && <Styled.PostTag>done</Styled.PostTag>}
                    <Styled.Title>{item.name}</Styled.Title>
                    <Styled.RateBox>
                      <Styled.Star />
                      <Styled.Rate>{item.rate}</Styled.Rate>
                    </Styled.RateBox>
                    <Styled.SimpleAddress>{item.simpleAddress}</Styled.SimpleAddress>
                    <TagBox>
                      {item.mrt.map((stationID) => {
                        const { fontColor, bgColor } = getStationColor(stationID);
                        const stationName = getStationName(stationID);
                        return (
                          <Tag key={stationID} fontColor={fontColor} bgColor={bgColor}>
                            {stationName}
                          </Tag>
                        );
                      })}
                      <Tag>{item.type}</Tag>
                    </TagBox>
                  </Styled.ListItemBox>
                </Link>
              </Styled.ListItem>
            </Slide>
          );
        })}
    </Styled.List>
  );
};

export default List;
