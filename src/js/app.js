/**
 * @license MIT
 *
 * @module WOPR
 */

(function () {

    'use strict';

    var WOPR = {};

    WOPR.main = function () {

        WOPR.setup();
        WOPR.initialize();
        WOPR.loadFrames();
        WOPR.animate();

    };

    WOPR.setup = function () {

        WOPR.panelRoot = document.getElementById("panelRoot");
        WOPR.theMapList = document.getElementById("theMapList");
        WOPR.theEnhancementList = document.getElementById("theEnhancementList");

        WOPR.theMapList.addEventListener("change", function () {
            WOPR.loadFrames();
        });

        WOPR.theEnhancementList.addEventListener("change", function () {
            WOPR.loadFrames();
        });

    };

    WOPR.initialize = function () {

        /**
         *
         * @returns {Date}
         */

        Date.prototype.getThePast = function() {
            var theDate = new Date();
            var theHours = theDate.getHours();

            theDate.setHours(theHours - 4);

            return theDate;
        };

        /**
         * Takes a date and calculates how many days into the year that date is.
         * @returns {Number}
         */

        Date.prototype.getDayOfYear = function() {
            var theMonth = this.getMonth(),
                theDate = this.getDate(),
                monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                theDayOfTheYear = 0,
                i;

            /** Check for leap year. */

            if (this.getYear() % 4) {
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
         * @param thePeriod
         * @returns {Number}
         */

        Number.prototype.parseMinutes = function(thePeriod) {
            var theMinutes = this;

            theMinutes = theMinutes / thePeriod;
            theMinutes = Math.floor(theMinutes);
            theMinutes = theMinutes * thePeriod;

            return theMinutes;
        };

        /**
         * Takes a places count in Base-10 (ones, tens, hundreds) and prepends
         * it (concatenates it with a numeric string) that is
         * passed in as the first parameter.
         * @param places
         * @returns {String}
         */

        Number.prototype.padZeroes = function (places) {
            var oldString = this.toString();

            while (oldString.length < places) {
                oldString = '0' + oldString;
            }

            return oldString;
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

        /**
         * This function dynamically generates the NOAA-specific file path for the remote
         * image resources.
         * @param thePast
         * @returns {string}
         */

        function makeURI(thePast) {

            var theYear = thePast.getFullYear(),
                theMinutes = thePast.getMinutes(),
                theHours = thePast.getHours(),
                theDays = thePast.getDayOfYear(),
                thePeriod = 30,
                theOffset = 0;

            var theEnhancement = WOPR.theEnhancementList[WOPR.theEnhancementList.selectedIndex].value;
            var baseURI = "http://www.ssd.noaa.gov/" + WOPR.theMapList[WOPR.theMapList.selectedIndex].value + "/img/";

            theDays = theDays.padZeroes(3);
            theHours = theHours.padZeroes(2);

            /** Handle differences in the timing between the satellite image delivery. */

            /** MTSAT: 32 minute offset from GOES-West */
            if (baseURI.search("mtsat") >= 0) {
                thePeriod = 59;
                theOffset = 32;
            }

            /** GOES-East: 15 minute offset from GOES-West */
            if (baseURI.search("east") >= 0) {
                theOffset = 15;
            }

            theMinutes = theMinutes.parseMinutes(thePeriod);

            /** Add the offfset. */
            theMinutes = theMinutes + theOffset;


            /** Add a leading zero if the _minutes_ value is a single-digit. */
            if (theMinutes === 0) {
                theMinutes = '00';
            } else {
                theMinutes.padZeroes(2);
            }

            return baseURI + theYear + theDays + "_" + theHours + theMinutes + theEnhancement + ".jpg";
        }

        /** Remove any existing animation frames (images). */
        while (WOPR.panelRoot.firstChild) {
            WOPR.panelRoot.removeChild(WOPR.panelRoot.firstChild);
        }

        function makeFrameArray() {

            var i;
            var frameArray = [];

            for (i = 0; i < 20; i = i + 1) {
                frameArray.push(makeURI(thePast));
                /** Advance to the next frame's timestamp **/
                thePast.setMinutes(thePast.getMinutes() + 30);
            }

            return frameArray;
        }

        var thePast = new Date().getThePast();
        var f;
        var frameElement;
        var frameArray = makeFrameArray();

        for (f = 0; f < frameArray.length; f = f + 1) {

            frameElement = document.createElement("img");

            frameElement.src = frameArray[f];

            frameElement.setAttribute("alt", "Satellite Weather Image #" + f.padZeroes(2));
            frameElement.classList.add("hidden");
            frameElement.classList.add("frame");

            WOPR.panelRoot.appendChild(frameElement);

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
