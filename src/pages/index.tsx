import { useRouter } from 'next/router';

import { useEffect, useState } from 'react';
import type { TRestaurantDetail } from '@/type';
import { getFilterMrt } from '@/utils/mrtUtil';
import * as Styled from '../styled/styledListPage';
import Filter from '../components/Filter';
import List from '../components/List';
import Button from '../components/Button';

export default function Home() {
  const router = useRouter();
  const [fetchData, setFetchData] = useState<Array<TRestaurantDetail> | null>(null);
  const [filteredData, setFilteredData] = useState<Array<TRestaurantDetail> | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/restaurant/`)
        .then((res) => res.json())
        .then((response) => {
          setFetchData(response.data.restaurant);
          setFilteredData(response.data.restaurant);
        });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const mrtStationID = fetchData?.reduce((pre, cur) => {
      return [...pre, ...cur.mrt];
    }, [] as Array<string>);
    console.log(`mrtStationID`, mrtStationID);
    if (mrtStationID) getFilterMrt(mrtStationID);
  }, [fetchData]);
  const onClickAdd = () => {
    router.push(`/restaurant/add`);
  };
  return (
    <>
      <Styled.PageButtonArea>
        <Button onClick={onClickAdd}>新增</Button>
      </Styled.PageButtonArea>
      <Styled.RestaurantListPageBox>
        <Styled.FilterBox>
          <Filter fetchData={fetchData} setFilteredData={setFilteredData} />
        </Styled.FilterBox>
        <Styled.ListBox>
          <List data={filteredData} />
        </Styled.ListBox>
      </Styled.RestaurantListPageBox>
    </>
  );
}
