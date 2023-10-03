// Node.js endpoint

const express = require('express');
const axios = require('axios');

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); 
    next(); 
  });

const apiKey = 'ALVUPDZ6TOR4O1DV';
const symbol = 'AAPL';

app.get('/av', async (req, res) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}&timeseries.last=1`;

    axios
      .get(url, {
        headers: {
          'User-Agent': 'axios', // Set the User-Agent header as in the original code
        },
      })
      .then((response) => {
        if (response.status !== 200) {
          console.log('Status:', response.status);
        } else {
            response = response.data['Weekly Adjusted Time Series']
            const dates = Object.keys(response);
            const sortedDates = dates.sort((a, b) => new Date(b) - new Date(a));
            const recentWeeks = sortedDates.slice(0, 52);
            const recentPrices = recentWeeks.map(date => response[date]);

            console.log(sortedDates);
            console.log(Object.keys(recentWeeks));
            console.log(recentPrices);
            res.json(recentPrices);
        }
      })
      .catch((error) => {
        console.log('Error:', error.message);
      });
});

app.listen(3000);