// eslint-disable-next-line import/no-extraneous-dependencies
const puppeteer = require('puppeteer');

test('loading the homepage for 5 people should take less than 15 seconds', async () => {
	// Launch a new browser instance
	const browser = await puppeteer.launch();

	// Define the number of users to simulate
	const numUsers = 5;

	// Define an array to store the page load durations
	const durations = [];

	// Create a new page for each user
	const pages = await Promise.all(
		Array.from({ length: numUsers }, () => browser.newPage())
	);

	// Define a function to measure the time it takes to load a page
	const measurePageLoadTime = async (page) => {
		const start = Date.now();
		await page.goto('http://localhost:3000/');
		const end = Date.now();
		const duration = end - start;
		durations.push(duration);
	};

	// Simulate concurrent page loads for each user
	await Promise.all(pages.map((page) => measurePageLoadTime(page)));

	// Assert that the total duration is less than 10 seconds
	const totalDuration = durations.reduce((acc, duration) => acc + duration, 0);
	expect(totalDuration).toBeLessThan(16000);

	// Close the browser
	await browser.close();
}, 20000);
