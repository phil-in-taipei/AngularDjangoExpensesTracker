
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

