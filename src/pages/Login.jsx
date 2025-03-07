import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState("");
  const [formSubmitting, setFormSubmitting] = useState(false);

  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    // Simple validation
    if (!formData.email || !formData.password) {
      setFormError("Email and password are required");
      return;
    }

    try {
      setFormSubmitting(true);
      await login(formData.email, formData.password);

      // Redirect to home page after successful login
      navigate("/");
    } catch (err) {
      console.error("Login submission error:", err);
      setFormError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 px-4">
      <h1 className="text-3xl font-serif font-bold text-center text-black mb-8">
        Sign In
      </h1>

      {(formError || error) && (
        <div className="bg-red-50 text-red-700 p-4 rounded-md mb-6">
          {formError || error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-gray-700 mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 transition duration-300"
          disabled={formSubmitting}
        >
          {formSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <p className="mt-6 text-center text-gray-600">
        Don't have an account?{" "}
        <Link to="/register" className="text-black underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
