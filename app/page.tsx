"use client";
import { Calendar } from "./components/Calendar/Calendar";
import { useState } from "react";
import { formateDate } from "./utils/helpers/date";

export const Home: React.FC = () => {
    const [selectedDate, selectDate] = useState(new Date()); // исправить имя функции на setSelectedDate
    return (
        <main className="main">
            <section className="app__container">
                <div className="date__container">{formateDate(selectedDate, "DD MM YYYY")}</div>
                <Calendar
                    selectDate={selectDate}
                    selectedDate={selectedDate}
                />
            </section>
        </main>
    );
};

export default Home;
