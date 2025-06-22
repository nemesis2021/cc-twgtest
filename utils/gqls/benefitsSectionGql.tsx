import IMAGE_GQL from './imageGql';

const BENEFIT_GQL = `
  title
  description
  image {
    ${IMAGE_GQL}
  }
`;

const BENEFITS_SECTION_GQL = `
  benefitOne {
    ${BENEFIT_GQL}
  }
  benefitTwo {
    ${BENEFIT_GQL}
  }
  benefitThree {
    ${BENEFIT_GQL}
  }
  benefitFour {
    ${BENEFIT_GQL}
  }
  productImage {
    ${IMAGE_GQL}
  }
`;

export default BENEFITS_SECTION_GQL;
