goog.provide('APP');

/**
 * @license MIT
 *
 * @module WOPR
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
        WOPR.viewerPanel = document.getElementById("viewerPanel");
        WOPR.theMapList = document.getElementById("theMapList");
        WOPR.theEnhancementList = document.getElementById("theEnhancementList");

        WOPR.addTriggers();
        WOPR.addHelpers();
        WOPR.loadPage();
        WOPR.animate();
    };

    WOPR.addTriggers = function () {

        WOPR.theMapList.addEventListener("change", function () {
            WOPR.loadPage();
        });

        WOPR.theEnhancementList.addEventListener("change", function () {
            WOPR.loadPage();
        });

    };

    WOPR.getInputs = function () {
        WOPR.theMap = WOPR.theMapList[WOPR.theMapList.selectedIndex].value;
        WOPR.theEnhancement = WOPR.theEnhancementList[WOPR.theEnhancementList.selectedIndex].value;
    };

    WOPR.loadPage = function () {
        WOPR.getInputs();
        WOPR.cleanFrames();
        WOPR.injectFrames();
    };

    WOPR.addHelpers = function () {

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

            return theDayOfTheYear.padZeroes(3);
        };

        Date.prototype.getFormattedHour = function () {
            var theHour = this.getHours();
            return theHour.padZeroes(2);
        };

        Date.prototype.getFormattedMinute = function () {
            var theMinute = this.getMinutes();

            return theMinute.parseMinutes(30);
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
     * This function dynamically generates the NOAA-specific file path for the remote
     * image resources.
     * @param thePast
     * @returns {string}
     */

    WOPR.makeURI = function(thePast) {

        var baseURI = "http://www.ssd.noaa.gov/" + WOPR.theMap + "/img/";
        var theYear = thePast.getFullYear();
        var theDay = thePast.getDayOfYear();
        var theHour = thePast.getFormattedHour();
        var theMinute = thePast.getFormattedMinute();
        var timeStamp;

        /** GOES-East: 15 minute offset from GOES-West */
        if (baseURI.search("east") >= 0) {
            theMinute = theMinute + 15;
        }

        /** Add a leading zero if the _minutes_ value is for the top of the hour. */
        if (theMinute === 0) {
            theMinute = '00';
        } else {
            theMinute.padZeroes(2);
        }

        timeStamp = theYear + theDay + "_" + theHour + theMinute;

        return baseURI + timeStamp + WOPR.theEnhancement + ".jpg";
    };

    WOPR.makeFrameArray = function() {
        var startTime = new Date();

        startTime.setUTCHours(startTime.getUTCHours() - 1);

        var i;
        var tempArray = [];

        for (i = 0; i < 15; i = i + 1) {
            tempArray.push(WOPR.makeURI(startTime));
            /** Advance to the next frame's timestamp **/
            startTime.setMinutes(startTime.getMinutes() + 30);
        }

        return tempArray;
    };

    WOPR.cleanFrames = function () {
        while (WOPR.viewerPanel.firstChild) {
            WOPR.viewerPanel.removeChild(WOPR.viewerPanel.firstChild);
        }
    };

    WOPR.injectFrames = function() {

        var fCount;
        var fElement;
        var fArray = WOPR.makeFrameArray();

        /** Build image tags for each frame of the animated loop. Then inject each into the DOM. */
        for (fCount = 0; fCount < fArray.length; fCount++) {

            fElement = document.createElement("img");

            fElement.src = fArray[fCount];

            fElement.setAttribute("alt", "Image #" + (fCount + 1).padZeroes(2));
            fElement.classList.add("hidden");
            fElement.classList.add("frame");

            WOPR.viewerPanel.appendChild(fElement);

        }

    };

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

    WOPR.call();

}());
