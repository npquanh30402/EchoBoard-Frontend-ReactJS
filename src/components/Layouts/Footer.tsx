export const Footer = () => {
  return (
    <>
      <footer className="footer flex flex-col md:flex-row md:justify-between items-center p-4 bg-base-200">
        <aside className="items-center grid-flow-col gap-4">
          <i className="bi bi-signpost-fill text-3xl"></i>
          <p>Copyright © {new Date().getFullYear()} - All right reserved</p>
        </aside>
        <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a href={"/"} target={"_blank"}>
            <i className="cursor-pointer bi bi-twitter-x text-2xl"></i>
          </a>
          <a href={"/"} target={"_blank"}>
            <i className=" cursor-pointer bi bi-github text-2xl"></i>
          </a>
          <a href={"/"} target={"_blank"}>
            <i className="cursor-pointer bi bi-facebook text-2xl"></i>
          </a>
        </nav>
      </footer>
    </>
  );
};
