import { createDate } from ".";

export const formateDate = (date: Date, format: string) => {
    const d = createDate({ date });

    return format // делаем дату в нужном нам формате
        .replace(/\bYYYY\b/, d.year.toString())
        .replace(/\bMM\b/, d.month.toString().padStart(2, "0"))
        .replace(/\bDD\b/, d.dayNumber.toString().padStart(2, "0")); // Метод padStart()значений Stringдополняет эту строку другой строкой (при необходимости несколько раз),
};
