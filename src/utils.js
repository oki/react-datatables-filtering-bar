import pick from 'lodash/pick'

export function objectToQueryString(object) {
  return Object.keys(_.pick(object, (value) => {
    return _.identity(value) && (value !== "false");
    })).map(function(key) {
          return encodeURIComponent(key) + '=' +
              encodeURIComponent(object[key]);
      }).join('&');
}

export function queryStringToObject(queryString) {
  let params = {}

  if (queryString.indexOf('&') > 0) {
    queryString.split('&').map(hk => {
      let temp = hk.split('=');
        params[temp[0]] = temp[1]
    });
  }

  return params;
}

export function locationHashParams() {
  return queryStringToObject(window.location.hash.substring(1));
}

export function removeHashFromUrl() {
    var uri = window.location.toString();
    if (uri.indexOf("#") > 0) {
        var clean_uri = uri.substring(0, uri.indexOf("#"));
        window.history.replaceState({}, document.title, clean_uri);
    }
}
