import Loadable from 'react-loadable';

const Loading = () => null;

const NotificationLoadable = Loadable({
  loader: () => import('gg-components/Notification/Notification.js'),
  loading: Loading,
});

export default NotificationLoadable;
