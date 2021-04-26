import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import appConfig from 'helpers/appConfig';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const page = ctx.renderPage();
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, ...page };
  }

  render() {
    return (
      <Html lang="en-GB">
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon/favicon-180x180.png" />

          <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon/favicon-16x16.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="64x64" href="/static/favicon/favicon-64x64.png" />
          <link rel="icon" type="image/png" sizes="512x512" href="/static/favicon/favicon-512x512.png" />

          <link rel="icon" href="/static/favicon/favicon.ico" />

          <link rel="manifest" href="/static/favicon/site.webmanifest" />

          <link rel="mask-icon" href="/static/favicon/favicon.svg" color={appConfig.themeColor} />
          <link rel="shortcut icon" href="/static/favicon/favicon.png" />

          <meta name="msapplication-config" content="/static/favicon/browserconfig.xml" />
        </Head>

        <body>
          {/* Fixes FOUC in Firefox: https://bugzilla.mozilla.org/show_bug.cgi?id=1404468 */}
          <script>0</script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
