'use client ';

import ReactDOM from 'react-dom';

/**
 * @function PreloadResources - Handles special metadata requests not supported by the inbuilt `generateMetaData` function
 * @description - This is implemented using Next.js's recommended approach to handle special Metadata requests
 * @link Next.js documentation - https://nextjs.org/docs/app/api-reference/functions/generate-metadata#link-relpreconnect
 */
export function PreloadFontResources() {
  // @ts-ignore
  ReactDOM.preconnect('https://fonts.googleapis.com');
  // @ts-ignore
  ReactDOM.preconnect('https://fonts.gstatic.com', {
    crossOrigin: '',
  });

  return null;
}
