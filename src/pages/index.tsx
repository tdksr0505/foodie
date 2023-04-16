import Link from 'next/link';
import { useState, useEffect, Suspense } from 'react';
import * as ListStyled from '../styles/styledListPage';
import Filter from '../components/Filter';
import List from '../components/List';
import type { TRestaurantData } from '@/type';
import { getRestaurantList } from '../lib/api';
import { useSession } from 'next-auth/react';

const IndexPage = ({ listData }: { listData: TRestaurantData[] }) => {
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [listCount, setListCount] = useState<number>(0);
  const { data: session } = useSession();

  useEffect(() => {
    document.body.style.overflow = filterOpen ? 'hidden' : 'initial';
  }, [filterOpen]);
  return (
    <>
      <ListStyled.ListTopArea>
        <ListStyled.CountBox>筆數：{listCount}</ListStyled.CountBox>
        {session && (
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
        <Filter filterOpen={filterOpen} setFilterOpen={setFilterOpen} listData={listData} />
        <List list={listData} setListCount={setListCount} />
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
  const listData = await getRestaurantList();
  return {
    props: { listData },
  };
}
