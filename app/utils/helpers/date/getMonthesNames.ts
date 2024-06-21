import { createDate } from ".";

export const getMonthesNames = (locale: string = "default") => {
    const monthesNames: {
        month: ReturnType<typeof createDate>["month"]; // ReturnType https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype возвращает тип6 который возвращает функция, в данном случае createDate
        monthShort: ReturnType<typeof createDate>["monthShort"];
        monthIndex: ReturnType<typeof createDate>["monthIndex"];
        date: ReturnType<typeof createDate>["date"];
    }[] = Array.from({ length: 12 });

    const d = new Date();

    monthesNames.forEach((_, i) => {
        const { month, monthIndex, monthShort, date } = createDate({
            locale,
            date: new Date(d.getFullYear(), d.getMonth() + i, d.getDate()),
        });

        monthesNames[monthIndex] = { month, monthIndex, monthShort, date };
    });

    return monthesNames;
};
