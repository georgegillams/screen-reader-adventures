import React from 'react';
import PageTitle from 'components/common/PageTitle';
import { Paragraph } from 'gg-components/Paragraph';

import Subsection from 'gg-components/Subsection';
import TextLink from 'components/common/TextLink';

const PrivacyPolicy = () => {
  return (
    <>
      <PageTitle name="Privacy policy">
        <Subsection name="Analytics">
          <Paragraph>
            This site collects basic analytics information, namely the URL paths you visit within the site, and
            information about the device you are using. This is never shared with third-parties and never used to track
            you across other services.
          </Paragraph>
          <br />
          <Paragraph>
            The information collected about your device includes browser, browser version, OS, OS version, and the first
            part of your IP address which gives a very, very rough location of access.
          </Paragraph>
        </Subsection>
        <Subsection name="Accounts">
          <Paragraph>
            When you sign-up for an account we ask for your name and email. We will never share these with third
            parties.
          </Paragraph>
        </Subsection>
        <Subsection name="Cookies">
          <Paragraph>
            To keep you logged in to your user account an authentication cookie will be stored on your machine. This
            will not be used to track usage, track other services you use, or correlate usage patterns with an
            individual.
          </Paragraph>
        </Subsection>
        <Subsection name="Stripe">
          <Paragraph>
            To enable payments on the site, we use Stripe. Data you enter when making a payment will be handled in
            accordance with{' '}
            <TextLink href="https://stripe.com/privacy" hrefExternal>
              Stripe&#39;s policy
            </TextLink>
            .
          </Paragraph>
        </Subsection>
        <Subsection name="Consent">
          <Paragraph>
            By clicking &quot;Accept&quot; on the cookie popup, you consent to cookies being stored on your machine, and
            data being handled as outlined on this page. You may revoke your permission at any time by clearing your
            local-storage.
          </Paragraph>
        </Subsection>
        <Subsection name="Version">
          <Paragraph>
            This is version 2 of the privacy policy. If the privacy policy changes, we&#39;ll re-prompt you for consent.
          </Paragraph>
        </Subsection>
      </PageTitle>
    </>
  );
};

export default PrivacyPolicy;
