"use client";
import Image from "next/image";
import Styles from "./page.module.css";
import { Calendar } from "./components/Calendar/Calendar";
import { useState } from "react";

export const Home: React.FC = () => {
    const [selectedDate, selectDate] = useState(new Date());
    return (
        <main className={Styles["main"]}>
            <section className={Styles["main__wrapper"]}>
                <Calendar
                    selectDate={selectDate}
                    selectedDate={selectedDate}
                />
            </section>
        </main>
    );
};

export default Home;
