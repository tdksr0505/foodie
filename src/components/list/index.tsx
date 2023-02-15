import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import * as Styled from './styledList';
// import fakeData from '@/../fakeData.json';
import type { TRestaurantDetail } from '@/type';
import TagBox from '@/components/TagBox';
import Tag from '@/components/Tag';
import { getStationName, getTagColor } from '../../utils/mrtUtil';
interface IListProps {
  filteredData: Array<TRestaurantDetail> | null;
}

const List = ({ filteredData }: IListProps) => {
  const [data, setData] = useState<Array<TRestaurantDetail> | null>(null);
  useEffect(() => {
    console.log(`list: prop is change`);
    console.log(filteredData);

    setData(filteredData);
  }, [filteredData]);
  console.log(`list data`, data);
  const BASE_DETAIL_URL = '/restaurant/detail/';
  return (
    <Styled.List>
      {data &&
        data.map((item) => {
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
                  <TagBox>
                    {item.mrt.map((stationID) => {
                      const { fontColor, bgColor } = getTagColor(stationID);
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
          );
        })}
    </Styled.List>
  );
};

export default List;
