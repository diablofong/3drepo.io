/**
 *	Copyright (C) 2016 3D Repo Ltd
 *
 *	This program is free software: you can redistribute it and/or modify
 *	it under the multiSelect of the GNU Affero General Public License as
 *	published by the Free Software Foundation, either version 3 of the
 *	License, or (at your option) any later version.
 *
 *	This program is distributed in the hope that it will be useful,
 *	but WITHOUT ANY WARRANTY; without even the implied warranty of
 *	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *	GNU Affero General Public License for more details.
 *
 *	You should have received a copy of the GNU Affero General Public License
 *	along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

(function () {
	"use strict";

	// service
	angular
		.module("3drepo")
		.service("MultiSelectService", MultiSelectService);

	MultiSelectService.$inject = ["EventService"];

	function MultiSelectService(EventService) {

		var keys = {
			cmdKey : 91,
			ctrlKey : 17,
			escKey : 27
		};

		var isMac = (navigator.platform.indexOf("Mac") !== -1);
		var multiMode = false;
		var pinDropMode = false;

		var service = {
			pinDropMode : pinDropMode,
			multiMode : multiMode,
			handleKeysDown : handleKeysDown,
			disableMultiSelect : disableMultiSelect
		}
		return service;

		//////////////

		function isMacKey(keysDown) {
			return isMac && keysDown.indexOf(keys.cmdKey) !== -1;
		}

		function isNotMacKey(keysDown) {
			return !isMac && keysDown.indexOf(keys.ctrlKey) !== -1;
		}

		function isKeyDown(keysDown) {
			return isMacKey(keysDown) || isNotMacKey(keysDown);
		}

		function isKeyDownNotCtrl(keysDown) {
			var macOtherKey = isMac && keysDown.indexOf(keys.cmdKey) === -1;
			var otherKey = !isMac && keysDown.indexOf(keys.ctrlKey) === -1;
			return macOtherKey || otherKey;
		}


		/**
		 * Handle component input changes
		 */
		function handleKeysDown(keysDown) {
			
			if (pinDropMode) {
				return;
			}

			// TODO: This is convoluted
			if (isKeyDown(keysDown)) {

				multiMode = true;
				EventService.send(EventService.EVENT.MULTI_SELECT_MODE, true);

			} else if (multiMode === true && isKeyDownNotCtrl(keysDown)) {

				multiMode = false;
				EventService.send(EventService.EVENT.MULTI_SELECT_MODE, false);

			} else if (keysDown.indexOf(keys.escKey) !== -1) {

				EventService.send(EventService.EVENT.VIEWER.HIGHLIGHT_OBJECTS, []);

			}
				
		}


		function disableMultiSelect() {
			EventService.send(EventService.EVENT.MULTI_SELECT_MODE, false);
		}
		
	}
}());