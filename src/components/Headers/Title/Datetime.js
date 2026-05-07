import { useState, useEffect } from "react";

function Time() {
    const [time, settime] = useState("");
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const formattedTime = now.toLocaleDateString('en-IN', {
                timeZone: "Asia/Kolkata",
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            })
            settime(formattedTime);
        }, 1000);
        return () => clearInterval(interval);
    }, []);
    return time;
}

export default Time;
