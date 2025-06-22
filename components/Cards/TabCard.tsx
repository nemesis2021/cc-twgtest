import { Box, Typography, useTheme } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { TabModel } from '../../utils/models/sections/TabContentSectionModel';
import useGetHoverState from '../../utils/hooks/useGetHoverState';

const ABox = animated(Box);

interface TabMenuItemProps {
  data: TabModel;
  onClick: () => void;
  tabIndex: number;
  selected: number;
  setActiveCoords: Dispatch<SetStateAction<{ x: number; w: number }>>;
}

export default function TabCard(props: TabMenuItemProps) {
  const { data, onClick, tabIndex, selected, setActiveCoords } = props;
  const { label } = data;
  const tabRef = useRef<HTMLDivElement>(null);

  const theme = useTheme();
  const { primaryGreen, greenTeaGreen } = theme.palette.common;

  const { isHovering, hoverBind } = useGetHoverState();

  const colorSpring = useSpring({
    color: tabIndex === selected || isHovering ? primaryGreen : greenTeaGreen,
  });

  useEffect(() => {
    let handleResize: () => void;

    if (tabIndex === selected && tabRef.current) {
      handleResize = () => {
        const newCoords = {
          x: tabRef.current?.offsetLeft ?? 0,
          w: tabRef.current?.offsetWidth ?? 0,
        };
        setActiveCoords(newCoords);
      };

      handleResize();

      if (typeof window !== 'undefined') {
        window.addEventListener('resize', handleResize);
      }
    }

    return () => window.removeEventListener('resize', handleResize);
  }, [tabRef, setActiveCoords, selected, tabIndex]);

  return (
    <ABox
      component="div"
      role="button"
      py={3}
      px={3.75}
      display="flex"
      alignItems="center"
      sx={{ cursor: 'pointer' }}
      onClick={onClick}
      ref={tabRef}
      style={colorSpring}
      maxWidth={{ xs: 230, md: 'initial' }}
      zIndex={2}
      {...hoverBind()}
    >
      <Typography
        variant="button"
        sx={{
          textTransform: 'unset',
          textDecoration: tabIndex === selected ? 'underline' : 'none',
        }}
      >
        {label}
      </Typography>
    </ABox>
  );
}
