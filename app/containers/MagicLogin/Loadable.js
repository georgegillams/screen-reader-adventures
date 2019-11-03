import Loadable from 'react-loadable';

import {LoadingIndicator} from 'gg-components/dist/LoadingIndicator';

export default Loadable({
  loader: () => import('./index'),
  loading: LoadingIndicator,
});
