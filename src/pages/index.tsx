import List from '../components/List';
import Filter from '../components/Filter';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import type { TRestaurantDetail } from '@/type';
import Link from 'next/link';

export default function Home() {
  const [listData, setListData] = useState<Array<TRestaurantDetail> | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`/api/restaurant/`)
        .then((res) => res.json())
        .then((response) => {
          setListData(response);
        });
    };
    fetchData();
  }, []);
  return (
    <>
      <Link href="/restaurant/add">新增</Link>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'top',
        }}
      >
        <Filter />
        <List data={listData} />
      </Box>
    </>
  );
}
