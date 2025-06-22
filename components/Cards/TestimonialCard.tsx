import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { animated, useSpring } from '@react-spring/web';
import { TestimonialCardModel } from '../../utils/models/cards/TestimonialCardModel';
import AnimatedImage from '../AnimatedImage';
import useGetHoverState from '../../utils/hooks/useGetHoverState';
import { BORDER_RADIUS } from '../../utils/styleGlobals';

const AStack = animated(Stack);

interface Props {
  data: TestimonialCardModel;
  rotation?: number;
}

export default function TestimonialCard(props: Props) {
  const { data, rotation = 0 } = props;
  const { title, name, image, body, verifiedBuyer } = data;

  const theme = useTheme();
  const { md } = theme.breakpoints.values;
  const { cementGrey, primaryGreen, white } = theme.palette.common;
  const isTablet = useMediaQuery(theme.breakpoints.up(md));

  const { isHovering, hoverBind } = useGetHoverState();

  const spring = useSpring({
    transform: isHovering ? 'rotate(0deg)' : `rotate(${rotation}deg)`,
    x: isTablet ? 0 : -20,
  });

  return (
    <AStack
      {...hoverBind()}
      style={spring}
      textAlign="center"
      alignItems="center"
      borderRadius={BORDER_RADIUS}
      py={5}
      px={3.75}
      width={{
        xs: '100%',
        sm: 500,
        md: 500,
        lg: 500,
        xl: 600,
        xxl: 650,
        xxxl: 700,
      }}
      bgcolor={white}
      boxShadow="0px 8px 16px 0px rgba(0, 0, 0, 0.07)"
    >
      <Box
        component="div"
        position="relative"
        borderRadius="100%"
        width={153}
        height={153}
        overflow="hidden"
        mb={4}
      >
        <AnimatedImage
          width="100%"
          src={image?.node.sourceUrl || ''}
          sizes={`(max-width: ${md}px) 60vw, 22vw`}
        />
      </Box>
      <Stack gap={{ xs: 1, md: 1.5, xl: 1.8 }}>
        {title && (
          <Typography variant="h5" color={primaryGreen} component="p">
            {title}
          </Typography>
        )}
        {body && (
          <Typography variant="body1" color={cementGrey} fontWeight="bold">
            {body}
          </Typography>
        )}
        <div>
          {name && (
            <Typography
              variant="body1"
              component="p"
              color={cementGrey}
              fontWeight="bold"
            >
              {name}
            </Typography>
          )}

          {verifiedBuyer && (
            <Typography variant="body2" color={cementGrey}>
              Verified Buyer
            </Typography>
          )}
        </div>
      </Stack>
    </AStack>
  );
}
