import React, { useState } from "react";
import { useDocumentTitle } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { registerService, sendEmailVerificationService } from "../../services";
import { sanitizeAndTrimString } from "../../utils";

export const Register = () => {
  useDocumentTitle("Register");

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });

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
    } else if (name === "username") {
      setErrors({
        ...errors,
        username:
          value.length < 3 ? "Username must be at least 3 characters long" : "",
      });
    } else if (name === "password") {
      setErrors({
        ...errors,
        password:
          value.length < 8 ? "Password must be at least 8 characters long" : "",
      });
    } else if (name === "confirm_password") {
      setErrors({
        ...errors,
        confirm_password:
          value == formData.password ? "" : "Passwords do not match",
      });
    }
  };

  const isFormValid = () => {
    return (
      !errors.username &&
      !errors.email &&
      !errors.password &&
      !errors.confirm_password &&
      formData.username &&
      formData.email &&
      formData.password &&
      formData.confirm_password
    );
  };

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formDataObject = new FormData();

    formDataObject.append("username", sanitizeAndTrimString(formData.username));
    formDataObject.append("email", sanitizeAndTrimString(formData.email));
    formDataObject.append("password", sanitizeAndTrimString(formData.password));

    const data = await registerService(formDataObject);

    if (data) {
      await sendEmailVerification(formData.email);

      navigate("/login");
    }
  }

  async function sendEmailVerification(email: string) {
    const formData = new FormData();
    formData.append("email", sanitizeAndTrimString(email));

    const data = await sendEmailVerificationService(formData);
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
            <div className={"text-left"}>
              <label
                className={`input input-bordered flex items-center gap-2 ${errors.email && "input-error"}`}
              >
                <i className="bi bi-person text-xl"></i>
                <input
                  type="text"
                  placeholder="Username"
                  className={"grow"}
                  name={"username"}
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete={"off"}
                />
              </label>
              {errors.username && (
                <p className={"text-sm text-red-500 mt-2"}>{errors.username}</p>
              )}
            </div>
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
                  type={`${showPassword.password ? "text" : "password"}`}
                  placeholder="Password"
                  className={`grow`}
                  name={"password"}
                  autoComplete={"off"}
                  onChange={handleChange}
                  value={formData.password}
                />
                {!showPassword.password ? (
                  <i
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        password: !showPassword.password,
                      })
                    }
                    className="bi bi-eye-slash text-xl cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        password: !showPassword.password,
                      })
                    }
                    className="bi bi-eye text-xl cursor-pointer"
                  ></i>
                )}
              </label>
              {errors.password && (
                <p className={"text-sm text-red-500 mt-2"}>{errors.password}</p>
              )}
            </div>
            <div className={"text-left"}>
              <label
                className={`input input-bordered flex items-center gap-2 ${errors.confirm_password && "input-error"}`}
              >
                <i className="bi bi-key text-xl"></i>
                <input
                  type={`${showPassword.confirm_password ? "text" : "password"}`}
                  placeholder="Confirm password"
                  className={`grow`}
                  name={"confirm_password"}
                  autoComplete={"off"}
                  onChange={handleChange}
                  value={formData.confirm_password}
                />
                {!showPassword.confirm_password ? (
                  <i
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        confirm_password: !showPassword.confirm_password,
                      })
                    }
                    className="bi bi-eye-slash text-xl cursor-pointer"
                  ></i>
                ) : (
                  <i
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        confirm_password: !showPassword.confirm_password,
                      })
                    }
                    className="bi bi-eye text-xl cursor-pointer"
                  ></i>
                )}
              </label>
              {errors.confirm_password && (
                <p className={"text-sm text-red-500 mt-2"}>
                  {errors.confirm_password}
                </p>
              )}
            </div>
            <button disabled={!isFormValid()} className={"btn btn-primary"}>
              Register
            </button>
          </form>
        </div>
      </section>
    </>
  );
};
