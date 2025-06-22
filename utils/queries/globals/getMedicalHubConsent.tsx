import { gql } from '@apollo/client';
import client from '../../apolloClient';
import MEDICAL_HUB_CONSENT_GQL from '../../gqls/medicalHubConsentGql';
import { MedicalHubPageConsentModel } from '../../models/MedicalHubPageConsentModel';

export const GET_MEDICAL_HUB_CONSENT = gql`
  query GET_BLOG_POSTS_SECTION {
    globals {
      globalContent {
        medicalHubConsent {
         ${MEDICAL_HUB_CONSENT_GQL}
        }
      }
    }
  }
`;

interface Response {
  globals: {
    globalContent: { medicalHubConsent: MedicalHubPageConsentModel };
  };
}

const getMedicalHubConsent = async () => {
  const { data } = await client.query<Response>({
    query: GET_MEDICAL_HUB_CONSENT,
  });
  return data.globals.globalContent.medicalHubConsent;
};

export default getMedicalHubConsent;
