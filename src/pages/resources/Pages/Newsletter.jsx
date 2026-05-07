import { useState } from "react";
import "../Pages.css";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e) => {
        e.preventDefault();

        if (!email) return;

        setSubscribed(true);
        setEmail("");
    };

    return (
        <div className="newsletter-page">
            <div className="newsletter-content">

                <h1 className="newsletter-title">Subscribe to Our Newsletter</h1>

                <p className="newsletter-desc">
                    Stay ahead with the latest news, breaking stories, and exclusive
                    insights from <span className="newsletter-brand"><b>The Bharat Times</b></span>.
                </p>

                {!subscribed ? (
                    <form className="newsletter-form" onSubmit={handleSubscribe}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="newsletter-input"
                        />

                        <button type="submit" className="newsletter-btn">
                            Subscribe
                        </button>
                    </form>
                ) : (
                    <div className="newsletter-success">
                        ✅ Thank you for subscribing!
                    </div>
                )}
            </div>
        </div>
    );
}
