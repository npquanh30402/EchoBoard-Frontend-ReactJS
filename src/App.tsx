import { Outlet } from "react-router-dom";
import { Header } from "./components/Layouts/Header.tsx";
import { Footer } from "./components/Layouts/Footer.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

function App() {
  return (
    <>
      <Provider store={store}>
        <Header />
        <main className={"min-h-screen flex flex-col"}>
          <Outlet />
        </main>
        <Footer />
      </Provider>
    </>
  );
}

export default App;
