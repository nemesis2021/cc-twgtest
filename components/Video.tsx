import {
  BoxProps,
  Box,
  styled,
  alpha,
  CircularProgress,
  useTheme,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { animated, useInView, useSpring } from '@react-spring/web';
import { BORDER_RADIUS_SM } from '../utils/styleGlobals';
import useGetHoverState from '../utils/hooks/useGetHoverState';
import { ImageModel } from '../utils/models/ImageModel';
import AnimatedImage from './AnimatedImage';

import PlayIcon from '../assets/icons/Play.svg';

const ReactPlayer = dynamic(() => import('react-player'), {
  ssr: false,
});

const AnimatedPlayIcon = animated(PlayIcon);

const Root = styled(animated(Box))(() => ({
  position: 'relative',
  cursor: 'pointer',
  overflow: 'hidden',
}));

const StyledReactPlayer = styled(ReactPlayer)(() => ({
  '& video': {
    objectFit: 'cover',
  },
}));

const Overlay = styled(animated(Box))(({ theme }) => ({
  backgroundColor: alpha(theme.palette.common.black, 0.8),
  color: theme.palette.common.black,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

interface VideoModel {
  url: string;
}
interface Props extends BoxProps {
  video: VideoModel;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  fallbackImage?: ImageModel;
  thumbnail?: string;
  controls?: boolean;
  hasPlayIcon?: boolean;
  zoom?: number;
}

export default function Video(props: Props) {
  const {
    autoPlay,
    video,
    loop = false,
    width = '100%',
    height = '100%',
    muted,
    zoom,
    fallbackImage,
    thumbnail,
    controls = true,
    ...restProps
  } = props;

  const theme = useTheme();

  const { primaryGreen, white } = theme.palette.common;

  const [ref, inView] = useInView();
  const [playing, setPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const { url } = video;

  const spring = useSpring({
    opacity: playing ? 0 : 1,
  });

  useEffect(() => {
    if (autoPlay) setPlaying(true);
  }, [autoPlay]);

  // AutoPlay pause if not in view
  useEffect(() => {
    if (autoPlay && inView) {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, [autoPlay, inView]);

  const { isHovering, hoverBind } = useGetHoverState();

  const videoSpring = useSpring({
    scale: isHovering && !playing ? 0.95 : 1,
    opacity: isHovering && !playing ? 0.87 : 1,
  });

  const playIconSpring = useSpring({
    scale: isHovering && !playing ? 0.8 : 1,
  });

  const fallbackImageComponent = (
    <Box
      component="div"
      width="100%"
      height="100%"
      position="absolute"
      top="0"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color={white}
    >
      <AnimatedPlayIcon
        width={58}
        height={58}
        style={{ zIndex: 2, ...playIconSpring }}
      />

      <AnimatedImage
        src={fallbackImage?.node.sourceUrl}
        alt={fallbackImage?.node.altText}
        sizes="100vw"
        zoom={zoom}
      />
    </Box>
  );

  // This component will appear if autoplay is enabled and no fallback image is provided.
  const fallbackLoadingComponent = (
    <Box
      component="div"
      width="100%"
      height="100%"
      position="absolute"
      top={0}
      display="flex"
      justifyContent="center"
      alignItems="center"
      textAlign="center"
    >
      <Box component="div" color={primaryGreen}>
        <CircularProgress sx={{ color: primaryGreen }} />
        <Typography mt={2}>Loading video...</Typography>
      </Box>
    </Box>
  );

  return (
    <Root
      ref={ref}
      width={width}
      height={height}
      borderRadius={BORDER_RADIUS_SM}
      {...hoverBind()}
      style={videoSpring}
      {...restProps}
    >
      {playing && (
        <StyledReactPlayer
          playsinline
          controls={controls}
          url={url}
          height="100%"
          width="100%"
          playing={playing}
          loop={loop}
          muted={muted}
          onReady={() => setIsReady(true)}
          config={{
            file: {
              attributes: {
                poster: thumbnail,
              },
            },
          }}
        />
      )}

      {autoPlay && !isReady && fallbackImage && fallbackImageComponent}
      {autoPlay && !isReady && !fallbackImage && fallbackLoadingComponent}
      {!autoPlay && (
        <Overlay
          style={spring}
          onClick={() => setPlaying(!playing)}
          sx={{ pointerEvents: playing ? 'none' : 'auto' }}
        >
          {fallbackImageComponent}
        </Overlay>
      )}
    </Root>
  );
}
