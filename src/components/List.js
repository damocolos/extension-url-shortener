import React from 'react';
import { useChromeStorageLocal } from 'use-chrome-storage';
import './List.css';

function List() {
  const [urls] = useChromeStorageLocal('urls', []);

  return (
    <>
      {urls.length > 0 && <h4>URL List</h4>}
      <div className='List-container'>
        {urls.map((url, index) => {
          return (
            <div className='List-item' key={index}>
              <p>{url.long_url}</p>
              <p>{url.short_url}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default List;
