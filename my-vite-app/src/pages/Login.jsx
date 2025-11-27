import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { fetchTasks } from "../store/tasksSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await dispatch(loginUser(form));

    if (res.meta.requestStatus === "fulfilled") {
      await dispatch(fetchTasks());
      navigate("/dashboard");
    }
  };

  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div
        className="card shadow-lg border-0 rounded-4"
        style={{ maxWidth: 420, width: "100%" }}
      >
        <div className="card-body p-4">
          <h3 className="fw-bold mb-3 text-center">Welcome back 👋</h3>
          <p className="text-muted text-center mb-4">
            Log in to manage your interview prep tasks.
          </p>

          {auth.error && (
            <div className="alert alert-danger py-2">{auth.error}</div>
          )}

          <form className="vstack gap-3" onSubmit={handleSubmit}>
            {/* Email */}
            <input
              className="form-control"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              required
            />

            {/* Password */}
            <input
              className="form-control"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              required
            />

            <button
              className="btn btn-primary w-100"
              type="submit"
              disabled={auth.loading}
            >
              {auth.loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="text-center mt-3 mb-0">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
