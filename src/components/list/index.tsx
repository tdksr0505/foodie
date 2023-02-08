import React, { useMemo } from 'react';
import Link from 'next/link';
import * as Styled from './styledList';
// import fakeData from '@/../fakeData.json';
import useMrt from '../../hooks/useMrt';
import type { TRestaurantDetail } from '@/type';
import { getStationName, getTagColor, getAllStationOptions } from '../../utils/mrtUtil';
interface IListProps {
  data: Array<TRestaurantDetail> | null;
}

const List = ({ data }: IListProps) => {
  const BASE_DETAIL_URL = '/restaurant/detail/';
  return (
    <Styled.List>
      {data &&
        data.map((item) => {
          // const { fontColor, bgColor } = getTagColor(item.mrt);
          // const stationName = getStationName(item.mrt);
          let fontColor = '#ffffff';
          let bgColor = '#ffffff';
          let stationName = '';

          return (
            <Styled.ListItem key={item._id}>
              <Link href={BASE_DETAIL_URL + item._id}>
                <Styled.ListItemBox>
                  {item.isVisited && <Styled.VisitMark>done</Styled.VisitMark>}
                  <Styled.Title>{item.name}</Styled.Title>
                  <Styled.RateBox>
                    <Styled.Star />
                    <Styled.Rate>{item.rate}</Styled.Rate>
                  </Styled.RateBox>
                  <Styled.SimpleAddress>{item.simpleAddress}</Styled.SimpleAddress>
                  <Styled.TagBox>
                    <Styled.Tag fontColor={fontColor} bgColor={bgColor}>
                      {stationName}
                    </Styled.Tag>
                    <Styled.Tag>{item.type}</Styled.Tag>
                    {item.canReserve && (
                      <Styled.Tag fontColor="#fff" bgColor="#0eafa4">
                        可預約
                      </Styled.Tag>
                    )}
                  </Styled.TagBox>
                </Styled.ListItemBox>
              </Link>
            </Styled.ListItem>
          );
        })}
    </Styled.List>
  );
};

export default List;
