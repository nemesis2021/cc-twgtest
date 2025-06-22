import { View, Environment, PerspectiveCamera } from '@react-three/drei';
import { useEffect } from 'react';
import { animated } from '@react-spring/web';
import { Box, styled } from '@mui/material';
import { ImageModel } from '../../../utils/models/ImageModel';
import useHomePageCan from '../hooks/useHomePageCan';

const ABox = animated(Box);

const Root = styled(ABox)(() => ({
  width: '100%',
  height: '100%',
  position: 'absolute',
  left: 0,
}));

export const calculateProgress = (
  a: number,
  b: number,
  progressPercentage: number,
) => a + (b - a) * progressPercentage;

export const calculateX = (
  from: number,
  to: number,
  progressPercentage: number,
): number => {
  const x = calculateProgress(from, to, progressPercentage);

  return x;
};

interface Props {
  wrapper: ImageModel;
  sectionHeights: number[];
  canvasReady: boolean;
}

export default function HomePageCanViewMobile(props: Props) {
  const { wrapper, sectionHeights, canvasReady } = props;

  const { element: canElement, animate: animateCan1 } = useHomePageCan({
    wrapper,
    canvasReady,
  });

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY } = window;

      let sectionNumber = 0;
      let sectionScrollStart = 0;
      for (let i = 0; i < sectionHeights.length; i++) {
        if (scrollY > sectionScrollStart + sectionHeights[i]) {
          sectionScrollStart += sectionHeights[i];
          sectionNumber++;
        } else {
          break;
        }
      }

      const sectionHeight = sectionHeights[sectionNumber];
      const percentage = (scrollY - sectionScrollStart) / sectionHeight;

      animateCan1(sectionNumber, percentage);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionHeights, animateCan1]);

  return (
    <Root>
      <View style={{ width: '100%', height: '100%' }}>
        {canElement}

        <PerspectiveCamera makeDefault position={[0, 0, 85]} fov={15} />

        <Environment path="/hdrs" files="/empty_warehouse_01_1k.hdr" />
      </View>
    </Root>
  );
}
