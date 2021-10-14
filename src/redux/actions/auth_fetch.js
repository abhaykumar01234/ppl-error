import { VpComponents } from '@vp-components';

const BASE_PATH = '/vp/api/ppl';
const { authAxios } = VpComponents;

export default async function authFetch(url, opts = {}) {
  const { method, body } = opts;

  const res = await authAxios({ url: BASE_PATH + url, method, data: body });
  return Promise.resolve({
    ok: res.status >= 200 && res.status < 300,
    json: () => Promise.resolve(res.data),
    data: res.data,
  });
}
