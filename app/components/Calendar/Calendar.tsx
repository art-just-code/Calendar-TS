"use client";
import { useCalendar } from "@/app/utils/hooks/useCalendar";
import Styles from "./Calendar.module.css";

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
    const { state } = useCalendar({ firstWeekDay, locale, selectedDate });

    console.log(state);
    return (
        <div>
            <p>Calendar</p>
        </div>
    );
};
