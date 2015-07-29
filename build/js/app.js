<<<<<<< HEAD
(function(){/*
 MIT

 @module APP
*/
'use strict';var b={},b={i:function(){b.view={b:document.getElementById("panelRoot"),f:document.getElementById("theEnhancementList"),d:document.getElementById("theMapList"),k:function(){for(;b.view.b.firstChild;)b.view.b.removeChild(b.view.b.firstChild)},e:function(){return b.view.d[b.view.d.selectedIndex].value},h:function(){var a=b.view.f;return a[a.selectedIndex].value}};b.n=b.view.e();b.m=function(){var a=new Date;a.setHours(a.getHours()-4);return a};b.l()},a:{c:function(a,d){var f,c;c=""+a;for(f=
0;f<d;f+=1)c.length<d&&(c="0"+c);return c},g:function(a){var d=a.getMonth(),f=a.getDate(),c=[31,29,31,30,31,30,31,31,30,31,30,31],g=0;a.getYear()%4&&(c[1]=28);for(a=0;a<d;a+=1)g+=c[a];return g+f},j:function(a,d){a=Math.floor(a/d);return a*d}},l:function(){function a(){var a=b.m(),c,d;b.view.k();for(c=0;20>c;c+=1){var p=d=document.createElement("img"),q=a.getFullYear(),e=a.getMinutes(),h=a.getHours(),k=b.a.g(a),l="http://www.ssd.noaa.gov/"+b.view.e()+"/img/",n=30,m=0,r=b.view.h(),k=(0,b.a.c)(k,3),
h=(0,b.a.c)(h,2);0<=l.search("mtsat")&&(n=59,m=32);0<=l.search("east")&&(m=15);e=(0,b.a.j)(e,n);e+=m;e=(0,b.a.c)(e,2);p.src=l+q+k+"_"+h+e+r+".jpg";d.classList.add("hidden");d.classList.add("frame");d.setAttribute("alt","Image "+c+" unavailable.");b.view.b.appendChild(d);a.setMinutes(a.getMinutes()+30)}}function d(a){var c=document.getElementsByClassName("frame");a||(a=0);setTimeout(function(){a<c.length-1?(c.item(a).classList.add("hidden"),a+=1,c.item(a).classList.remove("hidden"),d(a)):(c.item(a).classList.add("hidden"),
c.item(0).classList.remove("hidden"),d(0))},133)}a();d(0);b.view.d.addEventListener("change",function(){a()});b.view.f.addEventListener("change",function(){a()})}};b.i();}).call(window);
//# sourceMappingURL=app.js.map
=======
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
        while (WOPR.viewerPanel.firstChild) {
            WOPR.viewerPanel.removeChild(WOPR.viewerPanel.firstChild);
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

            WOPR.viewerPanel.appendChild(frameElement);

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
>>>>>>> f1b49b0eeaa9a3aa0c0a3050c54e2f9da4cc6c32
