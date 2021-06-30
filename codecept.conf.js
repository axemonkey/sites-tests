const { setHeadlessWhen } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
	tests: './tests/*.js',
	output: './output',
	helpers: {
		Puppeteer: {
			url: 'https://clivemurray.com',
			show: false,
			restart: true,
			windowSize: '1298x960',
			chrome: {
					args: ['--no-sandbox']
			}
		},
		AssertWrapper: {
			"require": "codeceptjs-assert"
		},
		MyHelper: {
			require: './lib/custom-helper.js',
		},
	},
	include: {
		I: './steps_file.js'
	},
	bootstrap: null,
	mocha: {},
	name: 'will_it_work',
	plugins: {
		pauseOnFail: {},
		retryFailedStep: {
			enabled: true
		},
		tryTo: {
			enabled: true
		},
		screenshotOnFail: {
			enabled: true,
			uniqueScreenshotNames: true
		}
	},
}
