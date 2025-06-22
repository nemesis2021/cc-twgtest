import { View, Environment, PerspectiveCamera } from '@react-three/drei';
import { useEffect } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { Box, styled } from '@mui/material';
import { ImageModel } from '../../../utils/models/ImageModel';
import useProductInnerCan from '../hooks/useProductInnerCan';
import { getFromAndToNumber, getStepPercentage } from '../utils';
import ParallaxContainer from '../../Animation/Parallax/ParallaxContainer';
import useWindowDimentions from '../../../utils/hooks/useWindowDimentions';
import useResizeObserver from '../../../utils/hooks/useResizeObserver';

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
  visible: boolean;
  offset?: number;
}

export default function ProductInnerCanView(props: Props) {
  const {
    wrapper,
    sectionHeights,
    canvasReady,
    offset,
    visible = true,
  } = props;

  const { element: canElement, animate: animateCan1 } = useProductInnerCan({
    wrapper,
    canvasReady,
  });

  const { innerWidth } = useWindowDimentions();
  const {
    ref: viewBoxRef,
    clientWidth: viewBoxWidth,
    clientHeight: viewBoxHeight,
  } = useResizeObserver();

  const [springX, springXApi] = useSpring(() => ({
    x: 0,
    y: 0,
    width: viewBoxWidth,
    height: viewBoxHeight,
    scale: 1,
  }));

  useEffect(() => {
    springXApi.start({
      scale: visible ? 1 : 0,
    });
  }, [visible, springXApi]);

  useEffect(() => {
    const WIDTH_SIZE = [
      [viewBoxWidth, viewBoxWidth, viewBoxWidth],
      [innerWidth, innerWidth, innerWidth],
    ];

    const HEIGHT_SIZE = [
      [viewBoxHeight, viewBoxHeight, viewBoxHeight],
      [
        sectionHeights[1] / 1.2,
        sectionHeights[1] / 1.2,
        sectionHeights[1] / 1.2,
      ],
    ];

    const rect = viewBoxRef.current?.getBoundingClientRect();
    const leftX = rect?.x ?? 0;

    const X_POSITION = [
      [0, 0, 0],
      [-leftX, -leftX, -leftX],
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

      const [widthFrom, widthTo] = getFromAndToNumber(
        WIDTH_SIZE,
        sectionNumber,
        currSectionStep,
      );

      const [heightFrom, heightTo] = getFromAndToNumber(
        HEIGHT_SIZE,
        sectionNumber,
        currSectionStep,
      );

      const x = Number.isNaN(calculateX(xFrom, xTo, stepPercentage))
        ? X_POSITION[1][2]
        : calculateX(xFrom, xTo, stepPercentage);

      const width = Number.isNaN(calculateX(widthFrom, widthTo, stepPercentage))
        ? WIDTH_SIZE[1][2]
        : calculateX(widthFrom, widthTo, stepPercentage);

      const height = Number.isNaN(
        calculateX(heightFrom, heightTo, stepPercentage),
      )
        ? HEIGHT_SIZE[1][2]
        : calculateX(heightFrom, heightTo, stepPercentage);

      springXApi.start({
        x,
        width,
        height,
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
    viewBoxHeight,
  ]);

  const parallaxOffset = offset ?? 0;
  const parallaxEnd = sectionHeights[0] - parallaxOffset;

  return (
    <ParallaxContainer
      sticky={{
        start: 0,
        end: parallaxEnd,
      }}
      offset={parallaxOffset}
      sx={{
        pointerEvents: 'none',
        zIndex: 2,
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
      ref={viewBoxRef}
    >
      <Root style={springX}>
        <View style={{ width: '100%', height: '100%' }}>
          {canElement}
          <PerspectiveCamera
            makeDefault
            position={[0, 0, 45]}
            fov={20}
            rotation={[0, 0, 0]}
          />
          <Environment path="/hdrs" files="/empty_warehouse_01_1k.hdr" />
        </View>
      </Root>
    </ParallaxContainer>
  );
}
