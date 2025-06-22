import { View, Environment, PerspectiveCamera } from '@react-three/drei';
import { useEffect } from 'react';
import { animated, config, useSpring } from '@react-spring/web';
import { Box, styled } from '@mui/material';
import { ImageModel } from '../../../utils/models/ImageModel';
import { getFromAndToNumber, getStepPercentage } from '../utils';
import ParallaxContainer from '../../Animation/Parallax/ParallaxContainer';
import useWindowDimentions from '../../../utils/hooks/useWindowDimentions';
import useResizeObserver from '../../../utils/hooks/useResizeObserver';
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
  scrollPoint: {
    x: number;
    y: number;
  };
}

export default function HomePageCanView(props: Props) {
  const { wrapper, sectionHeights, canvasReady, scrollPoint } = props;

  const { element: canElement, animate: animateCan1 } = useHomePageCan({
    wrapper,
    canvasReady,
  });

  const { innerWidth } = useWindowDimentions();
  const {
    ref: viewBoxRef,
    clientHeight: viewBoxHeight,
    clientWidth: viewBoxWidth,
  } = useResizeObserver();

  const [springX, springXApi] = useSpring(() => ({
    x: 0,
    config: config.slow,
  }));

  useEffect(() => {
    const innerWidthCenter = innerWidth / 2;
    const offsetCorrection = 10;
    const endPosition = scrollPoint.x - innerWidthCenter + offsetCorrection;

    const X_POSITION = [
      [innerWidth * 0.2, 0, 0],
      [0, 0, endPosition],
      [endPosition, endPosition, endPosition],
    ];

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

      const currSectionSteps = X_POSITION[sectionNumber]?.length;
      const currSectionStep = Math.floor(percentage * currSectionSteps);

      const stepPercentage = getStepPercentage(currSectionSteps, percentage);
      const [xFrom, xTo] = getFromAndToNumber(
        X_POSITION,
        sectionNumber,
        currSectionStep,
      );

      const x = Number.isNaN(calculateX(xFrom, xTo, stepPercentage))
        ? X_POSITION[2][2]
        : calculateX(xFrom, xTo, stepPercentage);

      springXApi.start({
        x,
      });

      animateCan1(sectionNumber, percentage);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [
    sectionHeights,
    animateCan1,
    springXApi,
    innerWidth,
    viewBoxWidth,
    viewBoxRef,
    scrollPoint.x,
    viewBoxHeight,
  ]);

  const viewBoxCenter = viewBoxHeight / 2;
  const parallaxEnd = scrollPoint.y - viewBoxCenter;

  return (
    <ParallaxContainer
      sticky={{
        start: 0,
        end: parallaxEnd,
      }}
      sx={{
        pointerEvents: 'none',
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
      ref={viewBoxRef}
    >
      <Root style={springX}>
        <View style={{ width: '100%', height: '100%' }}>
          {canElement}

          <PerspectiveCamera makeDefault position={[0, 0, 85]} fov={15} />

          <Environment path="/hdrs" files="/empty_warehouse_01_1k.hdr" />
        </View>
      </Root>
    </ParallaxContainer>
  );
}
