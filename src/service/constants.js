const HOST = location.host;
const ENV = [
  { host: /xfplink\./, env: 'PROD' },
  { host: /.*/, env: 'TEST' }
].find(item => item.host.test(HOST)).env;

  const URL_MAP = {
    TEST: 'http://www.e-fp.cn',
    PROD: 'http://www.xfplink.cn'
  };

  const ENV_MAP = {
    TEST: 'dev',
    PROD: 'prod'
  };

  const API_KEY_MAP = {
    TEST: 'YoO45SINRHiOCISOfn3olA0bBvxCPsPf55CwX6FhAbTYM6nhFOa7jDqhMTu8LboKNLT3lD7i038%3D',
    PROD: 'YoO45SINRHg8tSKMzuVt7ddjchTinZ%2BrJ3GY1vBH6XX%2FEJRYwVfcpxPPeBlhzspj%2B2njPK3vKwFn%0AZfCcJXQy2gnwwZJEVsiVVL%2F%2FWYcA5J8%3D'
  };

export const API = `${URL_MAP[ENV]}/issp`;
export const URL = URL_MAP[ENV];
// export const ENV = ENV_MAP[ENV];
export const API_KEY = API_KEY_MAP[ENV];
