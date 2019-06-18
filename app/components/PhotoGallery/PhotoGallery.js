import React from 'react';
import PropTypes from 'prop-types';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { cssModules } from 'bpk-react-utils';

import STYLES from './photo-gallery.scss';

const getClassName = cssModules(STYLES); // REGEX_REPLACED

const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);

const PhotoGallery = props => {
  const { images, className, ...rest } = props;

  const classNameFinal = [getClassName('photo-gallery__container')];
  if (className) classNameFinal.push(className);

  return (
    <div className={classNameFinal.join(' ')} {...rest}>
      <FadingLazyLoadedImage
        className={getClassName('photo-gallery__image0')}
        altText={images[0].altText}
        width={970}
        height={575}
        src={images[0].src}
      />
      <FadingLazyLoadedImage
        className={getClassName('photo-gallery__image1')}
        altText={images[1].altText}
        width={970}
        height={800}
        src={images[1].src}
      />
      <FadingLazyLoadedImage
        className={getClassName('photo-gallery__image2')}
        altText={images[2].altText}
        width={970}
        height={575}
        src={images[2].src}
      />
      <FadingLazyLoadedImage
        className={getClassName('photo-gallery__image3')}
        altText={images[3].altText}
        width={970}
        height={575}
        src={images[3].src}
      />
    </div>
  );
};

PhotoGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.node).isRequired,
  className: PropTypes.string,
};

PhotoGallery.defaultProps = {
  className: null,
};

export default PhotoGallery;
