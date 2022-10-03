import React, { useState } from 'react';
import { useChromeStorageLocal } from 'use-chrome-storage';
import { generateShortUrl } from '../utils/tiny-shortener';
import './Generator.css';

function Generator() {
  const [inputUrl, setInputUrl] = useState('');
  const [urls, setUrls] = useChromeStorageLocal('urls', []);
  const [overlay, setOverlay] = useState({
    show: false,
    message: '',
  });

  const onGenerateShortUrl = async () => {
    // check empty input
    if (inputUrl == '') {
      setTemporaryMessage('Please input url');
      return;
    }

    // show overlay
    setOverlay({
      show: true,
      message: 'Generating...',
    });

    // generate short url
    const shortUrl = await generateShortUrl(inputUrl);

    // check empt short url
    if (!shortUrl) {
      setTemporaryMessage('Failed to generate URL');
      return;
    }

    // save url to local storage
    setUrls([
      ...urls,
      {
        long_url: inputUrl,
        short_url: shortUrl,
      },
    ]);

    // set input url to empty
    setInputUrl('');

    // show success message
    setTemporaryMessage('Success to generate URL');
  };

  const setTemporaryMessage = (msg) => {
    setOverlay({
      message: msg,
      show: true,
    });
    setTimeout(() => {
      setOverlay((overlay) => ({
        ...overlay,
        show: false,
      }));
    }, 1000);
  };

  return (
    <div className='Generator'>
      <input
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder='http://'
      />
      <button onClick={() => onGenerateShortUrl()} disabled={overlay.show}>
        GENERATE
      </button>
      <div
        className='Overlay-status'
        style={{
          visibility: overlay.show ? 'visible' : 'hidden',
        }}
      >
        {overlay.message}
      </div>
    </div>
  );
}

export default Generator;
