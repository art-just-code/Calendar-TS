"use client";
import { useCalendar } from "@/app/utils/hooks/useCalendar";
import { SlArrowLeft } from "react-icons/sl";
import Styles from "./Calendar.module.css";
import { checkDateIsEqual, checkIsToday } from "@/app/utils/helpers/date";

interface CalendarParams {
    locale?: string;
    selectedDate: Date;
    selectDate: (date: Date) => void; // описание функции, которая будет принимать date и возвращать что-то
    firstWeekDay?: number;
}

export const Calendar: React.FC<CalendarParams> = ({
    locale = "default",
    firstWeekDay = 2,
    selectDate,
    selectedDate,
}) => {
    const { state, functions } = useCalendar({ firstWeekDay, locale, selectedDate });

    return (
        <div className={Styles["calendar"]}>
            <div className={Styles["calendar__header"]}>
                <SlArrowLeft
                    className={Styles["calendar__header__arrow-left"]}
                    onClick={() => functions.onClickArrow("left")}
                />
                {state.mode === "days" && (
                    <div
                        aria-hidden
                        onClick={() => functions.setMode("monthes")}
                    >
                        {state.monthesNames[state.selectedMonth.monthIndex].month} {state.selectedYear}
                    </div>
                )}
                {state.mode === "monthes" && (
                    <div
                        aria-hidden
                        onClick={() => functions.setMode("years")}
                    >
                        {state.selectedYear}
                    </div>
                )}
                {state.mode === "years" && (
                    <div>
                        {state.selectedYearInterval[0]} -{" "}
                        {state.selectedYearInterval[state.selectedYearInterval.length - 1]}
                    </div>
                )}
                <SlArrowLeft
                    className={Styles["calendar__header__arrow-right"]}
                    onClick={() => functions.onClickArrow("right")}
                />
            </div>
            <div className={Styles["calendar__body"]}>
                {state.mode === "days" && (
                    <>
                        <div className={Styles["calendar__week__names"]}>
                            {state.weekDaysNames.map((weekDaysNames) => (
                                <div key={weekDaysNames.dayShort}>{weekDaysNames.dayShort}</div>
                            ))}
                        </div>
                        <div className={Styles["calendar__days"]}>
                            {state.calendarDays.map((day) => {
                                const isToday = checkIsToday(day.date);
                                const isSelectedDay = checkDateIsEqual(day.date, state.selectedDate.date);
                                const isAdditionalDay = day.monthIndex !== state.selectedMonth.monthIndex;
                                return (
                                    <div
                                        key={`${day.dayNumber} - ${day.monthIndex}`}
                                        onClick={() => {
                                            functions.setSelectedDate(day);
                                            selectDate(day.date);
                                        }}
                                        className={`${Styles["calendar__day"]}
                                        ${isToday ? Styles["calendar__today__item"] : ""} 
                                        ${isSelectedDay ? Styles["calendar__selected__item"] : ""}
                                        ${isAdditionalDay ? Styles["calendar__additional__day"] : ""}`}
                                    >
                                        {day.dayNumber}
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
                {state.mode === "monthes" && (
                    <div className={Styles["calendar__pick__item__container"]}>
                        {state.monthesNames.map((monthesName) => {
                            const isCurrentMonth =
                                new Date().getMonth() === monthesName.monthIndex &&
                                new Date().getFullYear() === state.selectedYear;
                            const isSelectedMonth = monthesName.monthIndex === state.selectedMonth.monthIndex;

                            return (
                                <div
                                    key={monthesName.monthIndex}
                                    onClick={() => {
                                        functions.setSelectedMonthByIndex(monthesName.monthIndex);
                                        functions.setMode("days");
                                    }}
                                    className={`${Styles["calendar__day"]}
                                                ${isCurrentMonth ? Styles["calendar__today__item"] : ""} 
                                                ${isSelectedMonth ? Styles["calendar__selected__item"] : ""}`}
                                >
                                    {monthesName.monthShort}
                                </div>
                            );
                        })}
                    </div>
                )}
                {state.mode === "years" && (
                    <div className={Styles["calendar__pick__item__container"]}>
                        <div className={Styles["calendar__unchoosable__year"]}>{state.selectedYearInterval[0] - 1}</div>
                        {state.selectedYearInterval.map((year) => {
                            const isCurrentYear = new Date().getFullYear() === year;
                            const isSelectedYear = year === state.selectedYear;

                            return (
                                <div
                                    key={year}
                                    onClick={() => {
                                        functions.setSelectedYear(year);
                                        functions.setMode("monthes");
                                    }}
                                    className={`${Styles["calendar__day"]}
                                            ${isCurrentYear ? Styles["calendar__today__item"] : ""} 
                                            ${isSelectedYear ? Styles["calendar__selected__item"] : ""}`}
                                >
                                    {year}
                                </div>
                            );
                        })}
                        <div className={Styles["calendar__unchoosable__year"]}>
                            {state.selectedYearInterval[state.selectedYearInterval.length - 1] + 1}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
