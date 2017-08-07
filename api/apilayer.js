//import axios = from ('axios');

/*var curCon = 'http://apilayer.net/api/live?access_key=c77bbb8b0d26f7834b24c0d7b6831166';

export default {
  getCurrency: function (currency){
    var encodedCurrency = encodeURIComponent(currency);
    var reqCurrency = `${curCon}&q=${encodedCurrency}`;

    return axios.get(reqCurrency).then(function(res){
      if (res.data.cod && res.data.message) {
        throw new Error(res.data.message);
      } else {
        return res.data.main.currency;
      }
    }, function (err){
      throw new Error(res.data.message);
    });
  }
}
*/
