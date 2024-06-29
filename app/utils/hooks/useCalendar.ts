import { useMemo, useState } from "react";
import { createDate, createMonth, getMonthNumberOfDays, getMonthesNames, getWeekDaysNames } from "../helpers/date";

interface UseCalendarParams {
    locale?: string;
    selectedDate: Date;
    firstWeekDay: number;
}

const getYearsInterval = (year: number) => {
    // получаем интервал лет
    const startYear = Math.floor(year / 10) * 10;
    return [...Array(10)].map((_, index) => startYear + index);
};

export const useCalendar = ({ firstWeekDay = 2, locale = "default", selectedDate: date }: UseCalendarParams) => {
    const [mode, setMode] = useState<"days" | "monthes" | "years">("days"); // в <> описываем возможные значени для mode, в () по умолчанию
    const [selectedDate, setSelectedDate] = useState(createDate({ date }));
    const [selectedMonth, setSelectedMonth] = useState(
        createMonth({ date: new Date(selectedDate.year, selectedDate.monthIndex), locale })
    );
    const [selectedYear, setSelectedYear] = useState(selectedDate.year);
    const [selectedYearInterval, setSelectedYearInterval] = useState(getYearsInterval(selectedDate.year));

    const monthesNames = useMemo(() => getMonthesNames(locale), []); // используем дальше useMemo, чтобы эти сущности не рендерились каждый раз
    const weekDaysNames = useMemo(() => getWeekDaysNames(firstWeekDay, locale), []);

    const days = useMemo(() => selectedMonth.createMonthDays(), [selectedMonth, selectedYear]); // в массив зависимостей передаются значения также как в useEffect - при изменении их эначений будет происходить перерендер

    // механизм расчета того, сколько дней необходимо отрисовывать с прошлого и следующего месяцев
    const calendarDays = useMemo(() => {
        //получаем - сколько в данном месяце дней
        const monthNumberOfDays = getMonthNumberOfDays(selectedMonth.monthIndex, selectedYear);
        // получаем количество дней в предыдущем месяце
        const prevMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex - 1),
            locale,
        }).createMonthDays();
        // получаем количество дней в следующем месяце
        const nextMonthDays = createMonth({
            date: new Date(selectedYear, selectedMonth.monthIndex + 1),
            locale,
        }).createMonthDays();

        const firstDay = days[0];
        const lastDay = days[monthNumberOfDays - 1];

        const shiftIndex = firstWeekDay - 1; // из-за смещения 0 дня с воскресенья на понедельник, тут мы возвращаем как было, учитываем это смещение

        const numberOfPrevDays =
            firstDay.dayNumberInWeek - 1 - shiftIndex < 0
                ? 7 - (firstWeekDay - firstDay.dayNumberInWeek)
                : firstDay.dayNumberInWeek - 1 - shiftIndex;

        const numberOfNextDays =
            7 - lastDay.dayNumberInWeek + shiftIndex > 6
                ? 7 - lastDay.dayNumberInWeek - (7 - shiftIndex)
                : 7 - lastDay.dayNumberInWeek + shiftIndex;

        const totalCalendarDays = days.length + numberOfPrevDays + numberOfNextDays; // получаем сколько вообще нужо отрисовать дней

        const result = [];
        // добавляем дни предыдущего месяца
        for (let i = 0; i < numberOfPrevDays; i++) {
            const inverted = numberOfPrevDays - i;
            result[i] = prevMonthDays[prevMonthDays.length - inverted];
        }
        // добавляем дни текущего месяца
        for (let i = numberOfPrevDays; i < totalCalendarDays - numberOfNextDays; i++) {
            result[i] = days[i - numberOfPrevDays];
        }
        // добавляем дни следующего месяца
        for (let i = totalCalendarDays - numberOfNextDays; i < totalCalendarDays; i++) {
            result[i] = nextMonthDays[i - totalCalendarDays + numberOfNextDays];
        }

        return result;
    }, [selectedMonth.year, selectedMonth.monthIndex, selectedYear]);

    const onClickArrow = (direction: "right" | "left") => {
        if (mode === "years" && direction === "left") {
            return setSelectedYearInterval(getYearsInterval(selectedYearInterval[0] - 10));
        }

        if (mode === "years" && direction === "right") {
            return setSelectedYearInterval(getYearsInterval(selectedYearInterval[0] + 10));
        }

        if (mode === "monthes" && direction === "left") {
            const year = selectedYear - 1;
            if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year));
            return setSelectedYear(year);
        }

        if (mode === "monthes" && direction === "right") {
            const year = selectedYear + 1;
            if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year));
            return setSelectedYear(year);
        }

        if (mode === "days") {
            const monthIndex = direction === "left" ? selectedMonth.monthIndex - 1 : selectedMonth.monthIndex + 1;

            if (monthIndex === -1) {
                const year = selectedYear - 1;
                setSelectedYear(year);
                if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year));
                return setSelectedMonth(createMonth({ date: new Date(year, 11), locale }));
            }

            if (monthIndex === 12) {
                const year = selectedYear + 1;
                setSelectedYear(year);
                if (!selectedYearInterval.includes(year)) setSelectedYearInterval(getYearsInterval(year));
                return setSelectedMonth(createMonth({ date: new Date(year, 0), locale }));
            }
            return setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
        }
    };

    const setSelectedMonthByIndex = (monthIndex: number) => {
        setSelectedMonth(createMonth({ date: new Date(selectedYear, monthIndex), locale }));
    };

    return {
        state: {
            mode,
            calendarDays,
            weekDaysNames,
            monthesNames,
            selectedDate,
            selectedMonth,
            selectedYear,
            selectedYearInterval,
        },
        functions: {
            setMode,
            setSelectedDate,
            onClickArrow,
            setSelectedMonthByIndex,
            setSelectedYear,
        },
    };
};
