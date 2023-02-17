import type { TRestaurantFormData } from '@/type';
import RestaurantForm from '@/components/RestaurantForm';

export default function RestaurantDetail({ id, detailData }: { id: string; detailData: TRestaurantFormData }) {
  return <RestaurantForm title="Edit" data={detailData} id={id} />;
}

export async function getServerSideProps(context: any) {
  const id = context.params.id;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/restaurant/${id}`);
  const result = await res.json();
  return {
    props: { detailData: result.data, id },
  };
}
