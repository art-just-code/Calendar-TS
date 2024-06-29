// получаем количество дней в месяце
export const getMonthNumberOfDays = (
    monthIndex: number,
    yearNumber: number = new Date().getFullYear() // при вызове второй аргумент не обязателен, поэтому по умолчанию будет это
) => new Date(yearNumber, monthIndex + 1, 0).getDate(); // ноль последним аргументом позволяет вернутся на день в прошлый месяц
