const fetch = require('node-fetch');

export const nodeFetch = async ({ url }) => {

  try {
    const response = await fetch(url, { method: 'get' });
    const textResponse = await response.text();
    return JSON.parse(textResponse);
  } catch (error) {
    return {};
  }

};
