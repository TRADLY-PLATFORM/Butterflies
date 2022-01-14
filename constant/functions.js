import Cookies from 'js-cookie'
var CryptoJS = require('crypto-js')
const { cookie_name } = require('./url')

export function getAuthKey() {
  // let ckAuth = Cookies.get(`ck_p_a`)
  let ckAuth =
    'U2FsdGVkX18OJHD59/qk+KX4q/IT1Czty9W7fm/lwy4POuK995sILUvL0NtfttipmDNs19FOH12dGFUR4P969HncG09Ig2xBIOS8akHBeHSGe6OWri3nKbneCVYf0S0R5dbTtqnQT1gQbh+oFcgrgtuUcq7cZXEcJjLEnsbViXooIaBRafJgsqI/k+SgbLs9h9zCVnhoeF/G7GN19vMu/GF5CpBl19G6UTfZmmOATnn9PSL4Be2yZdnkQMG00Dye19u1FPgYuldQeimMdjXjfrTNrXrg0UFnHaWHRBW9Mq3iK4kZdAB7bWT3tj36vQMeAQZjIDBbY08uzdjMHcmb5i2j1Pgz1XrZQpzVj/dafmwi1WDyTVxrUWI+Zg646ZwqSCRo253qUizz6ItSYabBv/fEt1dlXV1KcnFq0VO93ESeHtrrCWNxPzIV52+ZMCZYcKu8Me4FcauxIz5KPQ0dl47fVmbkd4kcZPZPYlPmAib/kYWbH+RLMdTaLjaCZAPCQeN+Q4kF3v4Pxcuk6T/Lamwptg+ntHJqiPc5RxYgZFrt85ryy//4dYNIxWFrGNnPS1Zs/SwHILpBVTolWZDh1w==';
  if (ckAuth !== undefined) {
    const decrypted = CryptoJS.AES.decrypt(ckAuth, process.env.AES_SECRET)
    var aut_key = decrypted.toString(CryptoJS.enc.Utf8)
    return aut_key
  } else {
    return undefined
  }
}
