export default (path) => {
  return path.replaceAll('https://', '').replaceAll('/', '_').replaceAll(/\\/g, '_');
};
