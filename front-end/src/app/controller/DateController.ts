export class DateController {
  currentDate: Date;
  constructor(currentDate: Date) {
    this.currentDate = currentDate;
  }

  getMSInADay(): number {
    return 24 * 60 * 60 * 1000;
  }

  getCurrentDate(): Date {
    return this.currentDate;
  }

  getModifiedDateByDayDifference(days: number): Date {
    // console.log(
    //   'current date in getmodifiedDateByDayDifference: ',
    //   this.currentDate
    // );
    const modifiedDate = new Date(this.currentDate);
    const daysInMS = days * this.getMSInADay();
    modifiedDate.setTime(this.currentDate.getTime() + daysInMS);
    // console.log('modified date is: ', modifiedDate);
    return modifiedDate;
  }

  getModifiedDateByMonthDifference(months: number): Date {
    // console.log(
    //   'current date in getmodifiedDateByMonthDifference: ',
    //   this.currentDate
    // );
    const modifiedDate = new Date(this.currentDate);
    modifiedDate.setMonth(this.currentDate.getMonth() + months);
    // console.log('modified date is: ', modifiedDate);
    return modifiedDate;
  }

  getModifiedDateByYearDifference(years: number): Date {
    // console.log(
    //   'current date in getmodifiedDateByYearDifference: ',
    //   this.currentDate
    // );
    const modifiedDate = new Date(this.currentDate);
    modifiedDate.setFullYear(modifiedDate.getFullYear() + years);
    // console.log('modified date is: ', modifiedDate);
    return modifiedDate;
  }
}

const dateController = new DateController(new Date());
// console.log(
//   'getmodifiedDateByDayDifference(5): ',
//   dateController.getmodifiedDateByDayDifference(5)
// );
// console.log(
//   'getmodifiedDateByMonthDifference(5): ',
//   dateController.getmodifiedDateByMonthDifference(5)
// );
// console.log(
//   'getmodifiedDateByYearDifference(1): ',
//   dateController.getmodifiedDateByYearDifference(1)
// );
// dateController.getmodifiedDateByDayDifference(5);
// dateController.getmodifiedDateByMonthDifference(5);
// dateController.getmodifiedDateByYearDifference(1);

const timeDifference = '+12y-11m+25d';
// var yearDifference: number;
// var monthDifference: number;
// var dayDifference: number;

const yearIndex = timeDifference.indexOf('y');
const monthIndex = timeDifference.indexOf('m');
const yearString = timeDifference.substring(0, yearIndex);
const monthsString = timeDifference.substring(yearIndex + 1, monthIndex);
const dayString = timeDifference.substring(
  monthIndex + 1,
  timeDifference.length - 1
);
// console.log('yearString: ', yearString);
// console.log('monthsString: ', monthsString);
// console.log('dayString: ', dayString);
const yearDifference = Number(yearString);
const monthDifference = Number(monthsString);
const dayDifference = Number(dayString);
// console.log('year str to int: ', yearDifference);
// console.log('month str to int: ', monthDifference);
// console.log('day str to int: ', dayDifference);
('+12y-11m+25d');
// console.log(
//   'getmodifiedDateByDayDifference(+25): ',
//   dateController.getModifiedDateByDayDifference(dayDifference)
// );
// console.log(
//   'getmodifiedDateByMonthDifference(-11): ',
//   dateController.getModifiedDateByMonthDifference(monthDifference)
// );
// console.log(
//   'getmodifiedDateByYearDifference(+12): ',
//   dateController.getModifiedDateByYearDifference(yearDifference)
// );
// export default dateController;

// '+1y+3m-5d'
