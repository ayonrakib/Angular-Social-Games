class DateController {
  currentDate: Date;
  constructor() {
    this.currentDate = new Date();
  }

  getMSInADay(): number {
    return 24 * 60 * 60 * 1000;
  }

  getCurrentDate(): Date {
    return this.currentDate;
  }

  getOldDateByDayDifference(days: number): Date {
    // console.log(
    //   'current date in getOldDateByDayDifference: ',
    //   this.currentDate
    // );
    const oldDate = new Date();
    const daysInMS = days * this.getMSInADay();
    oldDate.setTime(this.currentDate.getTime() - daysInMS);
    // console.log('old date is: ', oldDate);
    return oldDate;
  }

  getOldDateByMonthDifference(months: number): Date {
    // console.log(
    //   'current date in getOldDateByMonthDifference: ',
    //   this.currentDate
    // );
    const oldDate = new Date();
    oldDate.setMonth(this.currentDate.getMonth() - months);
    // console.log('old date is: ', oldDate);
    return oldDate;
  }

  getOldDateByYearDifference(years: number): Date {
    // console.log(
    //   'current date in getOldDateByYearDifference: ',
    //   this.currentDate
    // );
    const oldDate = new Date();
    oldDate.setFullYear(this.currentDate.getFullYear() - years);
    // console.log('old date is: ', oldDate);
    return oldDate;
  }
}

const dateController = new DateController();
// dateController.getOldDateByDayDifference(5);
// dateController.getOldDateByMonthDifference(5);
// dateController.getOldDateByYearDifference(1);

export default dateController;
