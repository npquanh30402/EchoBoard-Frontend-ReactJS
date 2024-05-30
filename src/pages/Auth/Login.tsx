import { Link, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../hooks/useDocumentTitle.ts";
import React from "react";
import { loginService } from "../../services";
import { useAppDispatch } from "../../hooks";
import { LOGIN } from "../../store/authSlice.ts";

export const Login = () => {
  useDocumentTitle("Login");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const authDetail = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const data = await loginService(authDetail);

    if (data) {
      dispatch(LOGIN(data));

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
            <label className="input input-bordered flex items-center gap-2">
              <i className="bi bi-envelope text-xl"></i>
              <input
                type="text"
                placeholder="Email"
                className={"grow"}
                name={"email"}
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <i className="bi bi-key text-xl"></i>
              <input
                type="password"
                placeholder="Password"
                className={"grow"}
                name={"password"}
              />
            </label>
            <div
              className={
                "flex flex-col md:flex-row justify-between items-center"
              }
            >
              <button className={"btn btn-primary"}>Login</button>
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
