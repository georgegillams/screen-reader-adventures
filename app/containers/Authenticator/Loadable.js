import Loadable from 'react-loadable';
import { LoadingIndicator } from 'gg-components/LoadingIndicator';

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator,
});
