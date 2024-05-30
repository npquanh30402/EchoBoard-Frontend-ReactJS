import React from "react";
import { useDocumentTitle } from "../../hooks/useDocumentTitle.ts";
import { useNavigate } from "react-router-dom";
import { registerService } from "../../services";

export const Register = () => {
  useDocumentTitle("Register");

  const navigate = useNavigate();

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const authDetail = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const data = await registerService(authDetail);

    if (data) {
      navigate("/login");
    }
  }

  return (
    <>
      <section id={"register"}>
        <div className={"mx-auto max-w-md p-4 rounded-xl text-center"}>
          <h1
            className={"font-bold text-2xl underline underline-offset-8 mb-6"}
          >
            Register
          </h1>
          <form className={"flex flex-col gap-4"} onSubmit={handleRegister}>
            <label className="input input-bordered flex items-center gap-2">
              <i className="bi bi-person text-xl"></i>
              <input
                type="text"
                placeholder="Username"
                className={"grow"}
                name={"username"}
              />
            </label>
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
            <button className={"btn btn-primary"}>Register</button>
          </form>
        </div>
      </section>
    </>
  );
};
