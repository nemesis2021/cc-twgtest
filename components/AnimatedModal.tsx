import { styled, Modal, BoxProps, Box, useTheme, alpha } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import React from 'react';
import CloseIcon from '../assets/icons/Plus.svg';

const ModalBackdrop = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100vh',
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: alpha(theme.palette.common.black, 0.4),
}));

const ModalContentWrapper = styled('div')(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  pointerEvents: 'none',
}));

const ModalContent = styled(Box)(({ theme }) => ({
  position: 'relative',
  pointerEvents: 'auto',
  backgroundColor: theme.palette.common.white,
  overflowY: 'auto',
  width: '100%',
}));

interface Props {
  open: boolean;
  handleClose: () => void;
  backdropContent?: React.ReactNode;
  contentProps?: BoxProps;
  backdropEvent?: boolean;
}

export default function AnimatedModal(props: React.PropsWithChildren<Props>) {
  const {
    open,
    handleClose,
    backdropContent,
    contentProps,
    backdropEvent = true,
    children,
  } = props;

  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalVisible, setModalVisible] = React.useState(false);

  const theme = useTheme();
  const { cementGrey } = theme.palette.common;

  const [spring] = useSpring(
    {
      opacity: modalVisible ? 1 : 0,
      onResolve: () => {
        setModalOpen(modalVisible);
      },
    },
    [modalVisible],
  );

  React.useEffect(() => {
    if (open) {
      setModalOpen(true);
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [open]);

  const Root = animated(Modal);

  return (
    <Root style={spring} open={modalOpen} hideBackdrop>
      <>
        <ModalBackdrop
          onClick={() => {
            if (backdropEvent) {
              handleClose();
            }
          }}
        >
          {backdropContent}
        </ModalBackdrop>

        <ModalContentWrapper>
          <ModalContent
            px={{ xs: 2.5, md: 6.25 }}
            py={{ xs: 5, md: 8 }}
            width={{ xs: '95%', lg: '60%', xl: '47%', xxl: '44%' }}
            maxHeight={{ xs: '85dvh' }}
            {...contentProps}
          >
            <Box
              component="div"
              onClick={handleClose}
              position="absolute"
              top={12}
              right={12}
              sx={{
                cursor: 'pointer',
                transform: 'rotate(45deg)',
              }}
              zIndex={2}
            >
              <CloseIcon width={32} height={32} style={{ color: cementGrey }} />
            </Box>
            {children}
          </ModalContent>
        </ModalContentWrapper>
      </>
    </Root>
  );
}
