import { gql } from '@apollo/client';
import client from '../apolloClient';
import { FormModel } from '../models/gravityForms/FormFieldModel';

const GET_FORM = gql`
  query GET_FORM($id: ID!) {
    gfForm(id: $id, idType: DATABASE_ID) {
      formId
      submitButton {
        text
        layoutGridColumnSpan
      }
      formFields {
        nodes {
          id
          type
          layoutGridColumnSpan
          layoutSpacerGridColumnSpan
          ... on EmailField {
            label
            isRequired
            placeholder
          }
          ... on TextField {
            label
            isRequired
            placeholder
            description
            cssClass
          }
          ... on TextAreaField {
            label
            isRequired
            placeholder
          }
        }
      }
    }
  }
`;

interface Input {
  id: number;
}

interface Response {
  gfForm: FormModel;
}

const getForm = async (input: Input) => {
  const { data } = await client.query<Response, Input>({
    query: GET_FORM,
    variables: input,
  });

  return data.gfForm;
};

export default getForm;
