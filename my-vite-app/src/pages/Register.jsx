// src/pages/Register.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser({ name, email, password }));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-lg border-0 rounded-4" style={{ maxWidth: 420, width: "100%" }}>
        <div className="card-body p-4">
          <h3 className="fw-bold mb-3 text-center">Create account ✨</h3>
          <p className="text-muted text-center mb-4">
            Start organizing your interview prep efficiently.
          </p>

          {auth.error && (
            <div className="alert alert-danger py-2">{auth.error}</div>
          )}

          <form className="vstack gap-3" onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className="form-control"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              className="btn btn-success w-100"
              type="submit"
              disabled={auth.status === "loading"}
            >
              {auth.status === "loading" ? "Creating..." : "Sign up"}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
