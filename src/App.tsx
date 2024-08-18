import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./pages/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from "./hooks/UserContext";
import { Toaster } from "./components/toaster";
import Summary from "./pages/dashboard/Summary";
import Transactions from "./pages/dashboard/Transactions";
import Invoices from "./pages/dashboard/Invoices";
import Wallet from "./pages/dashboard/Wallet";
import Settings from "./pages/dashboard/Settings";


function App() {
 
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />}>
              <Route index element={<Summary />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="invoices" element={<Invoices />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </UserProvider>
  );
}

export default App;
