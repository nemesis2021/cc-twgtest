import { animated, SpringRef, config, useSpring } from '@react-spring/three';
import { Float } from '@react-three/drei';
import { useEffect } from 'react';
import {
  Vector,
  VectorArray,
  calculateVector,
  getFromAndToVector,
  getStepPercentage,
} from '../utils';
import Can from '../Can';
import { ImageModel } from '../../../utils/models/ImageModel';

const ACan = animated(Can);

// These are arrays of positions to transitions through per section
// Each section may have multiple animation steps
// Note: rotation and position arrays must have the same number of elements
const POSITIONS: VectorArray = [
  [
    [0, 0, 0],
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
  [[0, 0, 0]],
];

const POSITIONS_FIRST = POSITIONS[0][0];
const POSITIONS_LAST = POSITIONS[3][0];

const ROTATIONS: VectorArray = [
  [
    [0, 0, 0],
    [0, -Math.PI * 1, 0],
  ],
  [
    [0, -Math.PI * 2, 0],
    [0, -Math.PI * 3, 0],
  ],
  [
    [0, -Math.PI * 4, 0],
    [0, -Math.PI * 4, 0],
  ],
  [[0, -Math.PI * 5, 0]],
];

const ROTATIONS_FIRST = ROTATIONS[0][0];
const ROTATIONS_LAST = ROTATIONS[3][0];

const animate = (
  sectionNumber: number,
  percentage: number,
  springApi: SpringRef<{
    position: Vector;
    rotation: Vector;
    innerRotation: Vector;
  }>,
) => {
  const positions = POSITIONS;

  const currSectionSteps = positions[sectionNumber]?.length;
  const currSectionStep = Math.floor(percentage * currSectionSteps);

  const [positionFrom, positionTo] = getFromAndToVector(
    positions,
    sectionNumber,
    currSectionStep,
  );

  if (positionFrom && positionTo) {
    const rotations = ROTATIONS;
    const [rotationFrom, rotationTo] = getFromAndToVector(
      rotations,
      sectionNumber,
      currSectionStep,
    );

    const stepPercentage = getStepPercentage(currSectionSteps, percentage);
    const rotation = calculateVector(rotationFrom, rotationTo, stepPercentage);
    const position = calculateVector(positionFrom, positionTo, stepPercentage);

    const innerRotationY = 0;

    springApi.start({
      position,
      rotation,
      innerRotation: [0, innerRotationY, 0],
      config: config.slow,
    });
  } else if (sectionNumber >= ROTATIONS.length - 1) {
    // handle end position when outside section
    springApi.start({
      position: POSITIONS_LAST,
      rotation: ROTATIONS_LAST,
      innerRotation: [0, 0, 0],
      config: config.slow,
    });
    // } else {
    //   // handle start position when outside section
    //   springApi.start({
    //     position: POSITIONS_FIRST,
    //     rotation: ROTATIONS_FIRST,
    //     innerRotation: [0, 0, 0],
    //     config: config.slow,
    //   });
  }
};

interface Props {
  wrapper: ImageModel;
  canvasReady: boolean;
}

export default function useOurProductsCan(props: Props) {
  const { canvasReady, wrapper } = props;

  const [spring, springApi] = useSpring(() => ({
    position: POSITIONS_FIRST,
    rotation: ROTATIONS_FIRST,
    innerRotation: [0, 0, 0] as Vector,
    config: config.slow,
  }));

  useEffect(() => {
    if (!canvasReady) return;
    springApi.start({
      position: POSITIONS_FIRST,
      rotation: ROTATIONS_FIRST,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasReady, springApi]);

  return {
    element: (
      <animated.group
        position={spring.position}
        rotation={spring.rotation as any}
      >
        <Float speed={4} rotationIntensity={0.5} floatIntensity={2}>
          <ACan
            rotation={spring.innerRotation as any}
            wrapper={wrapper}
            rotateOnWrapperChange={false}
          />
        </Float>
      </animated.group>
    ),
    animate: (sectionNumber: number, percentage: number) => {
      animate(sectionNumber, percentage, springApi);
    },
  };
}
