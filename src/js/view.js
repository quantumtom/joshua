goog.provide('WOPR.view');

/**
 * @license MIT
 *
 * @module View
 *
 */
(function () {

    'use strict';

    var View;

    View = function () {
        this.init = function () {
            this.interval = 160;
        };
        /**
         * Animates the individual image frames.
         * @param {number} n
         */

        this.animateFrames = function (n) {

            var theFrames = document.getElementsByClassName('frame');
            var that = this;

            if ((!n) || (n === null)) {
                n = 0;
            }

            setTimeout(function () {

                theFrames.item(n).classList.add('hidden');

                if (n < theFrames.length - 1) {
                    n = n + 1;
                } else {
                    n = 0;
                }

                theFrames.item(n).classList.remove('hidden');

                that.animateFrames(n);


            }, this.interval);

        };

        return this;
    };

    WOPR.view = new View();

}());
