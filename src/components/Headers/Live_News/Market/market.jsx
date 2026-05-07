import StockMarket from "./StockMarket/stockMarket.jsx";
import Crypto from "./Crypto/crypto.jsx";
import Currency from "./Currency/currency.jsx";

function Market() {
    return (
        <div className="marketPanel">
            <StockMarket />
            <Crypto />
            <Currency />
        </div>
    );
}

export default Market;
