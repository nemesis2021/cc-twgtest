import Head from 'next/head';
import parse from 'html-react-parser';
import { HeadModel } from '../utils/models/rankmath/HeadModel';

interface Props {
  head: HeadModel;
}

export default function MetaData(props: Props) {
  const { head } = props;
  return <Head>{parse(head?.html ?? '')}</Head>;
}
