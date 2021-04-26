const Page = () => null;

Page.getInitialProps = async context => {
  const isServer = !!context.req;

  if (!isServer) {
    return {};
  }

  // Redirect back home
  if (context.res) {
    context.res.redirect('/');
  }

  return {};
};

Page.propTypes = {};

export default Page;
