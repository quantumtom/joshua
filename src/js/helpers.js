goog.provide('WOPR.helpers');

/**
 * @license MIT
 *
 * @module WOPR.helpers
 *
 * A library of a few little helper functions.
 *
 */

(function() {

    'use strict';

    /**
     * Takes a date and calculates how many days into the year that date is.
     * @returns {number}
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

        for (i = 0; i < theMonth; i = i + 1) {
            theDayOfTheYear += monthDays[i];
        }

        theDayOfTheYear += theDate;

        theDayOfTheYear = theDayOfTheYear.padZeroes(3);

        return theDayOfTheYear;
    };

    Date.prototype.getFormattedHour = function() {
        var theHour = this.getHours();

        theHour = theHour.padZeroes(2);

        return theHour;
    };

    Date.prototype.getFormattedMinute = function() {
        var theMinute = this.getMinutes();

        return theMinute.parseMinutes(30);
    };

    /**
     * Takes a value between 0 - 59 and returns either the
     * bottom or top half of the hour.
     * @param {number} thePeriod
     * @returns {number}
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
     * @param {number} places
     * @returns {string}
     */

    Number.prototype.padZeroes = function(places) {
        var oldString = this.toString();

        while (oldString.length < places) {
            oldString = '0' + oldString;
        }

        return oldString;
    };

}());
