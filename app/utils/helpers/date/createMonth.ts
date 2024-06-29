import { createDate } from "./createDate";
import { getMonthNumberOfDays } from "./getMonthNumberOfDays";

interface CreateMonthParams {
    locale?: string;
    date?: Date;
}

export const createMonth = (params?: CreateMonthParams) => {
    const date = params?.date ?? new Date();
    const locale = params?.locale ?? "default";

    const d = createDate({ date, locale });
    const { month: monthName, year, monthNumber, monthIndex } = d;

    // получаем день
    const getDay = (dayNumber: number) => {
        return createDate({ date: new Date(year, monthIndex, dayNumber), locale });
    };

    //получаем все дни в месяце
    const createMonthDays = () => {
        const days = [];

        for (let i = 0; i <= getMonthNumberOfDays(monthIndex, year) - 1; i++) {
            days[i] = getDay(i + 1);
        }
        return days;
    };

    return { getDay, monthName, monthIndex, monthNumber, year, createMonthDays };
};
