import axios from 'axios';

const TINY_SHORTNENER_URL = 'https://gotiny.cc';

const tinyShortenerAxios = axios.create({
  baseURL: TINY_SHORTNENER_URL,
});

const generateShortUrl = async (url) => {
  try {
    const resp = await tinyShortenerAxios.post('/api', {
      input: url,
    });
    return resp?.data.length
      ? `${TINY_SHORTNENER_URL}/${resp.data[0].code}`
      : null;
  } catch (err) {
    console.error(err);
  }
  return null;
};

export { generateShortUrl };
