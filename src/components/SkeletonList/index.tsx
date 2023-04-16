import Skeleton from '@mui/material/Skeleton';
import * as StyledList from '../List/styledList';

const SKELETON_COUNT = 10;
const SkeletonList = () => {
  const Skeletons = [];

  for (let i = 0; i < SKELETON_COUNT; i++) {
    Skeletons.push(
      <StyledList.ListItem style={{ pointerEvents: 'none' }} key={i}>
        <StyledList.ListItemBox>
          <Skeleton variant="text" width={'60%'} height={30} />
          <Skeleton variant="text" width={'10%'} height={30} />
          <Skeleton variant="text" width={'40%'} height={30} />
          <Skeleton variant="text" width={'20%'} height={30} />
        </StyledList.ListItemBox>
      </StyledList.ListItem>
    );
  }

  return <div>{Skeletons}</div>;
};

export default SkeletonList;
