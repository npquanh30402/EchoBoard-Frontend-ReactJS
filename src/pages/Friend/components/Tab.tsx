import { NavLink } from "react-router-dom";

export const Tab = () => {
  function tabClassName({
    isActive,
    isPending,
  }: {
    isActive: boolean;
    isPending: boolean;
  }) {
    let classes = "tab p-6 flex flex-col justify-center items-center font-bold";
    if (isPending) {
      classes += " pending";
    } else if (isActive) {
      classes += " tab-active";
    }
    return classes;
  }

  return (
    <>
      <div role="tablist" className="tabs tabs-boxed mb-6">
        <NavLink to={"friend-request"} role="tab" className={tabClassName}>
          Friend Requests
        </NavLink>
        <NavLink to={"all-friends"} role="tab" className={tabClassName}>
          All Friends
        </NavLink>
        <NavLink to={"sent-request"} role="tab" className={tabClassName}>
          Sent Requests
        </NavLink>
      </div>
    </>
  );
};
