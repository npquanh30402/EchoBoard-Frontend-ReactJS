import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useDocumentTitle } from "../../hooks";
import React, { useState } from "react";
import { fetchProfileService, loginService } from "../../services";
import { LOGIN, PROFILE } from "../../store/authSlice.ts";
import { UserInterface } from "../../interfaces";
import { RouteEnum } from "../../enums";
import { sanitizeAndTrimString } from "../../utils";

export const Login = () => {
  useDocumentTitle("Login");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isFormValid = () => {
    return formData.email && formData.password;
  };

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formDataObject = new FormData();

    formDataObject.append("email", sanitizeAndTrimString(formData.email));
    formDataObject.append("password", sanitizeAndTrimString(formData.password));

    const data = (await loginService(formDataObject)) as UserInterface;

    if (data) {
      dispatch(LOGIN(data));

      const profileData = await fetchProfileService(data.id);

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
              <label className={`input input-bordered flex items-center gap-2`}>
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
            </div>
            <div className={"text-left"}>
              <label className={`input input-bordered flex items-center gap-2`}>
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
            </div>
            <div
              className={
                "flex flex-col md:flex-row justify-between items-center"
              }
            >
              <button className={`btn btn-primary`} disabled={!isFormValid()}>
                Login
              </button>
              <Link to={RouteEnum.FORGOT_PASSWORD} className={"btn btn-ghost"}>
                Forgot Password
              </Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};
