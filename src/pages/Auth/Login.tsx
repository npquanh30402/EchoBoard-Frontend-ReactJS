import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useDocumentTitle } from "../../hooks";
import React, { useState } from "react";
import { loginService, profileService } from "../../services";
import { LOGIN, PROFILE } from "../../store/authSlice.ts";
import DOMPurify from "dompurify";
import { UserInterface } from "../../interfaces";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useDocumentTitle("Login");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "email") {
      setErrors({
        ...errors,
        email: /\S+@\S+\.\S+/.test(value) ? "" : "Email is not valid",
      });
    } else if (name === "password") {
      setErrors({
        ...errors,
        password:
          value.length < 8 ? "Password must be at least 8 characters long" : "",
      });
    }
  };

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const authDetail = {
      email: DOMPurify.sanitize(formData.get("email") as string),
      password: DOMPurify.sanitize(formData.get("password") as string),
    };

    const data = (await loginService(authDetail)) as UserInterface;

    if (data) {
      dispatch(LOGIN(data));

      const profileData = await profileService(data.id);

      dispatch(PROFILE(profileData));

      navigate("/");
    }
  }

  return (
    <>
      <section id={"login"}>
        <div className={"mx-auto max-w-md p-4 rounded-xl text-center"}>
          <h1
            className={"font-bold text-2xl underline underline-offset-8 mb-6"}
          >
            Login
          </h1>
          <form className={"flex flex-col gap-4"} onSubmit={handleLogin}>
            <div className={"text-left"}>
              <label
                className={`input input-bordered flex items-center gap-2 ${errors.email && "input-error"}`}
              >
                <i className="bi bi-envelope text-xl"></i>
                <input
                  type="text"
                  placeholder="Email"
                  className={"grow"}
                  name={"email"}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete={"off"}
                />
              </label>
              {errors.email && (
                <p className={"text-sm text-red-500 mt-2"}>{errors.email}</p>
              )}
            </div>
            <div className={"text-left"}>
              <label
                className={`input input-bordered flex items-center gap-2 ${errors.password && "input-error"}`}
              >
                <i className="bi bi-key text-xl"></i>
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Password"
                  className={`grow`}
                  name={"password"}
                  autoComplete={"off"}
                  onChange={handleChange}
                  value={formData.password}
                />
                {!showPassword ? (
                  <i
                    onClick={() => setShowPassword(!showPassword)}
                    className="bi bi-eye-slash text-xl cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowPassword(!showPassword)}
                    className="bi bi-eye text-xl cursor-pointer"
                  ></i>
                )}
              </label>
              {errors.password && (
                <p className={"text-sm text-red-500 mt-2"}>{errors.password}</p>
              )}
            </div>
            <div
              className={
                "flex flex-col md:flex-row justify-between items-center"
              }
            >
              <button
                className={`btn btn-primary`}
                disabled={!!(errors.email || errors.password)}
              >
                Login
              </button>
              <Link to={"/forgot-password"} className={"btn btn-ghost"}>
                Forgot Password
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
