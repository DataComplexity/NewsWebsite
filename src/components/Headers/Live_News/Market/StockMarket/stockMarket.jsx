import { useState, useEffect } from "react";
import "./stockMarket.css";
import { useFetch } from "../../../../../hooks/useFetch";

function StockMarket() {
    const [current, setcurrent] = useState(0);
    const { data: stockData, error } = useFetch(600000, "/stocks");

    useEffect(() => {
        if (!stockData || stockData.length === 0) return;
        const timer = setInterval(() => {
            setcurrent(prev => (prev + 1) % stockData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [stockData]);

    if (error) return <div className="stockPanel"><p>Error loading stocks</p></div>;
    if (!stockData || stockData.length === 0) return <div className="stockPanel"><p>Loading...</p></div>;

    const currentStock = stockData[current];

    return (
        <div className="stockPanel">
            <div className="stock-list">
                {currentStock && (
                    <div className="stock-item">
                        <span id="item-name">{currentStock.name}: </span>
                        <span style={{ color: currentStock.data?.d >= 0 ? "green" : "red", fontWeight: "bold" }}>
                            ${currentStock.data?.c?.toFixed(2) + " "}
                        </span>
                        <span style={{ color: currentStock.data?.d >= 0 ? "green" : "red" }}>
                            {currentStock.data?.d > 0 ? "+" : ""}${currentStock.data?.d?.toFixed(2) + " "}
                            ({currentStock.data?.dp > 0 ? "+" : ""}{currentStock.data?.dp?.toFixed(2)}%)
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StockMarket;
