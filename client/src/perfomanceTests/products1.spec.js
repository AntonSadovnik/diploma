// eslint-disable-next-line import/no-extraneous-dependencies
const puppeteer = require('puppeteer');

test('loading the products page should take less than 3 seconds', async () => {
	// Launch a new browser instance
	const browser = await puppeteer.launch();

	// Open a new page
	const page = await browser.newPage();

	// Measure the time it takes to load the page
	const start = Date.now();
	await page.goto('http://localhost:3000/products?categories=rolls');
	const end = Date.now();
	const duration = end - start;

	// Assert that the duration is less than 3 seconds
	expect(duration).toBeLessThan(3000);

	// Close the browser
	await browser.close();
}, 30000);
