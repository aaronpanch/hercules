export default function ajax(url, opts) {
  let defaultOptions = {};

  if (localStorage.getItem('herculesToken')) {
    defaultOptions.headers = {
      Authorization: `JWT ${localStorage.getItem('herculesToken')}`
    }
  }

  const options = Object.assign({}, defaultOptions, opts);

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
