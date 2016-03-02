'use strict';

module.exports = {
	isInArray: function(value, array) {
		return array.indexOf(value) > -1;
	},

	shuffleArray: function(array) {
		for (var j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);

		return array;
	}
}
