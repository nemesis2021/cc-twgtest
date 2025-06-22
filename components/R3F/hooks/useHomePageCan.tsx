import { animated, SpringRef, config, useSpring } from '@react-spring/three';
import { Float } from '@react-three/drei';
import { useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';
import {
  Vector,
  VectorArray,
  calculateProgress,
  calculateVector,
  getFromAndToNumber,
  getFromAndToVector,
  getStepPercentage,
} from '../utils';
import Can from '../Can';
import { ImageModel } from '../../../utils/models/ImageModel';

const ACan = animated(Can);
const SECTION_COUNT = 3;

// These are arrays of positions to transitions through per section
// Each section may have multiple animation steps
// Note: rotation and position arrays must have the same number of elements
const INNER_ROTATIONS_Y_XS: number[][] = [[], [], []];
const INNER_ROTATIONS_Y_XS_FIRST = INNER_ROTATIONS_Y_XS[0][0];
const INNER_ROTATIONS_Y_XS_LAST = INNER_ROTATIONS_Y_XS[2][0];

const POSITIONS: VectorArray = [
  [
    [0, -2, 0],
    [0, 0, 0],
  ],
  [
    [0, 0, 0],
    [0, 0, 0],
  ],
  [
    [0, 0, 0],
    [0, 0, 0],
  ],
];

const POSITIONS_FIRST = POSITIONS[0][0];
const POSITIONS_LAST = POSITIONS[2][1];

const POSITIONS_XS: VectorArray = [[[0, 5, -1]], [[0, -3, 0]], [[0, -8, -10]]];
const POSITIONS_XS_FIRST = POSITIONS_XS[0][0];
const POSITIONS_XS_LAST = POSITIONS_XS[2][2];

const ROTATIONS_XS: VectorArray = [
  [[0, -0.2, -0.08]],
  [[0, 2 * Math.PI, -0.08]],
  [[0, 4 * Math.PI - 0.2, -0.08]],
];

const ROTATIONS_XS_FIRST = ROTATIONS_XS[0][0];
const ROTATIONS_XS_LAST = ROTATIONS_XS[2][0];

const SCALES_XS: VectorArray = [
  [[0.65, 0.65, 0.65]],
  [[0.65, 0.65, 0.65]],
  [[0.65, 0.65, 0.65]],
];

const SCALES_XS_FIRST = SCALES_XS[0][0];
const SCALES_XS_LAST = SCALES_XS[2][0];

const ROTATIONS: VectorArray = [
  [
    [-0.1, -0.35, -Math.PI * 2 - 0.15],
    [-0.1, 1.3, 0],
  ],
  [
    [0, 0, 0],
    [0, -Math.PI * 1, 0],
  ],
  [
    [0, -Math.PI * 2, 0],
    [0, -Math.PI * 2, 0],
  ],
];

const ROTATIONS_FIRST = ROTATIONS[0][0];
const ROTATIONS_LAST = ROTATIONS[2][1];

const SCALE_VALUE = 0.44;
const SCALES: VectorArray = [
  [
    [1.25, 1.25, 1.25],
    [1.1, 1.1, 1.1],
  ],
  [
    [1.2, 1.2, 1.2],
    [SCALE_VALUE, SCALE_VALUE, SCALE_VALUE],
  ],
  [
    [SCALE_VALUE, SCALE_VALUE, SCALE_VALUE],
    [SCALE_VALUE, SCALE_VALUE, SCALE_VALUE],
  ],
];

const SCALES_FIRST = SCALES[0][0];
const SCALES_LAST = SCALES[2][1];

const animate = (
  sectionNumber: number,
  percentage: number,
  springApi: SpringRef<{
    position: Vector;
    rotation: Vector;
    innerRotation: Vector;
    scale: Vector;
  }>,
  isMd: boolean,
) => {
  let positions = POSITIONS;

  if (!isMd) {
    positions = POSITIONS_XS;
  }

  const currSectionSteps = positions[sectionNumber]?.length;
  const currSectionStep = Math.floor(percentage * currSectionSteps);

  const [positionFrom, positionTo] = getFromAndToVector(
    positions,
    sectionNumber,
    currSectionStep,
  );

  if (positionFrom && positionTo) {
    const scales = isMd ? SCALES : SCALES_XS;
    const rotations = isMd ? ROTATIONS : ROTATIONS_XS;
    const [rotationFrom, rotationTo] = getFromAndToVector(
      rotations,
      sectionNumber,
      currSectionStep,
    );

    const [scaleFrom, scaleTo] = getFromAndToVector(
      scales,
      sectionNumber,
      currSectionStep,
    );

    const stepPercentage = getStepPercentage(currSectionSteps, percentage);
    const rotation = calculateVector(rotationFrom, rotationTo, stepPercentage);
    const position = calculateVector(positionFrom, positionTo, stepPercentage);
    const scale = calculateVector(scaleFrom, scaleTo, stepPercentage);

    let innerRotationY = 0;

    if (!isMd) {
      const [innerRotationFrom, innerRotationTo] = getFromAndToNumber(
        INNER_ROTATIONS_Y_XS,
        sectionNumber,
        currSectionStep,
      );

      if (innerRotationFrom !== undefined && innerRotationTo !== undefined) {
        innerRotationY = calculateProgress(
          innerRotationFrom,
          innerRotationTo,
          stepPercentage,
        );
      }
    }

    springApi.start({
      position,
      rotation,
      scale,
      innerRotation: [0, innerRotationY, 0],
      config: isMd ? config.slow : { duration: 0 },
    });
  } else if (sectionNumber >= SECTION_COUNT - 1) {
    // handle end position when outside section

    springApi.start({
      position: isMd ? POSITIONS_LAST : POSITIONS_XS_LAST,
      rotation: isMd ? ROTATIONS_LAST : ROTATIONS_XS_LAST,
      scale: isMd ? SCALES_LAST : SCALES_XS_LAST,
      innerRotation: [0, isMd ? 0 : INNER_ROTATIONS_Y_XS_LAST, 0],
      config: isMd ? config.slow : { duration: 0 },
    });
  }
  // else {
  //   // handle start position when outside section
  //   console.log('start position case');
  //   springApi.start({
  //     position: isMd ? POSITIONS_FIRST : POSITIONS_XS_FIRST,
  //     rotation: isMd ? ROTATIONS_FIRST : ROTATIONS_XS_FIRST,
  //     innerRotation: [0, isMd ? 0 : INNER_ROTATIONS_Y_XS_FIRST, 0],
  //     scale: isMd ? SCALES_FIRST : SCALES_XS_FIRST,
  //     config: isMd ? config.slow : { duration: 0 },
  //   });
  // }
};

interface Props {
  wrapper: ImageModel;
  canvasReady: boolean;
}

export default function useHomePageCan(props: Props) {
  const { canvasReady, wrapper } = props;

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const isMd = useMediaQuery(theme.breakpoints.up(md));

  const [spring, springApi] = useSpring(() => ({
    position: isMd ? POSITIONS_FIRST : POSITIONS_XS_FIRST,
    rotation: isMd ? ROTATIONS_FIRST : ROTATIONS_XS_FIRST,
    innerRotation: [0, isMd ? 0 : INNER_ROTATIONS_Y_XS_FIRST, 0] as Vector,
    scale: isMd ? SCALES_FIRST : SCALES_XS_FIRST,
    config: isMd ? config.slow : { duration: 0 },
  }));

  useEffect(() => {
    if (!canvasReady) return;
    springApi.start({
      position: isMd ? POSITIONS_FIRST : POSITIONS_XS_FIRST,
      rotation: isMd ? ROTATIONS_FIRST : ROTATIONS_XS_FIRST,
      scale: isMd ? SCALES_FIRST : SCALES_XS_FIRST,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasReady, springApi]);

  return {
    element: (
      <animated.group
        position={spring.position}
        rotation={spring.rotation as any}
        scale={spring.scale as any}
      >
        <Float speed={4} rotationIntensity={0.4} floatIntensity={2}>
          <ACan rotation={spring.innerRotation as any} wrapper={wrapper} />
        </Float>
      </animated.group>
    ),
    animate: (sectionNumber: number, percentage: number) => {
      animate(sectionNumber, percentage, springApi, isMd);
    },
  };
}
