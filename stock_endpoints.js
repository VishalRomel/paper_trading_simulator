// Node.js endpoint

const express = require('express');
const axios = require('axios');

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     
    next(); 
  });

// const apiKey = 'ALVUPDZ6TOR4O1DV';
//'3ELGS27E0LN474BP'
const apiKey = 'EN3735MN44LA7F35';
const symbol = 'AAPL';

app.post('/av', async (req, res) => {
    console.log(req.body.stock);
    const stock = req.body.stock;
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=${stock}&apikey=${apiKey}&timeseries.last=1`;

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
            console.log(response.data);
            response_data = response.data['Weekly Adjusted Time Series'];
            const dates = Object.keys(response_data);
            const sortedDates = dates.sort((a, b) => new Date(b) - new Date(a));
            const recentWeeks = sortedDates.slice(0, 52);
            const recentPrices = recentWeeks.map(date => response_data[date]);

            const chartData = recentWeeks.map((week, i) => {
                return {
                  week: week, 
                  price: recentPrices[i]['4. close'] 
                }
              })

            console.log(chartData);
            res.json(chartData);
        }
      })
      .catch((error) => {
        console.log('Error:', error.message);
      });
});

app.listen(3000);