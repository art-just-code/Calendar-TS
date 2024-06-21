import { useState } from "react";
import { createYear } from "./utils/helpers/date";

//console.log("createYear", createYear({ locale: "en-US" }).createYearMonthes());

export const App: React.FC = (props: any) => {
    return (
        <>
            <header>Header</header>
            {props.children}
            <footer>Footer</footer>
        </>
    );
};

export default App;
