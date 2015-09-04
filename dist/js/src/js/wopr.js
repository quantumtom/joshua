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
        WOPR.animateFrames(0);
    };

    WOPR.controls = {
        mapList: document.getElementById('mapList'),
        enhancementList: document.getElementById('enhancementList')
    };

    WOPR.init = function() {
        WOPR.interval = 160;
        WOPR.display = document.getElementById('display');
    };

    WOPR.getEnhancement = function() {
        return WOPR.controls.enhancementList[WOPR.controls.enhancementList.selectedIndex].value;
    };

    WOPR.getMap = function() {
        return WOPR.controls.mapList[WOPR.controls.mapList.selectedIndex].value;
    };

    WOPR.loadPage = function() {
        WOPR.resetStartTime();
        WOPR.wireEvents();
        WOPR.loadImages();
    };

    WOPR.resetStartTime = function() {
        var startTime = new Date();

        startTime.setUTCHours(startTime.getUTCHours() - 1);

        WOPR.setStartTime(startTime);
    };

    WOPR.setStartTime = function(newTime) {
        WOPR.startTime = newTime;
    };

    WOPR.wireEvents = function() {
        for (var item in WOPR.controls) {
            WOPR.controls[item].addEventListener('change', function() {
                WOPR.loadPage();
            });
        }
    };

    /**
     * Create an array of image elements into the DOM.
     */

    WOPR.loadImages = function() {
        var imgElement;
        var fArray = WOPR.buildFrames();

        WOPR.clearImages();

        /** Build image tags for each frame of the animated loop. Then inject each into the DOM. */
        for (var fCount = 0; fCount < fArray.length; fCount++) {

            imgElement = document.createElement('img');

            imgElement.src = fArray[fCount];

            imgElement.setAttribute('alt', 'Image #' + (fCount + 1).padZeroes(2));
            imgElement.classList.add('frame');
            imgElement.classList.add('hidden');

            WOPR.display.appendChild(imgElement);
        }
    };

    WOPR.clearImages = function() {
        while (WOPR.display.firstChild) {
            WOPR.display.removeChild(WOPR.display.firstChild);
        }
    };

    WOPR.buildFrames = function() {
        var i;
        var tempArray = [];
        var newTime;

        newTime = WOPR.startTime;

        for (i = 0; i < 15; i = i + 1) {
            tempArray.push(WOPR.getURI());
            newTime.setUTCMinutes(newTime.getUTCMinutes() + 30);
            WOPR.setStartTime(newTime);
        }

        return tempArray;
    };

    /**
     * This function dynamically generates the NOAA-specific file path for the remote
     * image resources.
     * @returns {string}
     */

    WOPR.getURI = function() {
        return WOPR.getPath() + WOPR.getFileName();
    };

    WOPR.getPath = function() {
        return 'http://www.ssd.noaa.gov/' + WOPR.getMap() + '/img/';
    };

    WOPR.getFileName = function() {
        return WOPR.getTimeStamp() + WOPR.getEnhancement() + '.jpg';
    };

    WOPR.getTimeStamp = function() {
        var theMinute = WOPR.startTime.getFormattedMinute();

        theMinute = WOPR.adjustForSatellite(theMinute);
        theMinute = WOPR.adjustForZeroMinutes(theMinute);

        return WOPR.startTime.getFullYear() + WOPR.startTime.getDayOfYear() +
            '_' + WOPR.startTime.getFormattedHour() + theMinute;
    };

    WOPR.adjustForSatellite = function(theMinute) {
        var theMap = WOPR.getMap();

        /** GOES-East: 15 minute offset from GOES-West */
        if (theMap.search('east') > 0) {
            return theMinute + 15;
        } else {
            return theMinute;
        }
    };

    WOPR.adjustForZeroMinutes = function(theMinute) {
        /** Add a leading zero if the _minutes_ value is for the top of the hour. */
        if (theMinute === 0) {
            return '00';
        } else {
            return theMinute.padZeroes(2);
        }
    };

    /**
     * Animates the individual image frames.
     * @param {number} n
     */

    WOPR.animateFrames = function(n) {

        var theFrames = document.getElementsByClassName('frame');

        if ((n == '') || (n == null) || (typeof n == null)) {
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

            WOPR.animateFrames(n);


        }, WOPR.interval);

    };

    WOPR.call();

}());
