
const express = require('express');
const logger = require('./logger');

const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const resolve = require('path').resolve;
const app = express();

setup(app, {
	outputPath: resolve(process.cwd(), 'build'),
	publicPath: '/',
});

const port = argv.port || process.env.PORT || 8080;

app.listen(port, (err) => {
	if (err) {
		return logger.error(err.message);
	}

	logger.appStarted(port);
});