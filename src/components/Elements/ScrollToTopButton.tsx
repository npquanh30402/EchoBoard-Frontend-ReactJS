import { useEffect, useState } from "react";

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <button
          className={" btn btn-ghost btn-circle fixed bottom-20 right-5"}
          onClick={scrollToTop}
        >
          <i className="bi bi-arrow-up-circle text-3xl md:text-5xl"></i>
        </button>
      )}
    </>
  );
};
