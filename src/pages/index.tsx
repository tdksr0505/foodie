import Link from 'next/link';
import { useEffect, useState } from 'react';
import * as ListStyled from '../styles/styledListPage';
import Filter from '../components/TmpFilter';
import List from '../components/TmpList';
import Button from '../components/Button';
import useLoading from '../hooks/useLoading';
import useAuth from '@/hooks/useAuth';
import { useDispatch } from 'react-redux';
import { initList } from '@/reducers/listSlice';
const IndexPage = () => {
  const dispatch = useDispatch();
  const { auth } = useAuth();
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const { setLoading } = useLoading();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/restaurant/`)
        .then((res) => res.json())
        .then((result) => {
          dispatch(initList(result.data.restaurant));
          setLoading(false);
        });
    };
    fetchData();
  }, [dispatch, setLoading]);

  return (
    <>
      {auth && (
        <ListStyled.PageButtonArea>
          <Link href="/restaurant/add">
            <Button>新增</Button>
          </Link>
        </ListStyled.PageButtonArea>
      )}
      <ListStyled.RestaurantListPageBox>
        <Filter filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
        <List />
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
};

export default IndexPage;
