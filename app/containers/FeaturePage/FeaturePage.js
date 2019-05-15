import React from 'react';
import { Helmet } from 'react-helmet';
import STYLES from './style.scss'; import {cssModules} from 'bpk-react-utils';  const getClassName = cssModules(STYLES); // REGEX_REPLACED

export default class FeaturePage extends React.Component {
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={getClassName("feature-page")}>
        <Helmet>
          <title>Feature Page</title>
          <meta
            name="description"
            content="Feature page of React.js Boilerplate application"
          />
        </Helmet>
        <h1>Features</h1>
        <ul>
          <li>
            <p className={getClassName("title")}>Next generation JavaScript</p>
            <p>
              Use template strings, object destructuring, arrow functions, JSX
              syntax and more, today.
            </p>
          </li>
          <li>
            <p className={getClassName("title")}>Instant feedback</p>
            <p>
              Enjoy the best DX and code your app at the speed of thought! Your
              saved changes to the CSS and JS are reflected instantaneously
              without refreshing the page. Preserve application state even when
              you update something in the underlying code!
            </p>
          </li>
          <li>
            <p className={getClassName("title")}>Industry-standard routing</p>
            <p>
              {
                "Write composable CSS that's co-located with your components for complete modularity. Unique generated class names keep the specificity low while eliminating style clashes. Ship only the styles that are on the page for the best performance."
              }
            </p>
          </li>
          <li>
            <p className={getClassName("title")}>The Best Test Setup</p>
            <p>
              Automatically guarantee code quality and non-breaking changes.
              (Seen a react app with 99% test coverage before?)
            </p>
          </li>
        </ul>
        <i>and much more...</i>
      </div>
    );
  }
}
