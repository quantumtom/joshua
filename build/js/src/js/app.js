/**
 * @license MIT
 *
<<<<<<< HEAD
 * @module APP
 */

"use strict";

var APP = {};

APP = {
    /** Initialize some properties. Call the main function. */
    init: function () {

        APP.view = {
            panelRoot: document.getElementById("panelRoot"),
            theEnhancementList: document.getElementById("theEnhancementList"),
            theMapList: document.getElementById("theMapList"),
            removeImages: function() {
                /** Removes all the image elements from the page. */
                while (APP.view.panelRoot.firstChild) {
                    APP.view.panelRoot.removeChild(APP.view.panelRoot.firstChild);
                }
            },
            getTheMap: function () {
                return APP.view.theMapList[APP.view.theMapList.selectedIndex].value;
            },
            getEnhancement: function () {
                var theEnhancementList = APP.view.theEnhancementList;

                return theEnhancementList[theEnhancementList.selectedIndex].value;
            }
        };

        APP.theMap = APP.view.getTheMap();

        APP.thePast = function () {
            var thePast = new Date(),
                theHours = thePast.getHours();
            thePast.setHours(theHours - 4);

            return thePast;
        };

        APP.run();

    },

    util: {

        /**
         * Takes a places count in Base-10 (ones, tens, hundreds) and prepends
         * it (concatenates it with) a numeric string) that is
         * passed in as the first parameter.
         * @param i
         * @param places
         * @returns {string}
         */
        padZeroes: function(i, places) {

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
        dayOfYear: function(myDate) {

            var theMonth = myDate.getMonth(),
                theDate = myDate.getDate(),
=======
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

        WOPR.viewerPanel = document.getElementById("viewerPanel");
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
>>>>>>> f1b49b0eeaa9a3aa0c0a3050c54e2f9da4cc6c32
                monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                theDayOfTheYear = 0,
                i;

<<<<<<< HEAD
            /**
             * Check for leap year.
             */
            if (myDate.getYear() % 4) {
=======
            /** Check for leap year. */

            if (this.getYear() % 4) {
>>>>>>> f1b49b0eeaa9a3aa0c0a3050c54e2f9da4cc6c32
                monthDays[1] = 28;
            }

            for (i = 0; i < theMonth; i =  i + 1) {
                theDayOfTheYear += monthDays[i];
            }

            theDayOfTheYear += theDate;

            return theDayOfTheYear;
<<<<<<< HEAD

        },
=======
        };
>>>>>>> f1b49b0eeaa9a3aa0c0a3050c54e2f9da4cc6c32

        /**
         * Takes a value between 0 - 59 and returns either the
         * bottom or top half of the hour.
<<<<<<< HEAD
         * @param m
         * @param p
         * @returns {number}
         */
        parseMinutes: function(m, p) {

            m = m / p;

            m = Math.floor(m);

            return m * p;

        }

    },

    run: function () {
=======
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
>>>>>>> f1b49b0eeaa9a3aa0c0a3050c54e2f9da4cc6c32

        /**
         * This function dynamically generates the NOAA-specific file path for the remote
         * image resources.
         * @param thePast
         * @returns {string}
         */
<<<<<<< HEAD
        function getURI(thePast) {
=======

        function makeURI(thePast) {
>>>>>>> f1b49b0eeaa9a3aa0c0a3050c54e2f9da4cc6c32

            var theYear = thePast.getFullYear(),
                theMinutes = thePast.getMinutes(),
                theHours = thePast.getHours(),
<<<<<<< HEAD
                theDays = APP.util.dayOfYear(thePast),
                baseURI = "http://www.ssd.noaa.gov/" + APP.view.getTheMap() + "/img/",
                thePeriod = 30,
                theOffset = 0,
                theEnhancement = APP.view.getEnhancement(),
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

=======
                theDays = thePast.getDayOfYear(),
                thePeriod = 30,
                theOffset = 0;

            var theEnhancement = WOPR.theEnhancementList[WOPR.theEnhancementList.selectedIndex].value;
            var baseURI = "http://www.ssd.noaa.gov/" + WOPR.theMapList[WOPR.theMapList.selectedIndex].value + "/img/";

            theDays = theDays.padZeroes(3);
            theHours = theHours.padZeroes(2);

            /** Handle differences in the timing between the satellite image delivery. */

            /** MTSAT: 32 minute offset from GOES-West */
>>>>>>> f1b49b0eeaa9a3aa0c0a3050c54e2f9da4cc6c32
            if (baseURI.search("mtsat") >= 0) {
                thePeriod = 59;
                theOffset = 32;
            }

<<<<<<< HEAD
=======
            /** GOES-East: 15 minute offset from GOES-West */
>>>>>>> f1b49b0eeaa9a3aa0c0a3050c54e2f9da4cc6c32
            if (baseURI.search("east") >= 0) {
                theOffset = 15;
            }

<<<<<<< HEAD
            theMinutes = parseMinutes(theMinutes, thePeriod);

            /**
             * Add the offfset.
             */
            theMinutes = theMinutes + theOffset;

            /**
             *  Add a leading zero if the _minutes_ value is a single-digit.
             */
            theMinutes = padZeroes(theMinutes, 2);
=======
            theMinutes = theMinutes.parseMinutes(thePeriod);

            /** Add the offfset. */
            theMinutes = theMinutes + theOffset;


            /** Add a leading zero if the _minutes_ value is a single-digit. */
            if (theMinutes === 0) {
                theMinutes = '00';
            } else {
                theMinutes.padZeroes(2);
            }
>>>>>>> f1b49b0eeaa9a3aa0c0a3050c54e2f9da4cc6c32

            return baseURI + theYear + theDays + "_" + theHours + theMinutes + theEnhancement + ".jpg";
        }

<<<<<<< HEAD
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

            APP.view.removeImages();

            for (frameNumber = 0; frameNumber < 20; frameNumber = frameNumber + 1) {

                frame = document.createElement("img");

                frame.src = getURI(thePast);

                frame.classList.add("hidden");
                frame.classList.add("frame");
                frame.setAttribute("alt", "Image " + frameNumber + " unavailable.");

                APP.view.panelRoot.appendChild(frame);

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

        APP.view.theMapList.addEventListener("change", function () {
            load();
        });

        APP.view.theEnhancementList.addEventListener("change", function () {
            load();
        });

    }

};

APP.init();
=======
        /** Remove any existing animation frames (images). */
        while (WOPR.viewerPanel.firstChild) {
            WOPR.viewerPanel.removeChild(WOPR.viewerPanel.firstChild);
        }

        function makeFrameArray() {

            var i;
            var frameArray = [];
            var thePast = new Date().getThePast();

            for (i = 0; i < 20; i = i + 1) {
                frameArray.push(makeURI(thePast));
                /** Advance to the next frame's timestamp **/
                thePast.setMinutes(thePast.getMinutes() + 30);
            }

            return frameArray;
        }

        var f;
        var fElement;
        var fArray = makeFrameArray();

        for (f = 0; f < fArray.length; f = f + 1) {

            fElement = document.createElement("img");

            fElement.src = fArray[f];

            fElement.setAttribute("alt", "Satellite Weather Image #" + f.padZeroes(2));
            fElement.classList.add("hidden");
            fElement.classList.add("frame");

            WOPR.viewerPanel.appendChild(fElement);

        }

    };

    /**
     * This is the animation "player" that shows and hides the individual
     * frames of the animation.
     * @param n
     */

    WOPR.animate = function (n) {

        var theInterval = 133;
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
>>>>>>> f1b49b0eeaa9a3aa0c0a3050c54e2f9da4cc6c32
