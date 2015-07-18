/**
 * @license MIT
 *
 * @module WOPR
 */

(function () {

    'use strict';

    var WOPR = {};

    WOPR.main = function () {

        WOPR.initialize();
        WOPR.loadFrames();
        WOPR.animate();

    };

    WOPR.initialize = function () {

        WOPR.panelRoot = document.getElementById("panelRoot");
        WOPR.theEnhancementList = document.getElementById("theEnhancementList");
        WOPR.theMapList = document.getElementById("theMapList");

        WOPR.theMapList.addEventListener("change", function () {
            WOPR.loadFrames();
        });

        WOPR.theEnhancementList.addEventListener("change", function () {
            WOPR.loadFrames();
        });

        WOPR.util = new WOPR.utilities();

    };

    WOPR.utilities = function () {
        /**
         * Takes a date and calculates how many days into the year that date is.
         * @param myDate
         * @returns {number}
         */
        this.dayOfYear = function(myDate) {

            var theMonth = myDate.getMonth(),
                theDate = myDate.getDate(),
                monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                theDayOfTheYear = 0,
                i;

            /**
             * Check for leap year.
             */
            if (myDate.getYear() % 4) {
                monthDays[1] = 28;
            }

            for (i = 0; i < theMonth; i =  i + 1) {
                theDayOfTheYear += monthDays[i];
            }

            theDayOfTheYear += theDate;

            return theDayOfTheYear;
        };

        /**
         * Takes a value between 0 - 59 and returns either the
         * bottom or top half of the hour.
         * @param m
         * @param p
         * @returns {number}
         */
        this.parseMinutes = function(m, p) {

            m = m / p;
            m = Math.floor(m);

            return m * p;

        };

        /**
         * Takes a places count in Base-10 (ones, tens, hundreds) and prepends
         * it (concatenates it with a numeric string) that is
         * passed in as the first parameter.
         * @param i
         * @param places
         * @returns {string}
         */
        this.padZeroes = function(i, places) {

            var j;
            var theString = "";

            theString += i;

            for (j = 0; j < places; j = j + 1) {
                if (theString.length < places) {
                    theString = "0" + theString;
                }
            }

            return theString;

        };

        this.getEnhancement = function() {
            var theEnhancementList = WOPR.theEnhancementList;

            return theEnhancementList[theEnhancementList.selectedIndex].value;
        };

        this.getThePast = function() {
            var thePresent = new Date();
            var theHours = thePresent.getHours();

            thePresent.setHours(theHours - 4);

            return thePresent;
        };

    };

    /**
     * Injects image DOM nodes. It calculates the URI for each image
     * used as frames in the imagination to use as values for the src
     * attributes in each image element on the page.
     *
     * Each satellite generates an image every thirty minutes. The second satellite timing is
     * offset fifteen minutes from the first.
     *
     * E.G.
     *
     * GOES-N timing        1200Z    |   1230Z    |   1300Z    |   1330Z
     * GOES-P timing        1215Z    |   1245Z    |   1315Z    |   1345Z
     *
     */

    WOPR.loadFrames = function() {

        var util = WOPR.util;

        /**
         * This function dynamically generates the NOAA-specific file path for the remote
         * image resources.
         * @param thePast
         * @returns {string}
         */
        function getURI(thePast) {

            var theYear = thePast.getFullYear(),
                theMinutes = thePast.getMinutes(),
                theHours = thePast.getHours(),
                theDays = util.dayOfYear(thePast),
                baseURI = "http://www.ssd.noaa.gov/" + WOPR.theMapList[WOPR.theMapList.selectedIndex].value + "/img/",
                thePeriod = 30,
                theOffset = 0;

            theDays = util.padZeroes(theDays, 3);
            theHours = util.padZeroes(theHours, 2);

            /**
             * Handle differences in the timing between the satellite
             * image delivery.
             *
             * GOES-West: 0
             * GOES-East: 15
             * MTSAT: 32
             *
             **/

            if (baseURI.search("mtsat") >= 0) {
                thePeriod = 59;
                theOffset = 32;
            }

            if (baseURI.search("east") >= 0) {
                theOffset = 15;
            }

            theMinutes = util.parseMinutes(theMinutes, thePeriod);

            /** Add the offfset. */
            theMinutes = theMinutes + theOffset;

            /** Add a leading zero if the _minutes_ value is a single-digit. */
            theMinutes = util.padZeroes(theMinutes, 2);

            return baseURI + theYear + theDays + "_" + theHours + theMinutes + util.getEnhancement() + ".jpg";
        }

        /** Remove any existing animation frames (images). */
        while (WOPR.panelRoot.firstChild) {
            WOPR.panelRoot.removeChild(WOPR.panelRoot.firstChild);
        }

        var thePast = util.getThePast();
        var frameNumber;
        var frameElement;

        for (frameNumber = 0; frameNumber < 20; frameNumber = frameNumber + 1) {

            frameElement = document.createElement("img");

            frameElement.src = getURI(thePast);

            frameElement.classList.add("hidden");
            frameElement.classList.add("frame");
            frameElement.setAttribute("alt", "Image " + frameNumber);

            WOPR.panelRoot.appendChild(frameElement);

            /** Advance to the next frame's timestamp **/
            thePast.setMinutes(thePast.getMinutes() + 30);
        }

    };

    /**
     * This is the animation "player" that shows and hides the individual
     * frames of the animation.
     * @param n
     */
    WOPR.animate = function (n) {

        var theInterval = 50;
        var theFrames = document.getElementsByClassName("frame");

        if (!n) {
            n = 0;
        }

        setTimeout(function () {

            theFrames.item(n).classList.add("hidden");

            if (n < theFrames.length - 1) {
                n = n + 1;
            } else {
                n = 0;
            }

            theFrames.item(n).classList.remove("hidden");

            WOPR.animate(n);


        }, theInterval);

    };

    WOPR.main();

}());
