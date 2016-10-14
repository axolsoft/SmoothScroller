"use strict";

/*
 * Created 05/03/2016
 *
 * Copyright © Axolsoft 2016
 *
 * SmoothScroller.js
 *
 * SmoothScrolling in Vanilla JS
 * 
 */

/**
 * Creates a new SmoothScroller object with no timeouts and an initial velocity of 0
 *
 * @constructor
 */
function SmoothScroller() {
	// create blank array of timeouts
	this.timeouts = [];

	// set our 'velocity'
	this.velocity = 0.0;

}

SmoothScroller.prototype = {

	/**
	 * Gets the page's current y position
	 *
	 * @returns {float}
	 * @private
	 */
	_getCurrentYPos: function() {
		if (self.pageYOffset) {
			// Firefox, Chrome, Opera, Safari
			return self.pageYOffset;

		} else if (document.documentElement && document.documentElement.scrollTop) {
			// Internet Explorer 6 - standards mode
			return document.documentElement.scrollTop;

		} else if (document.body.scrollTop) {
			// Internet Explorer 6, 7 and 8
			return document.body.scrollTop;

		}

		// default to 0
		return 0;

	},

	/**
	 * Gets an element's y position
	 *
	 * @param {string} eID	- Id of element to get y poisiton for
	 * @returns {number}
	 * @private
	 */
	_getElementYPos: function(eID) {
		var elm     = document.getElementById(eID);
		var y       = elm.offsetTop;
		var node    = elm;

		// dig into our branches until we reach the end
		while (node.offsetParent && node.offsetParent != document.body) {
			node = node.offsetParent;
			y   += node.offsetTop;

		}
		return y;

	},

	/**
	 * Smooth scrolls to an element by id
	 *
	 * @param {string} eID			- Id of element to scroll to
	 * @param {float} scrollRate	- Rate we should scroll at, default is 0.66 if not provided
	 */
	scrollToId: function(eID, scrollRate) {

		// frame rate of 8.666667 milliseconds (instead of 16.67 for a flat 60 fps)
		var frameRate   = 8.6666666667;

		if(!scrollRate) {
			// default scroll rate
			scrollRate  = 0.66;

		}

		// get our current Y
		var currentY    = this._getCurrentYPos();

		// get our target element's Y pos
		var stopY       = this._getElementYPos(eID);

		// set framecounter
		var x = 0;

		// check to clear existing timeouts
		if(this.timeouts.length > 0) {
			// clear all existing timeouts
			const timeoutLen = this.timeouts.length;
			for(x = 0; x < timeoutLen; x++) {
				clearTimeout(this.timeouts[x]);

			}
		}

		// reset x
		x = 0;

		if(stopY > currentY) {
			// scroll down

			// set moveY
			currentY += Math.pow(stopY - currentY * 1.0, scrollRate);

			// start our frame loop until we reach our target
			this.runFrame(currentY, stopY, scrollRate, frameRate, 0.0, function(currentY, stopY, scrollRate) {
				return Math.pow(stopY - currentY * 1.0, scrollRate) * 0.2;
				
			}, "down");

		} else if(stopY < currentY) {
			// scroll up

			// set moveY
			currentY -= Math.pow(currentY - stopY * 1.0, scrollRate);

			// start our frame loop until we reach our target
			this.runFrame(currentY, stopY, scrollRate, frameRate, 0.0, function(currentY, stopY, scrollRate) {
				return (Math.pow(currentY - stopY * 1.0, scrollRate) * -1.0) * 0.2;

			}, "up");

		}
	},

	/**
	 * Runs a frame of our scroll animation
	 *
	 * @param {float} currentY 		- The current position along the y-axis
	 * @param {float} stopY 		- The desired position along the y-axis
	 * @param {float} scrollRate 	- The rate to scroll by
	 * @param {float} sleepTime 	- The time to sleep each frame for, optimally
	 * @param {float} bufferTime 	- The additional time to shave off our sleep to compensate for any rendering fluctuations
	 * @param updateFunction 		- The function to use to update our location for each subsequent frame
	 * @param {string} direction 	- Whether we are scrolling down or up, via 'down' or 'up'
	 */
	runFrame: function(currentY, stopY, scrollRate, sleepTime, bufferTime, updateFunction, direction) {
		var _this = this;

		// start a timer
		const _startTime = (new Date).getTime();

		if(bufferTime < 0.0) {
			sleepTime += bufferTime;
			if(sleepTime < 0.0) {
				sleepTime = 0.0;

			}
		}

		this.timeouts.push(setTimeout(function() {
			// scroll to this point for this frame
			window.scrollTo(0, currentY);

			// splice out this timeout element
			_this.timeouts.splice(0, 1);

			// recursively call ourselves again IF we are within bounds this function again
			currentY += updateFunction(currentY, stopY, scrollRate);

			var endTime = (new Date).getTime();
			var computedBufferTime  = sleepTime - (endTime - _startTime);

			if(computedBufferTime > 0.0) {
				// no buffer time
				computedBufferTime = 0.0;

			}

			if(direction === "down" && currentY < stopY) {
				// call ourselves again, going down further
				_this.runFrame(currentY, stopY, scrollRate, sleepTime, computedBufferTime, updateFunction, direction);

			} else if(direction === "up" && stopY < currentY) {
				// call ourselves again, going up further
				_this.runFrame(currentY, stopY, scrollRate, sleepTime, computedBufferTime, updateFunction, direction);

			}

		}, sleepTime));
	}
};

SmoothScroller = new SmoothScroller();
