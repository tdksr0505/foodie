import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { TRestaurantDetail } from '@/type';
import * as ListStyled from '../styles/styledListPage';
import Filter from '../components/Filter';
import List from '../components/List';
import Button from '../components/Button';
import useLoading from '../hooks/useLoading';

export default function Home() {
  const [fetchData, setFetchData] = useState<Array<TRestaurantDetail> | null>(null);
  const [filteredData, setFilteredData] = useState<Array<TRestaurantDetail> | null>(null);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const { setLoading } = useLoading();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/restaurant/`)
        .then((res) => res.json())
        .then((response) => {
          setFetchData(response.data.restaurant);
          setLoading(false);
        });
    };
    fetchData();
  }, []);
  useEffect(() => {
    setFilteredData(fetchData);
  }, [fetchData]);

  return (
    <>
      <ListStyled.PageButtonArea>
        <Link href="/restaurant/add">
          <Button>新增</Button>
        </Link>
      </ListStyled.PageButtonArea>
      <ListStyled.RestaurantListPageBox>
        <Filter
          fetchData={fetchData}
          setFilteredData={setFilteredData}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
        />
        <List data={filteredData} />
      </ListStyled.RestaurantListPageBox>
      <ListStyled.FilterButton
        onClick={() => {
          setFilterOpen(true);
        }}
      >
        <ListStyled.FilterIcon />
      </ListStyled.FilterButton>
    </>
  );
}
