import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { FormInputModel } from '../../models/gravityForms/FormInputModel';

const SUBMIT_FORM = gql`
  mutation SUBMIT_FORM($id: ID!, $fieldValues: [FormFieldValuesInput!]!) {
    submitGfForm(input: { id: $id, fieldValues: $fieldValues }) {
      errors {
        message
      }
      confirmation {
        message
      }
    }
  }
`;

interface Response {
  submitGfForm: {
    errors: [
      {
        message: string;
      },
    ];
    confirmation: {
      message: string;
    };
  };
}

interface Input {
  id: number;
  fieldValues: FormInputModel[];
}

const useForm = () => {
  const [error, setError] = React.useState<string | undefined>();
  const [mutate, { data, loading }] = useMutation<Response, Input>(
    SUBMIT_FORM,
    {
      onError: (e) => {
        setError(e.message);
      },
    },
  );

  React.useEffect(() => {
    if (data?.submitGfForm.errors) {
      setError(data.submitGfForm.errors[0].message);
    }
  }, [data]);

  const submitForm = (input: Input) => {
    setError(undefined);
    mutate({ variables: input });
  };

  return {
    loading,
    data,
    error,
    submitForm,
  };
};

export default useForm;
