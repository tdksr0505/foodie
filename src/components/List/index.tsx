import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import * as Styled from './styledList';
import TagBox from '@/components/TagBox';
import Tag from '@/components/Tag';
import SkeletonList from '@/components/SkeletonList';
import { filterData } from '@/utils/filterUtil';
import { getStationName, getStationColor } from '@/utils/mrtUtil';
import type { RootState } from '@/store';
import type { TRestaurantData } from '@/type';

interface IList {
  list: TRestaurantData[] | null;
  setListCount: React.Dispatch<React.SetStateAction<number>>;
  isLoadingList: boolean;
}
const BASE_DETAIL_URL = '/restaurant/detail/';
const List = ({ list, setListCount, isLoadingList }: IList) => {
  const filter = useSelector((state: RootState) => state.filter).filter;
  const [filteredData, setFilteredData] = useState<TRestaurantData[]>([]);

  useEffect(() => {
    if (list) {
      let data = filterData(list, filter);
      setListCount(data.length);
      setFilteredData(data);
    }
  }, [filter, list]);

  if (isLoadingList) {
    return (
      <Styled.List>
        <SkeletonList />
      </Styled.List>
    );
  } else {
    return (
      <Styled.List>
        {filteredData.map((item) => {
          return (
            <Styled.ListItem key={item._id}>
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
          );
        })}
      </Styled.List>
    );
  }
};

export default List;
