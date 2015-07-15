/**
 * @license MIT
 *
 * @module APP
 */

(function () {
    'use strict';

    var APP = {};

    APP.init = function () {
        APP.panelRoot = document.getElementById("panelRoot");
        APP.theEnhancementList = document.getElementById("theEnhancementList");
        APP.theMapList = document.getElementById("theMapList");

        APP.removeImages = function () {
            while (APP.panelRoot.firstChild) {
                APP.panelRoot.removeChild(APP.panelRoot.firstChild);
            }
        };

        APP.getEnhancement = function () {
            var theEnhancementList = APP.theEnhancementList;

            return theEnhancementList[theEnhancementList.selectedIndex].value;
        };

        APP.thePast = function () {
            var thePast = new Date(),
                theHours = thePast.getHours();
            thePast.setHours(theHours - 4);

            return thePast;
        };

        APP.run();
    };

    APP.util = {

        /**
         * Takes a places count in Base-10 (ones, tens, hundreds) and prepends
         * it (concatenates it with) a numeric string) that is
         * passed in as the first parameter.
         * @param i
         * @param places
         * @returns {string}
         */
        padZeroes: function (i, places) {

            var j,
                theString = "";

            theString += i;

            for (j = 0; j < places; j = j + 1) {
                if (theString.length < places) {
                    theString = "0" + theString;
                }
            }

            return theString;

        },

        /**
         * Takes a date and calculates how many days into the year that date is.
         * @param myDate
         * @returns {number}
         */
        dayOfYear: function (myDate) {

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

        },

        /**
         * Takes a value between 0 - 59 and returns either the
         * bottom or top half of the hour.
         * @param m
         * @param p
         * @returns {number}
         */
        parseMinutes: function (m, p) {

            m = m / p;

            m = Math.floor(m);

            return m * p;

        }

    };

    APP.run = function () {

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
                theDays = APP.util.dayOfYear(thePast),
                baseURI = "http://www.ssd.noaa.gov/" + APP.theMapList[APP.theMapList.selectedIndex].value + "/img/",
                thePeriod = 30,
                theOffset = 0,
                theEnhancement = APP.getEnhancement(),
                padZeroes = APP.util.padZeroes,
                parseMinutes = APP.util.parseMinutes;

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
         * This subroutine injects image DOM nodes. It calculates the URI for each image
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
        function load() {

            var thePast = APP.thePast(),
                frameNumber,
                frame;

            APP.removeImages();

            for (frameNumber = 0; frameNumber < 20; frameNumber = frameNumber + 1) {

                frame = document.createElement("img");

                frame.src = getURI(thePast);

                frame.classList.add("hidden");
                frame.classList.add("frame");
                frame.setAttribute("alt", "Image " + frameNumber + " unavailable.");

                APP.panelRoot.appendChild(frame);

                /** Advance to the next frame's timestamp **/
                thePast.setMinutes(thePast.getMinutes() + 30);

            }

        }

        /**
         * This is the animation "player" that shows and hides the individual
         * frames of the animation.
         * @param f
         */
        function animate(f) {

            var theInterval = 133,
                frame = document.getElementsByClassName("frame");

            if (!f) {
                f = 0;
            }

            /**
             * This is sort of a hybrid for-while loop.
             */

            setTimeout(function () {

                /**
                 * Run through all but the final frame.
                 */

                if (f < frame.length - 1) {

                    frame.item(f).classList.add("hidden");

                    f =  f + 1;

                    frame.item(f).classList.remove("hidden");

                    animate(f);

                } else {

                    /**
                     * Last frame (19)
                     */

                    frame.item(f).classList.add("hidden");

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

        load();

        animate(0);

        APP.theMapList.addEventListener("change", function () {
            load();
        });

        APP.theEnhancementList.addEventListener("change", function () {
            load();
        });

    };

    APP.init();

}());
