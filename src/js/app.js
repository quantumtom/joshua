/**
 * @license MIT
 *
 * @module APP
 */

(function () {

    'use strict';

    var APP = {};

    APP.initialize = function () {

        APP.panelRoot = document.getElementById("panelRoot");
        APP.theEnhancementList = document.getElementById("theEnhancementList");
        APP.theMapList = document.getElementById("theMapList");

        APP.theMapList.addEventListener("change", function () {
            APP.loadFrames();
        });

        APP.theEnhancementList.addEventListener("change", function () {
            APP.loadFrames();
        });

    };

    /**
     * This is the animation "player" that shows and hides the individual
     * frames of the animation.
     * @param n
     */
    APP.animate = function (n) {

        function animate(n) {

            var theInterval = 50,
                frame = document.getElementsByClassName("frame");

            if (!n) {
                n = 0;
            }

            setTimeout(function () {

                /**
                 * Run through all but the final frame.
                 */

                if (n < frame.length - 1) {

                    frame.item(n).classList.add("hidden");

                    n = n + 1;

                    frame.item(n).classList.remove("hidden");

                    animate(n);

                } else {

                    /**
                     * Otherwise, we're on the final frame (#19)
                     */

                    frame.item(n).classList.add("hidden");

                    /**
                     * Set the first frame back to visible.
                     */

                    frame.item(0).classList.remove("hidden");

                    /**
                     * Call this function recursively to loop it.
                     */

                    animate(0);

                }


            }, theInterval);

        }

        return animate(n);

    };

    APP.main = function () {

        APP.initialize();

        APP.loadFrames();

        APP.animate(0);

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

    APP.loadFrames = function() {

        function getEnhancement() {
            var theEnhancementList = APP.theEnhancementList;

            return theEnhancementList[theEnhancementList.selectedIndex].value;
        }

        function getThePast() {
            var thePresent = new Date();
            var theHours = thePresent.getHours();

            thePresent.setHours(theHours - 4);

            return thePresent;
        }

        /**
         * Takes a value between 0 - 59 and returns either the
         * bottom or top half of the hour.
         * @param m
         * @param p
         * @returns {number}
         */
        function parseMinutes(m, p) {

            m = m / p;
            m = Math.floor(m);

            return m * p;

        }

        /**
         * Takes a places count in Base-10 (ones, tens, hundreds) and prepends
         * it (concatenates it with a numeric string) that is
         * passed in as the first parameter.
         * @param i
         * @param places
         * @returns {string}
         */
        function padZeroes(i, places) {

            var j;
            var theString = "";

            theString += i;

            for (j = 0; j < places; j = j + 1) {
                if (theString.length < places) {
                    theString = "0" + theString;
                }
            }

            return theString;

        }

        /**
         * Takes a date and calculates how many days into the year that date is.
         * @param myDate
         * @returns {number}
         */
        function dayOfYear(myDate) {

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
        }

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
                theDays = dayOfYear(thePast),
                baseURI = "http://www.ssd.noaa.gov/" + APP.theMapList[APP.theMapList.selectedIndex].value + "/img/",
                thePeriod = 30,
                theOffset = 0,
                theEnhancement = getEnhancement();

            theDays = padZeroes(theDays, 3);
            theHours = padZeroes(theHours, 2);

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

            theMinutes = parseMinutes(theMinutes, thePeriod);

            /**
             * Add the offfset.
             */
            theMinutes = theMinutes + theOffset;

            /**
             *  Add a leading zero if the _minutes_ value is a single-digit.
             */
            theMinutes = padZeroes(theMinutes, 2);

            return baseURI + theYear + theDays + "_" + theHours + theMinutes + theEnhancement + ".jpg";
        }

        /**
         * Remove images.
         */

        while (APP.panelRoot.firstChild) {
            APP.panelRoot.removeChild(APP.panelRoot.firstChild);
        }

        var thePast = getThePast();
        var frameNumber;
        var frame;

        for (frameNumber = 0; frameNumber < 20; frameNumber = frameNumber + 1) {

            frame = document.createElement("img");

            frame.src = getURI(thePast);

            frame.classList.add("hidden");
            frame.classList.add("frame");
            frame.setAttribute("alt", "Image " + frameNumber);

            APP.panelRoot.appendChild(frame);

            /** Advance to the next frame's timestamp **/
            thePast.setMinutes(thePast.getMinutes() + 30);
        }

    };

    APP.main();

}());
