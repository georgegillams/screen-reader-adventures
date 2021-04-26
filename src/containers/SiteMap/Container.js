import React from 'react';
import { Subsection } from 'gg-components/Subsection';
import TextLink from 'components/common/TextLink';
import PageTitle from 'components/common/PageTitle';
import { Paragraph } from 'gg-components/Paragraph';
import redirects from 'helpers/redirects';
import STYLES from './site-map.scss';
import { cssModules } from 'gg-components/helpers/cssModules';

const getClassName = cssModules(STYLES);

const SiteMap = props => (
  <PageTitle name="Site map" {...props}>
    <Subsection anchor={false} name="Design 🎨" className={getClassName('site-map__section')}>
      <Paragraph>
        <TextLink href="/privacy-policy">Privacy Policy</TextLink>
      </Paragraph>
    </Subsection>
    <Subsection anchor={false} name="Other stuff 🤷‍♂️" className={getClassName('site-map__section')}>
      <Paragraph>
        <TextLink href="/debug">Debug tools</TextLink>
        <br />
        <TextLink href="/status">Status</TextLink>
      </Paragraph>
    </Subsection>
    <Subsection anchor={false} name="Random 🐉" className={getClassName('site-map__section')}>
      <Paragraph>
        <TextLink hrefExternal href="/robots.txt">
          Robots.txt
        </TextLink>
        <br />
        <TextLink hrefExternal href="/sitemap.xml">
          SiteMap.xml
        </TextLink>
        <br />
        <TextLink href="/404">404 error page - not found</TextLink>
        <br />
        <TextLink href="/teapot">418 error page - I&apos;m a teapot</TextLink>
      </Paragraph>
    </Subsection>
    <Subsection anchor={false} name="API" className={getClassName('site-map__section')}>
      <Paragraph>
        <TextLink href="/api-docs">API docs</TextLink>
      </Paragraph>
    </Subsection>
    <Subsection anchor={false} name="Accounts 🔑" className={getClassName('site-map__section')}>
      <Paragraph>
        <TextLink href="/account">Account</TextLink>
        <br />
        <TextLink href="/sign-up">Sign up</TextLink>
        <br />
        <TextLink href="/login">Log in</TextLink>
        <br />
        <TextLink href="/email-verification">Email verification</TextLink>
        <br />
        <TextLink href="/magic-login">Magic login</TextLink>
      </Paragraph>
    </Subsection>
    <Subsection anchor={false} name="Admin 👮‍♂️" className={getClassName('site-map__section')}>
      <Paragraph>
        <TextLink href="/admin">Admin navigation</TextLink>
        <br />
        <TextLink href="/admin/analytics">Analytics</TextLink>
        <br />
        <TextLink href="/admin/emails">Emails</TextLink>
        <br />
        <TextLink href="/admin/notifications">Notifications</TextLink>
        <br />
        <TextLink href="/admin/users">Users</TextLink>
      </Paragraph>
    </Subsection>
    <Subsection anchor={false} name="Redirects" className={getClassName('site-map__section')}>
      <Paragraph>
        {redirects.map(redirect => (
          <div key={redirect.from}>
            <TextLink href={`${redirect.from}`}>{`${redirect.from} ⇒ ${redirect.to}`}</TextLink>
            <br />
          </div>
        ))}
      </Paragraph>
    </Subsection>
  </PageTitle>
);

export default SiteMap;
