export const calcTime = function(endDate) {

  var countdown = require('countdown');

  var timeleft = countdown(null, new Date(endDate), countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS, 2).toString();
  return timeleft;

};
