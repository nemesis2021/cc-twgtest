import { VectorArray } from '../utils';

export interface POSITION_MODEL {
  xs: VectorArray;
  md: VectorArray;
  lg: VectorArray;
  xl: VectorArray;
}

const POSITION_MOBILE: VectorArray = [
  [[0, 5, -1]],
  [[0, -3, 0]],
  [[0, -6, -10]],
];

const POSITION_LEFT_MD: VectorArray = [
  [
    [9, -1.5, 0],
    [0, -2, 0],
  ],
  [
    [0, -1, 0],
    [0, -5, 0.5],
  ],
  [
    [-4.1, -6.4, 0.5],
    [-4.1, -6.4, 0.2],
  ],
];

const POSITION_LEFT_LG: VectorArray = [
  [
    [9, -1.5, 0],
    [0, -2, 0],
  ],
  [
    [-2, -1, 0],
    [-5, -5, 0.5],
  ],
  [
    [-5, -6.4, 0.5],
    [-5, -6.4, 0.2],
  ],
];

const POSITION_LEFT_XL: VectorArray = [
  [
    [9, -1.5, 0],
    [0, -2, 0],
  ],
  [
    [0, -1, 0],
    [-5, -5, 0.5],
  ],
  [
    [-5.5, -6.4, 0.5],
    [-5.5, -6.4, 0.2],
  ],
];

export const POSITION_LEFT: POSITION_MODEL = {
  xs: POSITION_MOBILE,
  md: POSITION_LEFT_MD,
  lg: POSITION_LEFT_LG,
  xl: POSITION_LEFT_XL,
};

const POSITION_CENTER_DESKTOP: VectorArray = [
  [
    [9, -1.5, 0],
    [0, -2, 0],
  ],
  [
    [0, -1, 0],
    [0, -5, 0.5],
  ],
  [
    [0, -6.4, 0.5],
    [0, -6.4, 0.2],
  ],
];

export const POSITION_CENTER: POSITION_MODEL = {
  xs: POSITION_MOBILE,
  md: POSITION_CENTER_DESKTOP,
  lg: POSITION_CENTER_DESKTOP,
  xl: POSITION_CENTER_DESKTOP,
};

// unused
// const POSITION_RIGHT_MD: VectorArray = [
//   [
//     [9, -1.5, 0],
//     [0, -2, 0],
//   ],
//   [
//     [0, -1, 0],
//     [0, -5, 0.5],
//   ],
//   [
//     [3.9, -6.4, 0.5],
//     [3.9, -6.4, 0.2],
//   ],
// ];

// const POSITION_RIGHT_LG: VectorArray = [
//   [
//     [9, -1.5, 0],
//     [0, -2, 0],
//   ],
//   [
//     [0, -1, 0],
//     [0, -5, 0.5],
//   ],
//   [
//     [4.7, -6.4, 0.5],
//     [4.7, -6.4, 0.2],
//   ],
// ];

// export const POSITION_RIGHT: POSITION_MODEL = {
//   xs: POSITION_MOBILE,
//   md: POSITION_RIGHT_MD,
//   lg: POSITION_RIGHT_LG,
// };
