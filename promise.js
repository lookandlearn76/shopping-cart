import axios from "axios";
const currencylayer = ''


function getCurrencyPromise () {
  return new Promise(function (resolve, reject) {
    resolve(USDALL);
    reject('Currency not found');
  });
}

getCurrencyPromise('USDALL').then(function(currency) {
  console.log('promise success', currency);
}, function (err) {
  console.log('promise error', err);
})
