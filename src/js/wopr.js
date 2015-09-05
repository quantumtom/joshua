goog.provide('WOPR.main');

goog.require('WOPR.helpers');

/**
 * @license MIT
 *
 * @module WOPR.main
 *
 * Each satellite generates an image every thirty minutes. The second satellite timing is
 * offset fifteen minutes from the first.
 *
 * Example:
 *
 * GOES-N timing        1200Z    |   1230Z    |   1300Z    |   1330Z
 * GOES-P timing        1215Z    |   1245Z    |   1315Z    |   1345Z
 */

(function () {

    'use strict';

    var WOPR = function () {
        WOPR.init();
        WOPR.loadPage();
        WOPR.animateFrames(0);
    };

    WOPR.init = function () {
        this.interval = 160;
        this.display = document.getElementById('display');

        this.controls = {
            regionList: document.getElementById('regionList'),
            enhancementList: document.getElementById('enhancementList')
        };

        this.getEnhancement = function () {
            return this.controls.enhancementList[this.controls.enhancementList.selectedIndex].value;
        };

        this.getMap = function () {
            return this.controls.regionList[this.controls.regionList.selectedIndex].value;
        };

        this.setStartTime = function (newTime) {
            this.startTime = newTime;
        };

        function getPath() {
            return 'http://www.ssd.noaa.gov/' + WOPR.getMap() + '/img/';
        }

        function getTimeStamp() {
            function adjustForSatellite(theMinute) {
                var theMap = WOPR.getMap();

                /** GOES-East: 15 minute offset from GOES-West */
                if (theMap.search('east') > 0) {
                    theMinute = theMinute + 15;
                }

                return theMinute;
            }

            function adjustForZeroMinutes(theMinute) {
                /** Add a leading zero if the _minutes_ value is for the top of the hour. */
                if (theMinute === 0) {
                    theMinute = '00';
                } else {
                    theMinute.padZeroes(2);
                }

                return theMinute;
            }

            var theMinute = WOPR.startTime.getFormattedMinute();

            theMinute = adjustForSatellite(theMinute);
            theMinute = adjustForZeroMinutes(theMinute);

            return WOPR.startTime.getFullYear() + WOPR.startTime.getDayOfYear() +
                '_' + WOPR.startTime.getFormattedHour() + theMinute;
        }

        function getFileName() {
            return getTimeStamp() + WOPR.getEnhancement() + '.jpg';
        }

        /**
         * Dynamically generates the NOAA-specific file path for the remote image resources.
         * @returns {string}
         */

        this.getURI = function () {
            return getPath() + getFileName();
        };

        this.getFrames = function () {
            var tempArray = [];
            var newTime = WOPR.startTime;
            var i;

            for (i = 0; i < 15; i = i + 1) {
                tempArray.push(WOPR.getURI());
                newTime.setUTCMinutes(newTime.getUTCMinutes() + 30);
                WOPR.setStartTime(newTime);
            }

            return tempArray;
        };


    };

    WOPR.loadPage = function () {
        var startTime = new Date();
        var item;

        this.change = function () {
            WOPR.loadPage();
        };

        startTime.setUTCHours(startTime.getUTCHours() - 1);

        WOPR.setStartTime(startTime);

        for (item in WOPR.controls) {
            if (WOPR.controls.hasOwnProperty(item)) {
                WOPR.controls[item].addEventListener('change', this.change.bind(this), false);
            }
        }

        WOPR.loadImages();
    };

    /**
     * Create an array of image elements into the DOM.
     */
    WOPR.loadImages = function () {
        var imgElement;
        var fArray = WOPR.getFrames();
        var c;

        /** Remove any images that may have been loaded previously. */
        while (WOPR.display.firstChild) {
            WOPR.display.removeChild(WOPR.display.firstChild);
        }

        /** Build image tags for each frame of the animated loop. Then inject each into the DOM. */
        for (c = 0; c < fArray.length; c = c + 1) {

            imgElement = document.createElement('img');

            imgElement.src = fArray[c];

            imgElement.setAttribute('alt', 'Image #' + (c + 1).padZeroes(2));
            imgElement.classList.add('frame');
            imgElement.classList.add('hidden');

            WOPR.display.appendChild(imgElement);
        }
    };

    /**
     * Animates the individual image frames.
     * @param {number} n
     */

    WOPR.animateFrames = function (n) {

        var theFrames = document.getElementsByClassName('frame');

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

            WOPR.animateFrames(n);


        }, WOPR.interval);

    };

    WOPR.call();

}());
