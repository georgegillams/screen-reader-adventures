import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import BpkImage, {
  withLazyLoading,
  withLoadingBehavior,
} from 'bpk-component-image';
import { CreativeCommons } from 'gg-components/CreativeCommons';
import { ArticleCard, ARTICLE_CARD_LAYOUTS } from 'gg-components/Cards';
import {
  Paragraph,
  Section,
  SubSection,
  PageTitle,
} from 'gg-components/Typography';
import { cssModules } from 'gg-components/helpers/cssModules';

import STYLES from '../pages.scss';

import GraphicContent, {
  withGraphicContentBehaviour,
} from 'components/GraphicContent';
import Comments from 'containers/Comments';

const PAGE_ID = '857216';
const documentIfExists = typeof window !== 'undefined' ? document : null;
const FadingLazyLoadedImage = withLoadingBehavior(
  withLazyLoading(BpkImage, documentIfExists),
);
const GcbGraphicContent = withGraphicContentBehaviour(GraphicContent);

const getClassName = cssModules(STYLES);

export default class Photography extends Component {
  static propTypes = {
    commentCreateErrors: PropTypes.object.isRequired,
    newDataAvailable: PropTypes.bool.isRequired,
    newCommentBeingCreated: PropTypes.bool.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object),
    user: PropTypes.object.isRequired,
    createComment: PropTypes.func.isRequired,
    loadComments: PropTypes.func.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    const {
      user,
      comments,
      newDataAvailable,
      commentCreateErrors,
      loadComments,
      createComment,
      className,
    } = this.props;

    return (
      <div
        className={getClassName('pages__container--centered')}
        style={{ textAlign: 'center' }}
      >
        <Helmet title="Photography" />
        <PageTitle anchor={false} name="Photography">
          <div
            style={{ paddingTop: '1rem' }}
            className={getClassName('pages__compact-card-container')}
          >
            <ArticleCard
              layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              imageSrc="https://i.imgur.com/Jng7EhH.png"
              href="https://gurushots.com/georgegillams/achievements"
              title="Find me on GuruShots"
            />
            <ArticleCard
              layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              imageSrc="https://i.imgur.com/u30cQWU.png"
              href="https://www.flickr.com/people/georgegillams/"
              title="Find me on Flickr"
            />
            <ArticleCard
              layout={ARTICLE_CARD_LAYOUTS.narrowCompact}
              day={null}
              month={null}
              className={getClassName('pages__card')}
              imageSrc="https://i.imgur.com/obBqvqK.png"
              href="https://unsplash.com/@georgegillams"
              title="Find me on Unsplash"
            />
          </div>
          <SubSection anchor={false} name="Harlequins vs Worcester Rugby Match">
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              altText="Harlequins vs Worcester Rugby Match"
              width={4130}
              height={2394}
              src="https://i.imgur.com/OsFI23z.jpg"
            />
          </SubSection>
          <SubSection anchor={false} name="The cat looking handsome as ever!">
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              altText="The cat looking handsome as ever!"
              width={5184}
              height={3456}
              src="https://i.imgur.com/Aqy3tuA.jpg"
            />
          </SubSection>
          <SubSection anchor={false} name="A training scenario at EPICC 2017">
            <GcbGraphicContent className={getClassName('pages__image')}>
              <FadingLazyLoadedImage
                altText="A training scenario at EPICC 2017"
                width={5184}
                height={3132}
                src="https://i.imgur.com/6B35GTV.jpg"
              />
            </GcbGraphicContent>
          </SubSection>
          <SubSection anchor={false} name="Dog running with a Stick">
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              altText="Dog running with a Stick"
              width={3000}
              height={2000}
              src="https://i.imgur.com/8dnCZ5D.jpg"
            />
          </SubSection>
          <SubSection anchor={false} name="Stunt Motorcyclist">
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              altText="Stunt Motorcyclist"
              width={3000}
              height={2000}
              src="https://i.imgur.com/WlLYxDw.jpg"
            />
          </SubSection>
          <SubSection anchor={false} name="Longleat Festival of Light">
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              altText="Longleat Festival of Light"
              width={3000}
              height={2000}
              src="https://i.imgur.com/EHF7zqM.jpg"
            />
          </SubSection>
          <SubSection anchor={false} name="Serre Chevalier">
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              altText="Serre Chevalier"
              width={3000}
              height={2000}
              src="https://i.imgur.com/gIccH4E.jpg"
            />
          </SubSection>
          <SubSection
            anchor={false}
            name="Nick Matthew playing in the Canary Wharf Open"
          >
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              altText="Nick Matthew playing in the Canary Wharf Open"
              width={3000}
              height={2000}
              src="https://i.imgur.com/h4BFWqS.jpg"
            />
          </SubSection>
        </PageTitle>
        <Section name="Photoshop">
          <SubSection anchor={false} name="Tulips exploding with light">
            <Paragraph>
              For some reason the idea of light exploding out of tulips popped
              into my mind, so I went out to find some and made it a reality. I
              used a similar effect in Art that I had used in the past to create
              beams of sunlight breaking through the clouds, and then darkened
              the background a little.
            </Paragraph>
            <br />
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              altText="Exploding tulips"
              width={3000}
              height={2000}
              src="https://i.imgur.com/PIKQ2D6.jpg"
            />
          </SubSection>
          <SubSection anchor={false} name="Miss Saigon sketch">
            <Paragraph>
              With Miss Saigon coming to cinemas soon for one day only, I was
              inspired to draw the production logo (aka tempted to
              procrastinate).
            </Paragraph>
            <br />
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              altText="Miss Saigon"
              width={2153}
              height={3000}
              src="https://i.imgur.com/y3i2Ll1.jpg"
            />
          </SubSection>
          <SubSection
            anchor={false}
            name="Dual-carriageway light-painting (in post)"
          >
            <Paragraph>
              One evening after leaving work at an unearthly hour, I shot this
              uninspired photo. In Photoshop, I then used the brush tool and
              some layer styles to create a 'painting with light' effect.
            </Paragraph>
            <br />
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              altText="Dual-carriageway light-painting"
              width={3000}
              height={2000}
              src="https://i.imgur.com/T502lkX.jpg"
            />
          </SubSection>
        </Section>
        <Section name="Food is art! (...sometimes)">
          <SubSection anchor={false} name="Guinness cake">
            <Paragraph>
              I like spending time on food presentation when the opportunity
              calls for it. So I created this masterpiece to share with the
              office and celebrate a legendary drink!
            </Paragraph>
            <br />
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              altText="Guinness cake"
              width={3000}
              height={2000}
              src="https://i.imgur.com/oBWlSDO.jpg"
            />
          </SubSection>
          <SubSection anchor={false} name="Ratatouille">
            <Paragraph>
              To get us in the mood for Disneyland, I cooked up this Ratatouille
              in the style of the dish served in the film. It came out better
              than I expected... Pretty pleased with the result!
            </Paragraph>
            <br />
            <FadingLazyLoadedImage
              className={getClassName('pages__image')}
              altText="Ratatouille"
              width={3000}
              height={2000}
              src="https://i.imgur.com/kRGhYxz.jpg"
            />
          </SubSection>
        </Section>
        <br />
        {/* <LicenseInfo centered /> */}
        <Comments pageId={PAGE_ID} />
        <CreativeCommons
          className={getClassName(
            'pages__full-width-container',
            'pages__full-width-container--centered',
          )}
        />
      </div>
    );
  }
}
