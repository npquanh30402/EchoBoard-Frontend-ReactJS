import { Outlet, ScrollRestoration } from "react-router-dom";
import { Footer, Header } from "./components";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import { ScrollToTopButton } from "./components/Elements";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <main className={"min-h-screen flex flex-col"}>
          <Outlet />
          <ScrollToTopButton />
        </main>
        <Footer />
        <ScrollRestoration />
      </Provider>
    </>
  );
}

export default App;
