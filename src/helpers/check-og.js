import fs from 'fs';

export default (permalink) => {
  try {
    const path = `./public/assets/images/og-images/${permalink}.png`;
    console.log(`Trying: ${path}`);
    return fs.existsSync(path);
  } catch (err) {
    return false;
  }
};
