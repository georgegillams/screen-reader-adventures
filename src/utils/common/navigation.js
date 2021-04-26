import nextifyHref from '../nextifyHref';

const navigate = async (path, router, scroll = true) => {
  const { url, as, options } = nextifyHref(path);
  await router.push(url, as, options);
  if (scroll) {
    window.scrollTo(0, 0);
  }

  return true;
};

export default navigate;
export { navigate };
