import React, { useEffect, useState } from 'react';
import { useGLTF, Center } from '@react-three/drei';
import { GroupProps, MeshProps, useLoader } from '@react-three/fiber';
import { RepeatWrapping } from 'three';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import {
  useSpring,
  config,
  animated,
  useTransition,
} from '@react-spring/three';
import { ImageModel } from '../../utils/models/ImageModel';
import getOptimizedImageUrl from '../../utils/getOptimizedImageUrl';

const ACenter = animated(Center);

interface Props extends GroupProps {
  reverseRotation?: boolean;
  rotateOnWrapperChange?: boolean;
  wrapper: ImageModel;
}

export default function Can(props: Props) {
  const {
    reverseRotation,
    wrapper,
    rotateOnWrapperChange = true,
    ...restProps
  } = props;

  const gltfPath = '/gltfs/can.gltf';

  const { nodes } = useGLTF(gltfPath);

  const canWrapper = useLoader(
    TextureLoader,
    getOptimizedImageUrl(wrapper.node.sourceUrl),
  );
  canWrapper.flipY = false;
  canWrapper.wrapS = RepeatWrapping;

  const lidNode = nodes.Lid as MeshProps;
  const wrapperNode = nodes.Can as MeshProps;
  const bottomNode = nodes.Bottom as MeshProps;

  const [rotations, setRotations] = useState(0);

  const spring = useSpring({
    rotation: [0, Math.PI * 2 * rotations * (reverseRotation ? -1 : 1), 0],
    config: config.slow,
  });

  const transitions = useTransition(canWrapper, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  useEffect(() => {
    if (rotateOnWrapperChange) {
      setRotations((prev) => prev + 1);
    }
  }, [canWrapper, rotateOnWrapperChange]);

  return (
    <Center {...restProps}>
      <ACenter rotation={spring.rotation as any}>
        <mesh {...lidNode}>
          <meshStandardMaterial color="#3aa834" metalness={2} roughness={0.5} />
        </mesh>
        <mesh
          geometry={wrapperNode.geometry}
          material={wrapperNode.material}
          castShadow
          receiveShadow
          position={wrapperNode.position}
          scale={wrapperNode.scale}
          rotation={wrapperNode.rotation}
        />
        <mesh {...bottomNode}>
          <meshStandardMaterial
            color="#c8c8c8"
            metalness={1.4}
            roughness={0.1}
          />
        </mesh>

        {transitions((style, v) => (
          <mesh
            geometry={wrapperNode.geometry}
            material={wrapperNode.material}
            castShadow
            receiveShadow
            position={wrapperNode.position}
            scale={wrapperNode.scale}
            rotation={wrapperNode.rotation}
          >
            <animated.meshStandardMaterial
              map={v}
              transparent
              opacity={style.opacity}
              metalness={1.1}
              roughness={1.5}
            />
          </mesh>
        ))}
      </ACenter>
    </Center>
  );
}
