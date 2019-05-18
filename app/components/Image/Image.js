import React, { Fragment, Component } from 'react';
import { cssModules } from 'bpk-react-utils';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';

import STYLES from './image.scss';

const getClassName = cssModules(STYLES);

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

export default class Image extends Component {
  render() {
    const { className, lightSrc, darkSrc, ...rest } = this.props;

    return (
      <Fragment>
        <FadingLazyLoadedImage
          className={getClassName(`image`, 'image--light', className)}
          src={lightSrc}
          {...rest}
        />
        <FadingLazyLoadedImage
          className={getClassName(`image`, 'image--dark', className)}
          src={darkSrc}
          {...rest}
        />
      </Fragment>
    );
  }
}
