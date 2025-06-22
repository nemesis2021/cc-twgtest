import { useEffect, useState } from 'react';
import { animated, useSpring } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { clamp } from 'three/src/math/MathUtils';
import {
  alpha,
  Box,
  Stack,
  styled,
  useMediaQuery,
  useScrollTrigger,
  useTheme,
} from '@mui/material';
import { TabContentSectionModel } from '../../utils/models/sections/TabContentSectionModel';
import TabContent from './TabContent';
import ContentContainer from '../ContentContainer';
import AnimationTransitionFade from '../Animation/AnimationTransitionFade';
import AnimatedResponsiveContainer from '../Animation/AnimatedResponsiveContainer';
import {
  MAX_WIDTH_SECTION,
  NAV_HEIGHT_MD,
  NAV_HEIGHT_XS,
  SECTIONAL_GAP,
} from '../../utils/styleGlobals';
import ParallaxContainer from '../Animation/Parallax/ParallaxContainer';
import useResizeObserver from '../../utils/hooks/useResizeObserver';
import TabCard from '../Cards/TabCard';

const ABox = animated(Box);
const AStack = animated(Stack);

const StyledAnimatedResponsiveContainer = styled(AnimatedResponsiveContainer)(
  ({ theme }) => ({
    backgroundColor: theme.palette.common.white,
    borderRadius: '0px 0px 30px 30px',
    boxShadow: `0px 4px 10px 0px ${alpha(theme.palette.common.black, 0.15)}`,
  }),
);

const TabMenu = styled(AStack)(({ theme }) => ({
  borderRadius: '30px 30px 0px 0px',
  overflow: 'hidden',
  backgroundColor: theme.palette.common.dirtyWhite,
}));

interface Props {
  data: TabContentSectionModel;
}

export default function TabContentSection(props: Props) {
  const { data } = props;
  const [selected, setSelected] = useState(0);
  const [isReverted, setIsReverted] = useState(true);
  const { ref, clientHeight, clientWidth } = useResizeObserver();
  const {
    ref: tabMenuRef,
    clientHeight: tabMenuHeight,
    clientWidth: tabMenuWidth,
  } = useResizeObserver();
  const scrollTrigger = useScrollTrigger();

  const { tabs } = data;

  const [tabConfig, setTabConfig] = useState<{ w: number; x: number }>({
    x: 0,
    w: 0,
  });

  const theme = useTheme();
  const { black, white } = theme.palette.common;
  const isLg = useMediaQuery(theme.breakpoints.up('lg'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const spring = useSpring({
    x: tabConfig.x,
    width: tabConfig.w,
    borderRadius: isReverted ? '30px 30px 0px 0px' : '30px 30px 30px 30px',
  });

  const [xSpring, xSpringApi] = useSpring(() => ({
    x: 0,
  }));

  const tabMenuSpring = useSpring({
    boxShadow: isReverted
      ? `0px 4px 10px 0px ${alpha(black, 0)}`
      : `0px 4px 10px 0px ${alpha(black, 0.15)}`,
    borderRadius: isReverted ? '30px 30px 0px 0px' : '30px 30px 30px 30px',
  });

  const dragBind = useDrag(
    ({ offset: [ox] }) => {
      if (isMobile) {
        xSpringApi.start({
          x: ox,
        });
      }
    },
    {
      from: () => [xSpring.x.get(), 0],
      filterTaps: true,
      bounds: {
        left: clientWidth - tabMenuWidth - 5 * 8,
        right: 0,
      },
    },
  );

  useEffect(() => {
    if (typeof window === 'undefined') {
      return () => {};
    }

    const handleResize = () => {
      xSpringApi.start({
        x: 0,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [xSpringApi]);

  useEffect(() => {
    if (isMobile) {
      const center = -tabConfig.x + tabConfig.w / 2;
      const max = clientWidth - tabMenuWidth - 5 * 8;

      xSpringApi.start({
        x: clamp(center, max, 0),
      });
    }
  }, [tabConfig, xSpringApi, isMobile, clientWidth, tabMenuWidth]);

  const handleSelectTab = (index: number) => {
    if (typeof window !== 'undefined' && ref.current) {
      const offset = isMobile ? NAV_HEIGHT_XS : NAV_HEIGHT_MD;
      const spacingOffset = isMobile ? 50 : 10;

      window.scrollTo({
        top: ref.current.offsetTop - offset - tabMenuHeight - spacingOffset,
      });

      setSelected(index);
    }
  };

  return (
    <ContentContainer
      my={SECTIONAL_GAP}
      maxWidth={{ lg: 1200, xl: 1300, xxl: 1400, xxxl: 1600 }}
      overflow="hidden"
      ref={ref}
      pb={2}
    >
      <ParallaxContainer
        sticky={{
          start: 0,
          end: clientHeight - tabMenuHeight,
          isRevertedCallback: (y) => {
            if (y === 0) {
              setIsReverted(true);
            } else {
              setIsReverted(false);
            }
          },
        }}
        offset={
          isLg && scrollTrigger
            ? -40
            : -(isLg ? NAV_HEIGHT_MD : NAV_HEIGHT_XS) * 8
        }
        sx={{ zIndex: 1, position: 'relative' }}
      >
        <ABox
          component="div"
          overflow="hidden"
          position="relative"
          sx={{ borderRadius: '30px 30px 0px 0px', overflow: 'hidden' }}
          style={tabMenuSpring}
          {...dragBind()}
        >
          <TabMenu
            direction="row"
            bgcolor="red"
            position="sticky"
            ref={tabMenuRef}
            width={{ xs: 'max-content', md: '100%' }}
            style={{
              x: xSpring.x,
            }}
            textAlign="center"
          >
            {tabs.map((tab, index) => (
              <TabCard
                data={tab}
                onClick={() => handleSelectTab(index)}
                setActiveCoords={setTabConfig}
                tabIndex={index}
                selected={selected}
              />
            ))}
            <ABox
              component="div"
              bgcolor={white}
              position="absolute"
              width="200px"
              height="100%"
              zIndex={1}
              style={spring}
              boxShadow={`3px 3px 10px 0px ${alpha(black, 0.05)}`}
            />
          </TabMenu>
        </ABox>
      </ParallaxContainer>

      <StyledAnimatedResponsiveContainer>
        <AnimationTransitionFade
          index={selected}
          elements={tabs.map((tab) => (
            <Stack
              component="div"
              px={6.25}
              pt={12.25}
              pb={6.25}
              rowGap={{ xs: 4.25, md: 6.25 }}
              mx="auto"
              maxWidth={MAX_WIDTH_SECTION}
            >
              {tab.content?.map((tabContent) => (
                <TabContent data={tabContent} />
              ))}
            </Stack>
          ))}
        />
      </StyledAnimatedResponsiveContainer>
    </ContentContainer>
  );
}
