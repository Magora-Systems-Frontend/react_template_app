export const SSR_DIRECTIONS = {
  SSR_FOR_ALL: 'SSR_FOR_ALL',
  SSR_FOR_BOTS: 'SSR_FOR_BOTS',
  STATIC_FOR_ALL: 'STATIC_FOR_ALL',
};

export const {
  API_URL = 'http://localhost:8021',
  SSR_DIRECTION = SSR_DIRECTIONS.SSR_FOR_BOTS,
} = process.env || {};
