const puppeteer = require('puppeteer');

test('system crush test', async () => {
	let users = 0;
	const threshold = 100;
	while (users < threshold) {
		// eslint-disable-next-line no-await-in-loop
		const browser = await puppeteer.launch();
		// eslint-disable-next-line no-await-in-loop
		const page = await browser.newPage();
		const user = new User(browser, page, users);
		user.simulateActivity();
		users += 1;
	}
});
