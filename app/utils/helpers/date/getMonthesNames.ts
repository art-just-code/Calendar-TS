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
        //console.log("d.getDate()", d.getDate());
        const { month, monthIndex, monthShort, date } = createDate({
            locale,
            date: new Date(d.getFullYear(), d.getMonth() + i, d.getDate() > 28 ? 28 : d.getDate()), // тут была проблема, если текущая дата 29ое и больше, февраль не создавался, так как там меньше дней, решение придумал временное, предстоит еще понять, как это лучше сделать
        });

        monthesNames[monthIndex] = { month, monthIndex, monthShort, date };
    });

    return monthesNames;
};
