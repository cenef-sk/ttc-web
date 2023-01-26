function b64DecodeUnicode(str) {
    // Going backwards: from bytestream, to percent-encoding, to original string.
    return decodeURIComponent(atob(str).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

export function parseJwt (token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(b64DecodeUnicode(base64));
}

export function valid(token) {
  const dToken = parseJwt(token);
  var isExpiredToken = false;
  var dateNow = new Date();
  if(dToken.exp < dateNow.getTime()/1000)
  {
         isExpiredToken = true;
  }
  return !isExpiredToken;
}
