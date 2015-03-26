var GOES = {
    panelOne: document.getElementById("panelOne"),
    panelTwo: document.getElementById("panelTwo"),
    theEnhancement: document.getElementById("theEnhancement"),
    uri: {
        west: "http://www.ssd.noaa.gov/goes/west/weus/img/",
        east: "http://www.ssd.noaa.gov/goes/east/eaus/img/"
    },

    view: function () {

        "use strict";

        function init() {

        }

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

            for (i = 0; i < theMonth; i++) {
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

            for (j = 0; j < places; j++) {
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

            m = float2int(m);

            return m * 30;

        }

        /**
         * This little trick casts floats to integers (whole numbers).
         * @param value
         * @returns {number}
         */
        function float2int (value) {
            return value | 0;
        }

        function getTimeStamp(YYYY, DDD, HH, MM) {
            return YYYY + DDD + "_" + HH + MM;
        }

        function getEnhancement() {
            var n,
                enhancementCode = "rb";

            for (n = 0; n < GOES.theEnhancement.length; n++) {
                if (GOES.theEnhancement[n].checked) {
                    enhancementCode = GOES.theEnhancement[n].value;
                }
            }

            return enhancementCode;

        }

        function getURI(thePast, target) {

            var theYear = thePast.getFullYear(),
                theDays = dayOfYear(thePast),
                theMinutes = thePast.getMinutes(),
                theHours = thePast.getHours(),
                baseURI = GOES.uri.west;

            theDays = padZeroes(theDays, 3);
            theHours = padZeroes(theHours, 2);

            theMinutes = parseMinutes(theMinutes);

            /**
             * Handle exceptions between the two sets of imagery.
             **/

            if (target === "east") {
                theMinutes = theMinutes + 15;
                baseURI = GOES.uri.east;
            }

            theMinutes = padZeroes(theMinutes, 2);

            return baseURI + getTimeStamp(theYear, theDays, theHours, theMinutes) + getEnhancement() + ".jpg";
        }

        /**
         * Removes all the image elements from the page.
         */
        function removeImages() {

            while (GOES.panelOne.firstChild) {

                GOES.panelOne.removeChild(GOES.panelOne.firstChild);

            }

            while (GOES.panelTwo.firstChild) {

                GOES.panelTwo.removeChild(GOES.panelTwo.firstChild);

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
         * GOES-N timing        1200Z    |   1230Z    |   1300Z    |   1330Z
         * GOES-P timing        1215Z    |   1245Z    |   1315Z    |   1345Z
         *
         */
        function load() {

            var thePast = new Date(),
                frameNumber,
                frameLeft,
                frameRight;

            removeImages();

            // We can get images from the past four hours, so create a date object
            // that starts then.
            thePast.setHours(thePast.getHours() - 4);

            for (frameNumber = 0; frameNumber < 20; frameNumber++) {

                /** West Coast */

                frameLeft = document.createElement("img");

                frameLeft.classList.add("hidden");
                frameLeft.classList.add("frameLeft");

                frameLeft.src = getURI(thePast, "west");

                GOES.panelOne.appendChild(frameLeft);

                /** Advance to the next frame's timestamp **/
                thePast.setMinutes(thePast.getMinutes() + 15);

                /** East Coast */

                frameRight = document.createElement("img");

                frameRight.classList.add("hidden");
                frameRight.classList.add("frameRight");

                frameRight.src = getURI(thePast, "east");

                /** Advance to the next frame's timestamp **/
                thePast.setMinutes(thePast.getMinutes() + 15);

                GOES.panelTwo.appendChild(frameRight);

            }

        }

        /**
         * This is the animation "player" that shows and hides the individual
         * frames of the animation.
         * @param f
         */
        function animate(f) {

            var theInterval = 200,
                frameLeft = document.getElementsByClassName("frameLeft"),
                frameRight = document.getElementsByClassName("frameRight");

            if (!f) {
                f = 0;
            }

            setTimeout(function () {

                // Frames 1 - 18

                if (f < frameLeft.length - 1) {

                    frameLeft.item(f).classList.add("hidden");
                    frameRight.item(f).classList.add("hidden");

                    f++;

                    frameLeft.item(f).classList.remove("hidden");
                    frameRight.item(f).classList.remove("hidden");

                    animate(f);

                } else {

                    // Frame 19 (end)

                    frameLeft.item(f).classList.add("hidden");
                    frameRight.item(f).classList.add("hidden");

                    // Set the first frame back to visible

                    frameLeft.item(0).classList.remove("hidden");
                    frameRight.item(0).classList.remove("hidden");

                    animate(0);

                }

            }, theInterval);

        }

        load();

        animate(0);

        GOES.theEnhancement.addEventListener("click", function () {
            load();
        });

    }

};

GOES.view();
