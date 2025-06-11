import HomePage from "./HomePage";
import CartOverview from "../features/cart/CartOverview";
import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import Spinner from "./Spinner";
function AppLayout() {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {loading && <Spinner />}
      <header>
        <HomePage />
      </header>
      <div className="mt-10 overflow-scroll">
        <main className="mx-auto max-w-3xl">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
