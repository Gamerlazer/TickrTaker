export const calcPrice = function(startPrice, endPrice, startDate, endDate) {
  //console.log(startPrice, endPrice, startDate, endDate);
  return Math.max( ((startPrice - endPrice) /
    ((Date.parse(endDate)) - Date.parse(startDate))
  * (Date.parse(endDate) - Date.now())) + endPrice, endPrice);
};

export const calcTime = function(endDate) {

  var countdown = require('countdown');

  var timeleft = countdown(null, new Date(endDate), countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS, 2).toString();
  return timeleft;

};
