const nextifyHref = href => {
  const result = { url: href, as: href, options: {} };
  if (href && href.startsWith('/blog/')) {
    result.url = '/blog/[id]';
  }
  return result;
};

export default nextifyHref;
