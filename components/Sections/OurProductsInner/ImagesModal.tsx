import {
  alpha,
  Box,
  Modal,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import { useState } from 'react';
import Button from '../../Buttons/Button';
import { GalleryModel } from '../../../utils/models/ImageModel';
import PlusIcon from '../../../assets/icons/Plus.svg';
import { ColorTheme } from '../../../utils/models/ColorTheme';
import getColorFromTheme from '../../../utils/getColorFromTheme';

const ABox = animated(Box);

const CloseIconWrapper = styled(Box)(() => ({
  top: 30,
  right: 20,
  position: 'absolute',
  display: 'flex',
  transform: 'rotate(45deg)',
  cursor: 'pointer',
}));

const ModalBackdrop = styled(animated.div)(({ theme }) => ({
  width: '100%',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: alpha(theme.palette.common.black, 0.4),
}));

interface Props {
  label: string;
  title: string;
  images: GalleryModel;
  colorTheme: ColorTheme;
}

export default function ImagesModal(props: Props) {
  const { label, title, images, colorTheme } = props;
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const { white } = theme.palette.common;

  const color = getColorFromTheme(colorTheme);

  const [spring, springApi] = useSpring(() => ({
    x: '100%',
    opacity: 0,
  }));

  const handleOpen = () => {
    setOpen(true);
    springApi.start({
      x: '0%',
      opacity: 1,
    });
  };

  const handleClose = () => {
    springApi.start({
      x: '100%',
      opacity: 0,
      onResolve: () => {
        setOpen(false);
      },
    });
  };

  return (
    <Box component="div" mt={2.75}>
      <Button onClick={handleOpen} label={label} variant={colorTheme} />

      <Modal open={open} hideBackdrop>
        <>
          <ModalBackdrop
            onClick={handleClose}
            style={{ opacity: spring.opacity }}
          />

          <ABox
            component="div"
            bgcolor={white}
            position="absolute"
            right="0"
            top="0"
            width={{ xs: '100%', md: '30%' }}
            height="100%"
            style={{ x: spring.x }}
            px={2}
            pt={11.25}
            pb={6.25}
            sx={{
              overflow: 'auto',
            }}
          >
            <CloseIconWrapper onClick={handleClose} color={color}>
              <PlusIcon width="23px" height="23px" />
            </CloseIconWrapper>
            <Stack rowGap={3.75}>
              <Typography color={color} variant="h6">
                {title}
              </Typography>
              {images.nodes.map((image) => (
                <Box component="div" width="100%" position="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.sourceUrl}
                    alt={image.altText}
                    style={{ width: '100%' }}
                  />
                </Box>
              ))}
            </Stack>
          </ABox>
        </>
      </Modal>
    </Box>
  );
}
