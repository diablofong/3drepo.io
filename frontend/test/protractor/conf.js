(function () {
	"use strict";

		exports.config = {
		seleniumAddress: 'http://localhost:4444/wd/hub',
		specs: ['protractor/todo-spec.js'],
		onPrepare: function () {
			// To bring the browser window to the front
			return browser.executeScript("alert('Test');").then(function () {
				return browser.switchTo().alert().accept();
			});
		}
	};
}());