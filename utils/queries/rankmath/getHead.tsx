import { gql } from '@apollo/client';
import client from '../../apolloClient';
import { HeadModel } from '../../models/rankmath/HeadModel';

const REPLACE_TERMS = ['canonical', 'og:url'];

const GET_HEAD = gql`
  query GET_HEAD($url: String!) {
    head(url: $url) {
      html
    }
  }
`;

interface Input {
  url: string;
}

interface Response {
  head: HeadModel;
}

const getHead = async (
  input: Input,
  replace: { searchValue: string; replaceValue: string } = {
    searchValue: 'cms.',
    replaceValue: '',
  },
) => {
  const { data } = await client.query<Response, Input>({
    query: GET_HEAD,
    variables: input,
  });

  const lines = data.head.html.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let found = false;
    for (let j = 0; j < REPLACE_TERMS.length; j++) {
      if (line.includes(REPLACE_TERMS[j])) {
        found = true;
        break;
      }
    }

    if (found) {
      lines[i] = line.replace(replace.searchValue, replace.replaceValue);
    }
  }
  data.head.html = lines.join('\n');

  return data.head;
};

export default getHead;
