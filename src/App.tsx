import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import PrivateRoute from "./pages/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import { UserProvider } from "./hooks/UserContext";
import { Toaster } from "./components/toaster";


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </UserProvider>
  );
}

export default App;
