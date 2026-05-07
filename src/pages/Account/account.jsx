import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./account.css";

const API_URL = "";

function Account() {
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        return;
      }

      try {
        const res = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken })
          });

          if (refreshRes.ok) {
            const tokens = await refreshRes.json();
            localStorage.setItem("accessToken", tokens.accessToken);
            localStorage.setItem("refreshToken", tokens.refreshToken);

            const meRes = await fetch(`${API_URL}/auth/me`, {
              headers: { Authorization: `Bearer ${tokens.accessToken}` }
            });
            const data = await meRes.json();
            setUser(data.user);
          } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
          }
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      }
    };

    checkAuth();
  }, []);

  const handleToggle = () => {
    setIsLogIn(!isLogIn);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogIn) {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Login failed");
        }

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        setUser(data.user);
        navigate("/");
      } else {
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }

        const res = await fetch(`${API_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, firstName, lastName })
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Registration failed");
        }

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        setUser(data.user);
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: { Authorization: `Bearer ${accessToken}` }
        });
      } catch (err) {
        console.error("Logout failed:", err);
      }
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setEmail("");
    setPassword("");
  };

  const isFormValid = isLogIn
    ? email.trim() !== "" && password.trim() !== ""
    : firstName.trim() !== "" && lastName.trim() !== "" && email.trim() !== "" && password.trim() !== "" && confirmPassword.trim() !== "";

  if (user) {
    return (
      <div className="account-container">
        <div className="account-box">
          <div className="account-header">
            <h3>My Account</h3>
          </div>
          <div className="content-panel">
            <div className="account-panel">
              <div className="user-info">
                <p>Welcome, <strong>{user.firstName} {user.lastName}</strong></p>
                <p className="user-email">{user.email}</p>
              </div>
              <button className="account-button active" onClick={handleLogout}>
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-container">
      <div className="account-box">
        <div className="account-header">
          <h3>My Account</h3>
        </div>
        <div className="content-panel">
          {isLogIn ? (
            <div className="account-panel">
              <div className="account-panel-container">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div className="error-message">{error}</div>}
                <button
                  className={`account-button ${isFormValid && !loading ? 'active' : 'disabled'}`}
                  disabled={!isFormValid || loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>
              </div>
              <div className="account-toggle-text">
                Don't have an account? <span onClick={handleToggle}>Sign-Up instead!</span>
              </div>
            </div>
          ) : (
            <div className="account-panel">
              <div className="account-panel-container">
                <div className="name-row">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Re-Enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {error && <div className="error-message">{error}</div>}
                <button
                  className={`account-button ${isFormValid && !loading ? 'active' : 'disabled'}`}
                  disabled={!isFormValid || loading}
                  onClick={handleSubmit}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>
              <div className="account-toggle-text">
                Already have an account? <span onClick={handleToggle}>Log-In instead!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Account;
