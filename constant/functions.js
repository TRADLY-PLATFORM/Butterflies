import Cookies from 'js-cookie'
var CryptoJS = require('crypto-js')
const { cookie_name } = require('./url')

export function getAuthKey() {
  // let ckAuth = Cookies.get(`ck_p_a`)
  let ckAuth = ' ';
  if (ckAuth !== undefined) {
    const decrypted = CryptoJS.AES.decrypt(ckAuth, process.env.AES_SECRET)
    var aut_key = decrypted.toString(CryptoJS.enc.Utf8)
    return aut_key
  } else {
    return undefined
  }
}


export function Serialization(param) {
  var str = [];
  for (var p in param)
    str.push(encodeURIComponent(p) + '=' + encodeURIComponent(param[p]));
  return str.join('&');
}
 