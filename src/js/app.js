/**
 * @license MIT
 *
 * @module WOPR
 */

(function () {

    'use strict';

    var WOPR = function () {
        /**
         *
         * This is our interface to get still images. In this case, we're getting them from NOAA.
         * The guts of the code needed to build the URIs is in its own section at the end. This way, we give ourselves
         * room to make this part modular.
         *
         * @type {WOPR.NOAA}
         */

        WOPR.setUpDOM();
        WOPR.addHelpers();
        WOPR.injectFrames();
        WOPR.animate();
    };

    WOPR.setUpDOM = function () {

        WOPR.viewerPanel = document.getElementById("viewerPanel");

        WOPR.theMapList = document.getElementById("theMapList");
        WOPR.theEnhancementList = document.getElementById("theEnhancementList");

        WOPR.theMapList.addEventListener("change", function () {
            WOPR.injectFrames();
        });

        WOPR.theEnhancementList.addEventListener("change", function () {
            WOPR.injectFrames();
        });

    };

    /**
     * We extend two of the native JS objects (Date and Number) by prototyping new member methods on to them. We
     * probably ought to decouple them from the built-in objects, but for now this works okay.
     */

    WOPR.addHelpers = function () {

        WOPR.noaa = new WOPR.NOAA();

        /**
         * Takes the current date and returns a date object set back to allow
         * for processing by NOAA SSD.
         * @returns {Date}
         */

        Date.prototype.getThePast = function() {
            var theDate = this;
            var theMinutes = theDate.getMinutes();

            /** The  */
            theDate.setMinutes(theMinutes - 45);

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
     */

    WOPR.injectFrames = function() {

        var fCount;
        var fElement;
        var fArray = WOPR.noaa.makeFrameArray();

        /** First, remove any existing animation frames (images). */
        while (WOPR.viewerPanel.firstChild) {
            WOPR.viewerPanel.removeChild(WOPR.viewerPanel.firstChild);
        }

        /** Next, build image tags for each frame of the animated loop. Then inject each into the DOM. */
        for (fCount = 0; fCount < fArray.length; fCount++) {

            fElement = document.createElement("img");

            fElement.src = fArray[fCount];

            fElement.setAttribute("alt", "Image #" + fCount.padZeroes(2));
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

        var theInterval = 160;
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

    WOPR.NOAA = function () {

        this.makeFrameArray = function () {
            var thePast = new Date().getThePast();

            var i;
            var tempArray = [];

            for (i = 0; i < 14; i = i + 1) {
                tempArray.push(makeURI(thePast));
                /** Advance to the next frame's timestamp **/
                thePast.setMinutes(thePast.getMinutes() + 30);
            }

            return tempArray;
        };

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
                thePeriod = 30;

            var NOAA_URI = {
                protocol: "http://",
                server: "www.ssd.noaa.gov/",
                enhancement: WOPR.theEnhancementList[WOPR.theEnhancementList.selectedIndex].value,
                map: WOPR.theMapList[WOPR.theMapList.selectedIndex].value,
                medium: "/img/"
            };

            function buildURI(uri) {
                return uri.protocol + uri.server + uri.map + uri.medium;
            }

            var baseURI = buildURI(NOAA_URI);

            theDays.padZeroes(3);
            theHours.padZeroes(2);

            /**
             * Each satellite generates an image every thirty minutes. The second satellite timing is
             * offset fifteen minutes from the first.
             *
             * Example:
             *
             * GOES-N timing        1200Z    |   1230Z    |   1300Z    |   1330Z
             * GOES-P timing        1215Z    |   1245Z    |   1315Z    |   1345Z
             */

            /** Handle differences in the timing between the satellite image delivery. */

            theMinutes = theMinutes.parseMinutes(thePeriod);

            /** GOES-East: 15 minute offset from GOES-West */
            if (baseURI.search("east") >= 0) {
                /** Add the offfset. */
                theMinutes = theMinutes + 15;
            }

            /** Add a leading zero if the _minutes_ value is for the top of the hour. */
            if (theMinutes === 0) {
                theMinutes = '00';
            } else {
                theMinutes.padZeroes(2);
            }

            return baseURI + theYear + theDays + "_" + theHours + theMinutes + NOAA_URI.enhancement + ".jpg";
        }
    };

    WOPR.call();

}());
