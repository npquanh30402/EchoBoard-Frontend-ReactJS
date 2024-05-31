import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";
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
