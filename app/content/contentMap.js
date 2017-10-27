'use strict';
const content = require('./content.js');

const _uriContent = {
    'default': content.htmlContent
};

const _uriRedirect = {
    'default': 'https://itunes.apple.com/us/app/joyride-hang-out/id1185835397?ls=1'
};

const _paramMap = {
    'u': 'userId'
};

module.exports = {
	uriContent: _uriContent,
	uriRedirect: _uriRedirect,
    paramMap: _paramMap
}
