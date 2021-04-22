import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'gg-components/Input';
import HelperFunctions from 'helpers/common/HelperFunctions';
import FORM_BUILDER_STYLES from 'gg-components/FormBuilder/forms.css';
import { cssModules } from 'gg-components/helpers/cssModules';

const getClassName = cssModules(FORM_BUILDER_STYLES);

const defaultFilters = {};

const filterAnalytics = (analytics, filters) => {
  let filteredAnalytics = analytics;
  if (filteredAnalytics && filteredAnalytics.filter) {
    if (filters.url) {
      filteredAnalytics = filteredAnalytics.filter(x => x.url && HelperFunctions.includes(x.url, filters.url));
    }
    if (filters.browser) {
      filteredAnalytics = filteredAnalytics.filter(
        x => x.browser && HelperFunctions.includes(x.browser, filters.browser)
      );
    }
    if (filters.browserVersion) {
      filteredAnalytics = filteredAnalytics.filter(
        x => x.browserVersion && HelperFunctions.includes(`${x.browser} ${x.browserVersion}`, filters.browserVersion)
      );
    }
    if (filters.utmSource) {
      filteredAnalytics = filteredAnalytics.filter(
        x => x.utmSource && HelperFunctions.includes(x.utmSource, filters.utmSource)
      );
    }
    if (filters.utmMedium) {
      filteredAnalytics = filteredAnalytics.filter(
        x => x.utmMedium && HelperFunctions.includes(x.utmMedium, filters.utmMedium)
      );
    }
    if (filters.os) {
      filteredAnalytics = filteredAnalytics.filter(x => x.os && HelperFunctions.includes(x.os, filters.os));
    }
    if (filters.ipAddressPrefix) {
      filteredAnalytics = filteredAnalytics.filter(
        x => x.ipAddressPrefix && HelperFunctions.includes(x.ipAddressPrefix, filters.ipAddressPrefix)
      );
    }
  }
  return filteredAnalytics;
};

const AnalyticsFilter = props => {
  const { filters, onFiltersChanged } = props;
  const { url, browser, browserVersion, utmSource, utmMedium, os, ipAddressPrefix } = filters;

  const onUrlFilterChanged = event => {
    onFiltersChanged({ ...filters, url: event.target.value });
  };

  const onBrowserFilterChanged = event => {
    onFiltersChanged({ ...filters, browser: event.target.value });
  };

  const onBrowserVersionFilterChanged = event => {
    onFiltersChanged({ ...filters, browserVersion: event.target.value });
  };

  const onUtmSourceFilterChanged = event => {
    onFiltersChanged({ ...filters, utmSource: event.target.value });
  };

  const onUtmMediumFilterChanged = event => {
    onFiltersChanged({ ...filters, utmMedium: event.target.value });
  };

  const onOsFilterChanged = event => {
    onFiltersChanged({ ...filters, os: event.target.value });
  };

  const onIpAddressPrefixFilterChanged = event => {
    onFiltersChanged({ ...filters, ipAddressPrefix: event.target.value });
  };

  return (
    <div>
      <label htmlFor="url" className={getClassName('forms__component__label')}>
        Filter by url
      </label>
      <Input id="url" value={url} onChange={onUrlFilterChanged} className={getClassName('forms__component')} />
      <label htmlFor="browser" className={getClassName('forms__component__label')}>
        Filter by browser
      </label>
      <Input
        id="browser"
        value={browser}
        onChange={onBrowserFilterChanged}
        className={getClassName('forms__component')}
      />
      <label htmlFor="browserVersion" className={getClassName('forms__component__label')}>
        Filter by browser version
      </label>
      <Input
        id="browserVersion"
        value={browserVersion}
        onChange={onBrowserVersionFilterChanged}
        className={getClassName('forms__component')}
      />
      <label htmlFor="utmSource" className={getClassName('forms__component__label')}>
        Filter by UTM_SOURCE
      </label>
      <Input
        id="utmSource"
        value={utmSource}
        onChange={onUtmSourceFilterChanged}
        className={getClassName('forms__component')}
      />
      <label htmlFor="utmMedium" className={getClassName('forms__component__label')}>
        Filter by UTM_MEDIUM
      </label>
      <Input
        id="utmMedium"
        value={utmMedium}
        onChange={onUtmMediumFilterChanged}
        className={getClassName('forms__component')}
      />
      <label htmlFor="os" className={getClassName('forms__component__label')}>
        Filter by OS
      </label>
      <Input id="os" value={os} onChange={onOsFilterChanged} className={getClassName('forms__component')} />
      <label htmlFor="ipAddressPrefix" className={getClassName('forms__component__label')}>
        Filter by IP address prefix
      </label>
      <Input
        id="ipAddressPrefix"
        value={ipAddressPrefix}
        onChange={onIpAddressPrefixFilterChanged}
        className={getClassName('forms__component')}
      />
    </div>
  );
};

AnalyticsFilter.propTypes = {
  filters: PropTypes.object.isRequired,
  onFiltersChanged: PropTypes.func.isRequired,
};

export default AnalyticsFilter;
export { defaultFilters, filterAnalytics };
