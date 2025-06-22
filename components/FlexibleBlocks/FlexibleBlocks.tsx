import { Stack } from '@mui/material';
import { FlexibleBlockType } from '../../utils/models/FlexibleBlocksModel';
import { CONTENT_GAP } from '../../utils/styleGlobals';

import FlexibleBlock from './FlexibleBlock';

interface Props {
  data: FlexibleBlockType[];
  flexibleBlockPrefix: string;
}

export default function FlexibleBlocks(props: Props) {
  const { data, flexibleBlockPrefix } = props;

  return (
    <Stack gap={CONTENT_GAP}>
      {data.map((item) => (
        <FlexibleBlock
          flexibleBlock={item}
          flexibleBlockPrefix={flexibleBlockPrefix}
        />
      ))}
    </Stack>
  );
}
