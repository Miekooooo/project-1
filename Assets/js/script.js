// Import the 'node-fetch' module if you're using Node.js
// const fetch = require('node-fetch');

// Replace with an actual series ID
const seriesId = 'your_actual_series_id';
const url = `https://moviesdatabase.p.rapidapi.com/titles/series/${seriesId}`;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '4735d31250msh2b8b785e5128f79p19e220jsn494a51118e18',
		'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
	}
};

async function fetchSeriesData() {
	try {
		const response = await fetch(url, options);
		const result = await response.text();
		console.log(result);
	} catch (error) {
		console.error(error);
	}
}

// Call the asynchronous function
fetchSeriesData();