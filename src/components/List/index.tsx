import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import * as Styled from './styledList';
import TagBox from '@/components/TagBox';
import Tag from '@/components/Tag';
import SkeletonList from '@/components/SkeletonList';
import { getStationName, getStationColor } from '../../utils/mrtUtil';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import type { TRestaurantData } from '@/type';
import InfiniteScroll from 'react-infinite-scroll-component';

interface IList {
  list: TRestaurantData[] | null;
  setListCount: React.Dispatch<React.SetStateAction<number>>;
  isLoadingList: boolean;
}
const ITEM_COUNT_PER_PAGE = 10;
const List = ({ list, setListCount, isLoadingList }: IList) => {
  // display list
  const [data, setData] = useState<TRestaurantData[]>([]);
  const [searchedList, setSearchedList] = useState<TRestaurantData[]>([]);
  const filter = useSelector((state: RootState) => state.filter).filter;
  const page = useRef<number>(1);
  const compareMrt = (filterMrt: string[], listItemMrt: string[]) => {
    //比較 filter mrt[] 和 list item的mrt[]
    for (let itemMrt of listItemMrt) {
      if (filterMrt.includes(itemMrt)) {
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    if (list) {
      setData(list);
      setSearchedList(list);
    }
  }, [list]);

  const filterList = () => {
    if (list) {
      const result = list.filter((elem) => {
        return (
          (filter.name === '' || elem.name?.toLowerCase().includes(filter.name.toLowerCase())) &&
          (filter.type.length === 0 || filter.type.includes(elem.type || '')) &&
          (filter.mrt.length === 0 || compareMrt(filter.mrt, elem.mrt)) &&
          (filter.isVisited === null || filter.isVisited === elem.isVisited)
        );
      });
      setSearchedList(result);
      setListCount(result.length);
      page.current = 1;
      setData(result.slice(0, page.current * ITEM_COUNT_PER_PAGE));
    }
  };

  useEffect(() => {
    filterList();
  }, [filter]);

  const loadMoreData = () => {
    page.current++;
    setData(searchedList.slice(0, page.current * ITEM_COUNT_PER_PAGE));
  };
  const BASE_DETAIL_URL = '/restaurant/detail/';
  if (isLoadingList) {
    return (
      <Styled.List>
        <SkeletonList />
      </Styled.List>
    );
  } else {
    return (
      <Styled.List>
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          hasMore={data.length < searchedList.length}
          loader={''}
          style={{ overflow: 'initial' }}
        >
          {data.map((item) => {
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
        </InfiniteScroll>
      </Styled.List>
    );
  }
};

export default List;
