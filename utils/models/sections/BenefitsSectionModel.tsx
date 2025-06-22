import { ImageModel } from '../ImageModel';

export interface BenefitModel {
  image: ImageModel;
  title: string;
  description: string;
}

export interface BenefitsSectionModel {
  benefitOne: BenefitModel;
  benefitTwo: BenefitModel;
  benefitThree: BenefitModel;
  benefitFour: BenefitModel;
  productImage?: ImageModel;
}
