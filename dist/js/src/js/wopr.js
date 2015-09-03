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

(function() {

    'use strict';

    var WOPR = function() {
        WOPR.init();
        WOPR.loadPage();
        WOPR.animate(0);
    };

    WOPR.controls = {
        mapList: document.getElementById('mapList'),
        enhancementList: document.getElementById('enhancementList')
    };

    WOPR.init = function() {
        for (var i in WOPR.controls) {
            WOPR.controls[i].addEventListener('change', WOPR.loadPage());
        }

        WOPR.interval = 160;
        WOPR.display = document.getElementById('display');
    };

    WOPR.loadPage = function() {
        WOPR.theMap = WOPR.controls.mapList[WOPR.controls.mapList.selectedIndex].value;
        WOPR.theEnhancement = WOPR.controls.enhancementList[WOPR.controls.enhancementList.selectedIndex].value;

        /**
         * Create an array of image elements into the DOM.
         */

        var fCount;
        var fElement;
        var fArray = WOPR.makeFrames();

        while (WOPR.display.firstChild) {
            WOPR.display.removeChild(WOPR.display.firstChild);
        }

        /** Build image tags for each frame of the animated loop. Then inject each into the DOM. */
        for (fCount = 0; fCount < fArray.length; fCount++) {

            fElement = document.createElement('img');

            fElement.src = fArray[fCount];

            fElement.setAttribute('alt', 'Image #' + (fCount + 1).padZeroes(2));
            fElement.classList.add('frame');
            fElement.classList.add('hidden');

            WOPR.display.appendChild(fElement);
        }
    };

    /**
     * This function dynamically generates the NOAA-specific file path for the remote
     * image resources.
     * @param {Date} thePast
     * @returns {string}
     */

    WOPR.makeURI = function(thePast) {

        var baseURI = 'http://www.ssd.noaa.gov/' + WOPR.theMap + '/img/';
        var theYear = thePast.getFullYear();
        var theDay = thePast.getDayOfYear();
        var theHour = thePast.getFormattedHour();
        var theMinute = thePast.getFormattedMinute();
        var timeStamp = theYear + theDay + '_' + theHour;

        /** GOES-East: 15 minute offset from GOES-West */
        if (WOPR.theMap.search('east') >= 0) {
            theMinute = theMinute + 15;
        }

        /** Add a leading zero if the _minutes_ value is for the top of the hour. */
        if (theMinute === 0) {
            theMinute = '00';
        } else {
            theMinute.padZeroes(2);
        }

        timeStamp = timeStamp + theMinute;

        return baseURI + timeStamp + WOPR.theEnhancement + '.jpg';
    };

    WOPR.makeFrames = function() {
        var startTime = new Date();

        startTime.setUTCHours(startTime.getUTCHours() - 1);

        var i;
        var tempArray = [];

        for (i = 0; i < 15; i = i + 1) {
            tempArray.push(WOPR.makeURI(startTime));
            startTime.setUTCMinutes(startTime.getUTCMinutes() + 30);
        }

        return tempArray;
    };

    /**
     * Animates the individual image frames.
     * @param {number} n
     */

    WOPR.animate = function(n) {

        var theFrames = document.getElementsByClassName('frame');

        if ((n.toString() === '') || (n === null) || (typeof n === null)) {
            n = 0;
        }

        setTimeout(function() {

            theFrames.item(n).classList.add('hidden');

            if (n < theFrames.length - 1) {
                n = n + 1;
            } else {
                n = 0;
            }

            theFrames.item(n).classList.remove('hidden');

            WOPR.animate(n);


        }, WOPR.interval);

    };

    WOPR.call();

}());
