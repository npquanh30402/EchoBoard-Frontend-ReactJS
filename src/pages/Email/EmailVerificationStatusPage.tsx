import { useLocation } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { LOGOUT } from "../../store/authSlice.ts";

export const EmailVerificationStatusPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const status = query.get("status");

  const dispatch = useAppDispatch();

  if (status === "success") {
    dispatch(LOGOUT());
  }

  return (
    <section id={"email-verification-status"}>
      <div className={"flex flex-col justify-center items-center my-12 mx-12"}>
        {status === "success" ? (
          <div role="alert" className="alert alert-success">
            <i className="bi bi-info-circle"></i>
            <span>
              Your email has been verified successfully! You can now log in!
            </span>
          </div>
        ) : (
          <div role="alert" className="alert alert-error">
            <i className="bi bi-radioactive"></i>
            <span>
              Verification failed. Please try again or contact support.
            </span>
          </div>
        )}
      </div>
    </section>
  );
};
