import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';
import SettingsMacos from 'containers/SettingsMacos/Loadable';
import SetupMacos from 'containers/SetupMacos/Loadable';
import AccountPage from 'containers/Account/Loadable';
import AdminPage from 'containers/Admin';
import AdminNotifications from 'containers/AdminNotifications/Loadable';
import Authenticator from 'containers/Authenticator';
import Analytics from 'containers/Analytics';
import EmailVerificationPage from 'containers/EmailVerification/Loadable';
import { SRFooter } from 'components/Footer';
import HomePageSR from 'containers/HomePageSR/Loadable';
import Level1 from 'containers/Level1/Loadable';
import Level2 from 'containers/Level2/Loadable';
import Level3 from 'containers/Level3/Loadable';
import Level4 from 'containers/Level4/Loadable';
import Level5 from 'containers/Level5/Loadable';
import LoginPage from 'containers/Login/Loadable';
import Konami from 'containers/Konami';
import StatusPage from 'containers/Status/Loadable';
import DebugPage from 'containers/Debug/Loadable';
import ScrollToTop from 'components/ScrollToTop';
import PageContainer from 'containers/PageContainer';
import MagicLoginPage from 'containers/MagicLogin/Loadable';
import NavigationBarWrapper from 'containers/NavigationBarWrapperSR';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import EndOfGame from 'containers/EndOfGame/Loadable';
import NotificationCenter from 'containers/NotificationCenter';
import RequestStatusWrapper from 'containers/RequestStatusWrapper';
import SiteMap from 'containers/SiteMap/Loadable';
import { Redirect } from 'gg-components/Redirect';
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
  if (
    window &&
    window.location &&
    HelperFunctions.includes(window.location.toString(), '?')
  ) {
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
      <ScrollToTop />
      <RequestStatusWrapper />
      <NavigationBarWrapper />
      <PageContainer id="mainScrollView">
        <Analytics />
        <Authenticator />
        <NotificationCenter />
        <Konami />
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
          <Route exact path="/Level/3" component={Level3} />
          <Route exact path="/Level/4" component={Level4} />
          <Route exact path="/Level/5" component={Level5} />
          <Route exact path="/Level/6" component={EndOfGame} />
          <Route exact path="/settings/macOS" component={SettingsMacos} />
          <Route exact path="/setup/macOS" component={SetupMacos} />
          <Route path="/status" component={StatusPage} />
          <Route path="/debug" component={DebugPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </PageContainer>
    </div>
    <SRFooter />
  </div>
);

export default App;
