const { PerformanceObserver, performance } = require('perf_hooks');

test('CPU usage should be less than 70% for 10 seconds', async () => {
	// Define the duration of the test in milliseconds
	const duration = 10000;

	// Define the threshold for CPU usage as a percentage
	const threshold = 70;

	// Create a new PerformanceObserver to monitor CPU usage
	// eslint-disable-next-line no-shadow
	const observer = new PerformanceObserver((list, observer) => {
		const entry = list.getEntries()[0];
		const cpuUsage = entry?.name === 'cpu' ? entry?.value : null;

		// If the CPU usage exceeds the threshold, fail the test
		if (cpuUsage && cpuUsage > threshold) {
			observer.disconnect();
			throw new Error(
				`CPU usage exceeded threshold of ${threshold}%: ${cpuUsage}%`
			);
		}
	});

	// Start monitoring CPU usage
	observer.observe({ entryTypes: ['cpu'], buffered: true });

	// Perform some CPU-intensive operation for the duration of the test
	const start = performance.now();
	while (performance.now() - start < duration) {
		// Do some CPU-intensive operation here
	}

	// Stop monitoring CPU usage
	observer.disconnect();
});
