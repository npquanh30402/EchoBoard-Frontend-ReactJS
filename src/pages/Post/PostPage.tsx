import { Outlet } from "react-router-dom";

export const PostPage = () => {
  return (
    <section id={"post"}>
      <Outlet />
    </section>
  );
};
