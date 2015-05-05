/**
 * @license MIT
 *
 * @module APP
 */

"use strict";

var APP = {};

APP = {
    panelRoot: document.getElementById("panelRoot"),
    theColorList: document.getElementById("theColorList"),
    theMapList: document.getElementById("theMapList"),
    uri: {
        medium: "img/",
        domain: "http://www.ssd.noaa.gov/",
        system: "goes/"
    },

    view: function () {

        /**
         * Takes a date and calculates how many days that date is from
         * January 1.
         * @param myDate
         * @returns {number}
         */
        function dayOfYear(myDate) {

            var theMonth = myDate.getMonth(),
                theDate = myDate.getDate(),
                monthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
                theDayOfTheYear = 0,
                i;

            // Check for leap year
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
         * Takes a places count in Base-10 (ones, tens, hundreds) and prepends
         * it (concatenates it with) a number (cast as a string) that is
         * passed in as the first parameter.
         * @param i
         * @param places
         * @returns {string}
         */
        function padZeroes(i, places) {

            var j,
                theString = "";

            theString += i;

            for (j = 0; j < places; j = j + 1) {
                if (theString.length < places) {
                    theString = "0" + theString;
                }
            }

            return theString;

        }

        /**
         * Takes a value between 0 - 59 and returns either the
         * bottom or top half of the hour.
         * @param m
         * @returns {number}
         */
        function parseMinutes(m) {

            m = m / 30;

            m = Math.floor(m);

            return m * 30;

        }

        function getTimeStamp(YYYY, DDD, HH, MM) {
            return YYYY + DDD + "_" + HH + MM;
        }

        function getColor() {
            var theColorList = APP.theColorList,
                theColorPick = theColorList[theColorList.selectedIndex].value;

            if (theColorPick === "") {
                theColorPick = "rb";
            }

            return theColorPick;

        }

        function getURI(thePast, target) {

            var theYear = thePast.getFullYear(),
                theDays = dayOfYear(thePast),
                theMinutes = thePast.getMinutes(),
                theHours = thePast.getHours(),
                baseURI = APP.uri.domain
                    + APP.uri.system
                    + target + "/"
                    + APP.uri.medium;

            theDays = padZeroes(theDays, 3);
            theHours = padZeroes(theHours, 2);

            theMinutes = parseMinutes(theMinutes);

            /**
             * Handle exceptions between the two sets of imagery.
             * The GOES-East delivers images 15 minutes after GOES-West.
             **/

            if (target.search("east") >= 0) {
                theMinutes = theMinutes + 15;
            }

            theMinutes = padZeroes(theMinutes, 2);

            return baseURI + getTimeStamp(theYear, theDays, theHours, theMinutes) + getColor() + ".jpg";
        }

        /**
         * Removes all the image elements from the page.
         */
        function removeImages() {
            while (APP.panelRoot.firstChild) {
                APP.panelRoot.removeChild(APP.panelRoot.firstChild);
            }
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
         * APP-N timing        1200Z    |   1230Z    |   1300Z    |   1330Z
         * APP-P timing        1215Z    |   1245Z    |   1315Z    |   1345Z
         *
         */
        function load() {

            var thePast = new Date(),
                theMapList = APP.theMapList,
                theMapPick = theMapList[theMapList.selectedIndex].value,
                frameNumber,
                frame;

            removeImages();

            if (theMapPick === "") {
                theMapPick = "west/weus";
            }

            // We can get images from the past four hours, so create a date object
            // that starts then.
            thePast.setHours(thePast.getHours() - 4);

            for (frameNumber = 0; frameNumber < 20; frameNumber = frameNumber + 1) {

                frame = document.createElement("img");

                frame.src = getURI(thePast, theMapPick);

                frame.classList.add("hidden");
                frame.classList.add("frame");
                frame.setAttribute("alt", "Image " + frameNumber + " unavailable.");

                APP.panelRoot.appendChild(frame);

                /** Advance to the next frame's timestamp **/
                thePast.setMinutes(thePast.getMinutes() + 15);

            }

        }

        /**
         * This is the animation "player" that shows and hides the individual
         * frames of the animation.
         * @param f
         */
        function animate(f) {

            var theInterval = 200,
                frame = document.getElementsByClassName("frame");

            if (!f) {
                f = 0;
            }

            setTimeout(function () {

                // Frames 1 - 18

                if (f < frame.length - 1) {

                    frame.item(f).classList.add("hidden");

                    f =  f + 1;

                    frame.item(f).classList.remove("hidden");

                    animate(f);

                } else {

                    // Frame 19 (end)

                    frame.item(f).classList.add("hidden");

                    // Set the first frame back to visible

                    frame.item(0).classList.remove("hidden");

                    animate(0);

                }

            }, theInterval);

        }

        load();

        animate(0);

        APP.theMapList.addEventListener("change", function () {
            load();
        });

        APP.theColorList.addEventListener("change", function () {
            load();
        });

    }

};

APP.view();
