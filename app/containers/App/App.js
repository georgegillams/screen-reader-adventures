import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import SetupIos from 'containers/SetupIos/Loadable';
import SetupMacos from 'containers/SetupMacos/Loadable';
import SetupAndroid from 'containers/SetupAndroid/Loadable';
import AccountPage from 'containers/Account/Loadable';
import AdminPage from 'containers/Admin';
import AdminBlogs from 'containers/AdminBlogs/Loadable';
import AdminNotifications from 'containers/AdminNotifications/Loadable';
import GrammarML from 'containers/GrammarML/Loadable';
import AdminBlogEdit from 'containers/AdminBlogEdit/Loadable';
import AdminUsersPage from 'containers/AdminUsers/Loadable';
import AdminMonzo from 'containers/AdminMonzo/Loadable';
import Authenticator from 'containers/Authenticator';
import BlogViewer from 'containers/BlogViewer/Loadable';
import BlogsPage from 'containers/Blogs/Loadable';
import ContactPage from 'containers/ContactGG/Loadable';
import EmailVerificationPage from 'containers/EmailVerification/Loadable';
import { SRFooter } from 'components/Footer';
import GtsPage from 'containers/GeorgeTrackingSystem/Loadable';
import HomePageSR from 'containers/HomePageSR/Loadable';
import Level1 from 'containers/Level1/Loadable';
import Level2 from 'containers/Level2/Loadable';
import LoginPage from 'containers/Login/Loadable';
import MagicLoginPage from 'containers/MagicLogin/Loadable';
import NavigationBarWrapper from 'containers/NavigationBarWrapperSR';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import EndOfGame from 'containers/EndOfGame/Loadable';
import NotificationCenter from 'containers/NotificationCenter';
import PaymentsPage from 'containers/Payments/Loadable';
import Photography from 'containers/Photography';
import RequestStatusWrapper from 'containers/RequestStatusWrapper';
import SignUpPage from 'containers/SignUpGG/Loadable';
import SiteMap from 'containers/SiteMap/Loadable';
import Work from 'containers/Work/Loadable';
import AboutDegree from 'containers/AboutDegree/Loadable';
import BpkDemoPage from 'containers/BpkDemoPage/Loadable';
import MonzoPots from 'containers/MonzoPots/Loadable';
import Redirect from 'components/Redirect';
import PasswordCharacterExtractor from 'containers/PasswordCharacterExtractor/Loadable';
import { SITE_URL } from 'helpers/constants';
import redirects from 'helpers/redirects';
import STYLES from './style.scss';
import { cssModules } from 'bpk-react-utils';
const getClassName = cssModules(STYLES); // REGEX_REPLACED

const cleanWindowLocation = location => {
  let result = location;
  result = location.split('http://localhost:3000')[1];
  result = location.split(SITE_URL)[1];
  return result;
};

const getFullRedirect = destination => {
  if (window && window.location && window.location.toString().includes('?')) {
    const fullPath = cleanWindowLocation(window.location.toString());
    for (let i = 0; i < redirects.length; i += 1) {
      if (redirects[i].from === fullPath) {
        return redirects[i].to;
      }
    }
  }
  return destination;
};

const App = () => (
  <div className={getClassName('app-wrapper')} id="app-wrapper">
    <div className={getClassName('app-wrapper--inner')}>
      <Helmet
        titleTemplate="%s - Screen Reader Adventures"
        defaultTitle="Screen Reader Adventures"
      >
        <meta
          name="description"
          content="Screen Reader Adventures - learn to use a screen reader the fun way"
        />
      </Helmet>
      <RequestStatusWrapper />
      <NavigationBarWrapper />
      <Authenticator />
      <NotificationCenter />
      <Switch>
        {redirects.map(red => (
          <Route
            exact
            key={red.from}
            path={red.from}
            render={() => <Redirect to={getFullRedirect(red.to)} />}
            status={301}
          />
        ))}

        <Route exact path="/" component={HomePageSR} />
        <Route exact path="/Level/1" component={Level1} />
        <Route exact path="/Level/2" component={Level2} />
        <Route exact path="/Level/3" component={EndOfGame} />
        <Route exact path="/setup/iOS" component={SetupIos} />
        <Route exact path="/setup/macOS" component={SetupMacos} />
        <Route exact path="/setup/Android" component={SetupAndroid} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </div>
    <SRFooter />
  </div>
);

export default App;
