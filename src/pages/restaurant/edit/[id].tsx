import type { TRestaurantData } from '@/type';
import RestaurantForm from '@/components/RestaurantForm';
import { getRestaurantDetail } from '@/lib/api';

export default function RestaurantDetail({ id, detailData }: { id: string; detailData: TRestaurantData }) {
  return <RestaurantForm title="Edit" data={detailData} id={id} />;
}

export async function getServerSideProps(context: any) {
  const id = context.params.id;
  const result = await getRestaurantDetail(id);
  if (!result.data) {
    const { res } = context;
    res.writeHead(301, { Location: '/' });
    res.end();
  }
  return {
    props: { detailData: result.data, id },
  };
}
