import { Dispatch, SetStateAction } from 'react';
import { Canvas as R3FCanvas } from '@react-three/fiber';
import { View } from '@react-three/drei';

interface Props {
  setCanvasReady: Dispatch<SetStateAction<boolean>>;
}

export default function HomePageScene(props: Props) {
  const { setCanvasReady } = props;

  return (
    <R3FCanvas
      shadows
      gl={{ antialias: true, alpha: true }}
      style={{
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        position: 'fixed',
        top: 0,
        zIndex: 1,
      }}
      onCreated={() => setCanvasReady(true)}
    >
      <View.Port />
    </R3FCanvas>
  );
}
