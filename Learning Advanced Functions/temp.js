'use strict';

const yearCheck = function (year) {
    const chkYearType = String(year)
    // console.log(chkYearType, typeof chkYearType);
    if (chkYearType.endsWith('00')) {
        if (year % 400 == 0) {
            return `${year} is a leap year`
            // console.log(`${year} is a leap year`);
        } else {
            return `${year} is not a leap year`;
        }
        // console.log('Ends with 00');
    } else if (year % 4 == 0) {
        return `${year} is a leap year`;
    } else {
        return `${year} is not a leap year`;
    }
};

console.log(yearCheck(2016));
console.log(yearCheck(2017));
console.log(yearCheck(1600));
console.log(yearCheck(1900));
// console.log(typeof test);
