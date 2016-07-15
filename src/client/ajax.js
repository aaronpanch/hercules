export default function ajax(url, opts = {}) {
  const options = Object.assign({}, { credentials: 'same-origin' }, opts);

  return fetch(url, options)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
      }

      return json;
    });
}
