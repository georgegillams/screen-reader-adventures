import Loadable from 'react-loadable';

const Loading = () => null;

const ConfettiCanvasLoadable = Loadable({
  loader: () => import('./ConfettiCanvas.js'),
  loading: Loading,
});

export default ConfettiCanvasLoadable;
