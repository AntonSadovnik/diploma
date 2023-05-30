const { PerformanceObserver } = require('perf_hooks');

test('memory usage should be less than 50MB for 10 seconds', async () => {
	// Define the duration of the test in milliseconds
	const duration = 10000;

	// Define the threshold for memory usage in bytes
	const threshold = 50 * 1024 * 1024; // 50MB

	// Create a new PerformanceObserver to monitor memory usage
	// eslint-disable-next-line no-shadow
	const observer = new PerformanceObserver((list, observer) => {
		const entry = list.getEntries()[0];
		const memoryUsage = entry?.name === 'gc' ? entry?.delta : null;

		// If the memory usage exceeds the threshold, fail the test
		if (memoryUsage && memoryUsage > threshold) {
			observer.disconnect();
			throw new Error(
				`Memory usage exceeded threshold of ${threshold} bytes: ${memoryUsage} bytes`
			);
		}
	});

	// Start monitoring memory usage
	observer.observe({ entryTypes: ['gc'], buffered: true });

	// Allocate some memory for the duration of the test
	const buffers = Array.from({ length: duration / 1000 }, () =>
		Buffer.alloc(1024 * 1024)
	); // Allocate 1MB buffer for each second
	const start = performance.now();
	while (performance.now() - start < duration) {
		// Do some CPU-intensive operation here
	}
	// Free the memory
	buffers.forEach((buffer) => buffer.fill(0));

	// Trigger garbage collection
	// global.gc();

	// Stop monitoring memory usage
	observer.disconnect();
});
