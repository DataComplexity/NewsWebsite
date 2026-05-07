import { useState, useEffect } from "react";
import "./crypto.css";
import { useFetch } from "../../../../../hooks/useFetch";

function Crypto() {
    const [current, setcurrent] = useState(0);
    const { data: cryptoData, error } = useFetch(600000, "/crypto");

    useEffect(() => {
        if (!cryptoData || cryptoData.length === 0) return;
        const timer = setInterval(() => {
            setcurrent(prev => (prev + 1) % cryptoData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [cryptoData]);

    if (error) return <div className="cryptoPanel"><p>Error loading crypto</p></div>;
    if (!cryptoData || cryptoData.length === 0) return <div className="cryptoPanel"><p>Loading...</p></div>;

    const currentCrypto = cryptoData[current];

    return (
        <div className="cryptoPanel">
            <div className="crypto-list">
                {currentCrypto && (
                    <div className="crypto-item">
                        <span className="item-name">{currentCrypto.name}: </span>
                        <span style={{ color: currentCrypto.data?.d >= 0 ? "green" : "red", fontWeight: "bold" }}>
                            ${currentCrypto.data?.c?.toFixed(2) + " "}
                        </span>
                        <span style={{ color: currentCrypto.data?.d >= 0 ? "green" : "red" }}>
                            {currentCrypto.data?.d > 0 ? "+" : ""}${currentCrypto.data?.d?.toFixed(2) + " "}
                            ({currentCrypto.data?.dp > 0 ? "+" : ""}{currentCrypto.data?.dp?.toFixed(2)}%)
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Crypto;
