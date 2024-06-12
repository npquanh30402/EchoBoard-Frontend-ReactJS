import { sendEmailVerificationService } from "../../services";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { RouteEnum } from "../../enums";

export const EmailVerificationPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  if (user?.emailVerified) {
    navigate(RouteEnum.HOME);
  }

  async function sendEmailVerification() {
    const data = await sendEmailVerificationService({});

    if (data) {
      toast.success("Send email verification successfully!");
    }
    return !!data;
  }

  return (
    <section id={"email-verification-page"}>
      <div className={"flex flex-col justify-center items-center my-12 gap-6"}>
        <h1 className={"font-bold underline underline-offset-8"}>
          Email Verification
        </h1>
        <p>
          We've sent you an email verification upon your registration. Kindly
          check your inbox.
        </p>
        <p>If you did not receive the email, please click the button below</p>
        <button className={"btn btn-primary"} onClick={sendEmailVerification}>
          Resend email verification
        </button>
      </div>
    </section>
  );
};
