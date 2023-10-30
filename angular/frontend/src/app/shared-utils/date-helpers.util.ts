
export function getYearsOptions(): number[] {
    let nextYear = new Date().getFullYear() + 2;
    const firstYear = 2021;
    let years = []
    for (let i = firstYear; i < nextYear; i++) {
      console.log(i)
      years.push(i)
    }
    return years;
}

export function generateDateString(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth}-${date.getDate}`;;
}

export function generateListOfThreeTestDates(): [string, string, string] {
  let today: Date = new Date();
  const listOfThreeDatesThisMonth:[string, string, string]  = [
    generateDateString(today), 
    getFirstDateofMonthStr(today.getMonth(), today.getFullYear()),
    getLastDateofMonthStr(today.getMonth(), today.getFullYear())
  ];
  return listOfThreeDatesThisMonth;
}

export function getFirstDateofMonthStr(month: number, year: number):string {
  let dateStr: string;
  if (month < 10) {
    dateStr = `${year}-0${month}-01`;
  } else {
    dateStr = `${year}-${month}-01`;
  }
  return dateStr
}

export function getLastDateofMonthStr(month: number, year: number):string {
  let dateStr: string;
  let newMonth: number;
  let newYear: number;
  if (month == 12) {
    newMonth = 1
    newYear = year + 1
  } else {
    newMonth = month + 1
    newYear = year
  }
  if (newMonth < 10) {
    dateStr = `${newYear}-0${newMonth}-01`;
  } else {
    dateStr = `${newYear}-${newMonth}-01`;
  }
  return dateStr
}

export const monthsAndIntegers: [string, number][] = [
    ['January', 1],
    ['February', 2],
    ['March', 3],
    ['April', 4],
    ['May', 5],
    ['June', 6],
    ['July', 7],
    ['August', 8],
    ['September', 9],
    ['October', 10],
    ['November', 11],
    ['December', 12]
];

