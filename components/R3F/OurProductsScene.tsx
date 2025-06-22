import { CSSProperties, Dispatch, SetStateAction, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import { Canvas as R3FCanvas } from '@react-three/fiber';
import { PerspectiveCamera, Environment } from '@react-three/drei';
import ParallaxContainer from '../Animation/Parallax/ParallaxContainer';
import useWindowDimentions from '../../utils/hooks/useWindowDimentions';
import { ImageModel } from '../../utils/models/ImageModel';
import useOurProductsCan from './hooks/useOurProductsCan';
import { NAV_HEIGHT_MD } from '../../utils/styleGlobals';

interface Props {
  wrapper: ImageModel;
  sectionHeights: number[];
  offset?: number;
  position?: CSSProperties['position'];
  canvasReady: boolean;
  setCanvasReady: Dispatch<SetStateAction<boolean>>;
}

export default function OurProductsScene(props: Props) {
  const {
    sectionHeights,
    wrapper,
    offset = 0,
    position = 'absolute',
    canvasReady,
    setCanvasReady,
  } = props;
  const { innerHeight } = useWindowDimentions();

  const { element: canElement, animate: animateCan1 } = useOurProductsCan({
    wrapper,
    canvasReady,
  });

  const theme = useTheme();
  const { lg } = theme.breakpoints.values;
  const isLg = useMediaQuery(theme.breakpoints.up(lg));

  useEffect(() => {
    const handleScroll = () => {
      const { scrollY } = window;
      const realScrollY = scrollY - offset + NAV_HEIGHT_MD;

      let sectionNumber = 0;
      let sectionScrollStart = 0;
      for (let i = 0; i < sectionHeights.length; i++) {
        if (realScrollY > sectionScrollStart + sectionHeights[i]) {
          sectionScrollStart += sectionHeights[i];
          sectionNumber++;
        } else {
          break;
        }
      }

      const sectionHeight = sectionHeights[sectionNumber];
      const percentage = (realScrollY - sectionScrollStart) / sectionHeight;

      animateCan1(sectionNumber, percentage);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionHeights, animateCan1, offset]);

  return (
    <ParallaxContainer
      sticky={{
        start: 0,
        end: sectionHeights.reduce((a, b) => a + b, 0) - innerHeight,
      }}
      offset={offset}
      sx={{
        pointerEvents: 'none',
        zIndex: 2,
        position,
        top: 0,
      }}
    >
      <R3FCanvas
        shadows
        gl={{ antialias: true, alpha: true }}
        style={{
          width: '100vw',
          height: '100vh',
          pointerEvents: 'none',
          left: isLg ? '-26%' : '-28%',
        }}
        onCreated={() => setCanvasReady(true)}
      >
        <Environment path="/hdrs" files="/empty_warehouse_01_1k.hdr" />
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 30]}
          fov={42}
          rotation={[0, 0, 0]}
        />

        {canElement}
      </R3FCanvas>
    </ParallaxContainer>
  );
}
