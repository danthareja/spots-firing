var MSW_API_KEY = "jx5HFZ5OyPH6zqKR9Pb8k230iSGymW2Q";
var MSW_API_SECRET = "48Kx1256b8VpNBHLKh5pA3Q77BN2asqy";

var options = {
  url: 'http://magicseaweed.com/api/' + MSW_API_KEY + '/forecast/',
  data: {
    spot_id: getSpot()
  },
  type: "GET",
  dataType : "jsonp",
};


function callMSW() {
  $.ajax(options)
  .then(getCurrentForecast)
  .then(checkFiveStars)
  .done(function(rating) {
    console.log(rating);
  });
}

function getSpot() {
  var spot;

  do { spot = spotNumbers[Math.floor(Math.random() * spotNumbers.length)]; }
  while (spotNumberHasBeenVisited[spot]);

  spotNumberHasBeenVisited[spot] = true;
  return spot;
}


function getCurrentForecast(weeklyForecast) {
  var today = weeklyForecast.slice(0, 8);
  var now = Math.round(Date.now() / 1000);

  return today.reduce(function(current, forecast) {
    return Math.abs(current.timestamp - now) < Math.abs(forecast.timestamp - now) ? current : forecast;
  });
}

function checkSwell(forecast) {
  if (forecast.solidRating === 5) {
    displaySwell(forecast);
  } else {
    callMSW();
  }
}

function handleError(err) {
  console.log('ERROR GETTING FORECAST: ', err);
}

function resetSpots() {
  spotNumbers.forEach(function(number) {
    spotNumberHasBeenVisited[number] = false;
  });
}
