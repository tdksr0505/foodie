import Link from 'next/link';
import { useState, useEffect } from 'react';
import * as ListStyled from '../styles/styledListPage';
import Filter from '../components/Filter';
import List from '../components/List';
import useAuth from '@/hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { initList } from '@/reducers/listSlice';
import type { TRestaurantFormData } from '@/type';
import type { RootState } from '@/store';

const IndexPage = ({ listData }: { listData: TRestaurantFormData[] }) => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.list);
  const { auth } = useAuth();
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  useEffect(() => {
    dispatch(initList(listData));
  }, []);

  return (
    <>
      <ListStyled.ListTopArea>
        <ListStyled.CountBox>筆數：{state.filteredList?.length}</ListStyled.CountBox>
        {auth && (
          <ListStyled.PageButtonArea>
            <Link href="/restaurant/add">
              <ListStyled.AddButton>
                <ListStyled.AddIcon />
              </ListStyled.AddButton>
            </Link>
          </ListStyled.PageButtonArea>
        )}
      </ListStyled.ListTopArea>

      <ListStyled.RestaurantListPageBox>
        <Filter filterOpen={filterOpen} setFilterOpen={setFilterOpen} />
        <List />
      </ListStyled.RestaurantListPageBox>
      <ListStyled.FilterButtonBox>
        <ListStyled.FilterButton
          onClick={() => {
            setFilterOpen(true);
          }}
        >
          <ListStyled.FilterIcon />
        </ListStyled.FilterButton>
      </ListStyled.FilterButtonBox>
    </>
  );
};

export default IndexPage;
export async function getServerSideProps(context: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/restaurant/`);
  const result = await res.json();
  return {
    props: { listData: result.data.restaurant },
  };
}
