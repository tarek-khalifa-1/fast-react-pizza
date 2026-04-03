import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import CartOverview from "../features/cart/CartOverview";
import LoaderSpinner from "./LoaderSpinner";
import MainContent from "./MainContent";

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <LoaderSpinner />}
      <Header />
      <MainContent>
        <Outlet />
      </MainContent>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
