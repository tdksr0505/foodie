import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import * as ListStyled from '../styles/styledListPage';
import Filter from '../components/Filter';
import List from '../components/List';
import useAuth from '@/hooks/useAuth';
import type { TRestaurantDetail } from '@/type';
import { getRestaurantList } from '../lib/api';

const IndexPage = ({ listData }: { listData: TRestaurantDetail[] }) => {
  const { auth } = useAuth();
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [listCount, setListCount] = useState<number>(0);

  useEffect(() => {
    document.body.style.overflow = filterOpen ? 'hidden' : 'initial';
  }, [filterOpen]);
  return (
    <>
      <ListStyled.ListTopArea>
        <ListStyled.CountBox>筆數：{listCount}</ListStyled.CountBox>
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
      <Suspense fallback={<p>Loading feed...</p>}>
        <ListStyled.RestaurantListPageBox>
          <Filter filterOpen={filterOpen} setFilterOpen={setFilterOpen} listData={listData} />
          <List list={listData} setListCount={setListCount} />
        </ListStyled.RestaurantListPageBox>
      </Suspense>

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
  const listData = await getRestaurantList();
  return {
    props: { listData },
  };
}
