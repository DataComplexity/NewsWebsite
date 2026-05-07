import { useState, useEffect, useMemo } from "react";
import "./currency.css";
import { useFetch } from "../../../../../hooks/useFetch";

function Currency() {
    const [current, setcurrent] = useState(0);
    const { data: currencyData, error } = useFetch(600000, "/currency");

    const CA = useMemo(() => {
        if (!currencyData || !currencyData.rates) return [];
        return [
            { symbol: "USD/EUR", name: "Euro", data: currencyData.rates.EUR?.toFixed(2), CS: "€" },
            { symbol: "USD/INR", name: "Indian Rupee", data: currencyData.rates.INR?.toFixed(2), CS: "₹" },
            { symbol: "USD/GBP", name: "British Pound", data: currencyData.rates.GBP?.toFixed(2), CS: "£" },
            { symbol: "USD/CNY", name: "Chinese Yuan", data: currencyData.rates.CNY?.toFixed(2), CS: "¥" },
            { symbol: "USD/RUB", name: "Russian Ruble", data: currencyData.rates.RUB?.toFixed(2), CS: "₽" }
        ];
    }, [currencyData]);

    useEffect(() => {
        if (CA.length === 0) return;
        const timer = setInterval(() => {
            setcurrent(prev => (prev + 1) % CA.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [CA]);

    if (error) return <div className="currencyPanel"><p>Error loading currency</p></div>;
    if (!currencyData || CA.length === 0) return <div className="currencyPanel"><p>Loading...</p></div>;

    const currentItem = CA[current];

    return (
        <div className="currencyPanel">
            <div className="currency-list">
                <div className="currency-item">
                    {currentItem && (
                        <span className="item">
                            {currentItem.symbol}:
                            <span className="currency-color">
                                {" " + currentItem.CS}{currentItem.data}
                            </span>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Currency;
