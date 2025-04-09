import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Cookies from "js-cookie";

export const convertDatePeriodText = (date) => {
    const targetDate = dayjs(date);
    const today = dayjs();
    const daysLeft = targetDate.diff(today, "day");

    if (daysLeft > 7 || daysLeft < 0) return "";


    return `${daysLeft} days left`;
};

export const convertDateToISOString = () => {
    dayjs.extend(customParseFormat);

    const date = dayjs("11/04/2025", "DD/MM/YYYY");

    return date ;
}

export const convertFormatDateKey = (dateTimeString) => {
    const date = new Date(dateTimeString);

    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    const month = date.toLocaleString('id-ID', { month: 'long' });

    return `${month} ${day}, ${year}`;
};

const colorPalette = [
    { bg: "#fceed3", text: "#e5a443" },   
    { bg: "#eedcff", text: "#9b51e0" },    
    { bg: "#d2f2ea", text: "#43b78d" },   
];

export const assignUserColorsWithCookie = (messages) => {
    const savedColors = Cookies.get("userColors");
    let userColorMap = savedColors ? JSON.parse(savedColors) : {};
    let usedIndexes = Object.values(userColorMap).map((c) => c.index);
    let colorIndex = 0;

    messages.forEach((msg) => {
        const username = msg.username;
        if (!userColorMap[username]) {
            while (usedIndexes.includes(colorIndex)) {
            colorIndex++;
            }

            const paletteIndex = colorIndex % colorPalette.length;
            userColorMap[username] = {
            bg: colorPalette[paletteIndex].bg,
            text: colorPalette[paletteIndex].text,
            index: paletteIndex,
            };
            usedIndexes.push(colorIndex);
        }
    });

    Cookies.set("userColors", JSON.stringify(userColorMap), { expires: 7 }); 
    return userColorMap;
};

export const sortedByClosestDate = (data)=>{
    return data.sort((a, b) => {
        const today = dayjs();
        const diffA = Math.abs(dayjs(a.dateTask).diff(today, 'millisecond'));
        const diffB = Math.abs(dayjs(b.dateTask).diff(today, 'millisecond'));
    
        return diffA - diffB;
    })
};