import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { TRestaurantFormData } from '@/type';
import Button from '@/components/Button';
import WhiteBox from '@/components/WhiteBox';
import Tag from '@/components/Tag';
import Dialog from '@/components/Dialog';
import {
  DataRow,
  DataLabel,
  DataValue,
  Title,
  TopArea,
  DetailButtonArea,
  DetailTagBox,
  DeleteButton,
} from '@/styled/styledDetailPage';
import { RateBox, Rate, Star } from '@/components/List/styledList';
import { getStationName, getTagColor } from '../../../utils/mrtUtil';
export default function RestaurantDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [detailData, setDetailData] = useState<TRestaurantFormData | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchData = async () => {
      await fetch(`/api/restaurant/${id}`)
        .then((res) => res.json())
        .then((response) => {
          setDetailData(response.data);
        });
    };

    fetchData();
  }, [router.isReady]);

  const handleDelete = async () => {
    await fetch(`/api/restaurant/${id}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then((response) => {
        if (response.code === 0) {
          router.push(`/`);
        }
      });
  };
  const onClickDelete = () => {
    setOpenDialog(true);
  };
  return (
    <>
      <WhiteBox>
        {detailData && (
          <>
            <TopArea>
              <Title>{detailData.name}</Title>
              <DetailTagBox>
                {detailData.mrt.map((stationID) => {
                  const { fontColor, bgColor } = getTagColor(stationID);
                  const stationName = getStationName(stationID);
                  return (
                    <Tag key={stationID} fontColor={fontColor} bgColor={bgColor}>
                      {stationName}
                    </Tag>
                  );
                })}
              </DetailTagBox>
              <RateBox>
                <Star />
                <Rate>{detailData.rate}</Rate>
              </RateBox>
            </TopArea>
            <DataRow>
              <DataLabel>地址：</DataLabel>
              <DataValue>
                <div>{detailData.address}</div>
              </DataValue>
            </DataRow>
            <DataRow>
              <DataLabel>電話：</DataLabel>
              <DataValue>
                <div>{detailData.tel}</div>
              </DataValue>
            </DataRow>
            <DataRow>
              <DataLabel>餐廳類型：</DataLabel>
              <DataValue>
                <div>{detailData.type}</div>
              </DataValue>
            </DataRow>
            <DataRow>
              <DataLabel>是否可訂位：</DataLabel>
              <DataValue>
                <div>{detailData.canReserve ? '可訂位' : '不可訂位'}</div>
              </DataValue>
            </DataRow>
            <DataRow>
              <DataLabel>是否吃過：</DataLabel>
              <DataValue>
                <div>{detailData.isVisited ? '已吃過' : '沒吃過'}</div>
              </DataValue>
            </DataRow>
            <DataRow>
              <DataLabel>是否回訪：</DataLabel>
              <DataValue>
                <div>{detailData.isReturnVisited ? '可回訪' : '不用回訪'}</div>
              </DataValue>
            </DataRow>

            <DetailButtonArea>
              <div>
                <Link href="/">
                  <Button>返回列表</Button>
                </Link>
              </div>
              <div>
                <DeleteButton onClick={onClickDelete}>刪除</DeleteButton>
                <Link href={`/restaurant/edit/${id}`}>
                  <Button>編輯</Button>
                </Link>
              </div>
            </DetailButtonArea>
          </>
        )}
      </WhiteBox>
      <Dialog title={'確定要刪除餐廳嗎?'} handleAgree={handleDelete} open={openDialog} setOpen={setOpenDialog} />
    </>
  );
}
