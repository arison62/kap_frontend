import logoImg from "../assets/logo_sm.png";
import { NavLink, Outlet } from "react-router-dom";

import {
  House,
  ChartNoAxesCombined,
  Ticket,
  Wallet,
  Settings,
  LogOut,
} from "lucide-react";
import { useUser } from "../hooks/UserContext";
import Header from "../components/Header";

const Dashboard = () => {
  const { updateUser } = useUser();
  return (
    <div className="w-full h-full flex">
      <div className="flex flex-col px-5 bg-atomicTangerine/10 py-8">
        <h1 className="flex items-baseline">
          <img src={logoImg} alt="logo img" width={32} />
          <span className="text-2xl font-montserrat font-semibold text-licorice">
            Kap
          </span>
        </h1>
        <div className="flex flex-col mt-12 space-y-5 h-full">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "group isActive" : "")}
          >
            <button
              className="w-full bg-transparent 
            flex items-center px-4 py-2
            shadow-none text-licorice
            rounded
            space-x-2 hover:bg-atomicTangerine/50 
            group-[&.isActive]:bg-atomicTangerine
            group-[&.isActive]:text-white"
            >
              <House />
              <span>Dashboard</span>
            </button>
          </NavLink>

          <NavLink
            to="transactions"
            className={({ isActive }) => (isActive ? "group isActive" : "")}
          >
            <button
              className="w-full bg-transparent 
            flex items-center px-4 py-2
            shadow-none text-licorice
            rounded
            space-x-2 hover:bg-atomicTangerine/50 
            group-[&.isActive]:bg-atomicTangerine
            group-[&.isActive]:text-white"
            >
              <ChartNoAxesCombined />
              <span>Transactions</span>
            </button>
          </NavLink>

          <NavLink
            to="invoices"
            className={({ isActive }) => (isActive ? "group isActive" : "")}
          >
            <button
              className="w-full bg-transparent 
            flex items-center px-4 py-2
            shadow-none text-licorice
            rounded
            space-x-2 hover:bg-atomicTangerine/50 
            group-[&.isActive]:bg-atomicTangerine
            group-[&.isActive]:text-white"
            >
              <Ticket />
              <span>Factures</span>
            </button>
          </NavLink>
          <NavLink
            to="wallet"
            className={({ isActive }) => (isActive ? "group isActive" : "")}
          >
            <button
              className="w-full bg-transparent 
            flex items-center px-4 py-2
            shadow-none text-licorice
            rounded
            space-x-2 hover:bg-atomicTangerine/50 
            group-[&.isActive]:bg-atomicTangerine
            group-[&.isActive]:text-white"
            >
              <Wallet />
              <span>Portefeuille</span>
            </button>
          </NavLink>

          <NavLink
            to="settings"
            className={({ isActive }) => (isActive ? "group isActive" : "")}
          >
            <button
              className="w-full bg-transparent 
            flex items-center px-4 py-1
            shadow-none text-licorice
            rounded
            space-x-2 hover:bg-atomicTangerine/50 
            group-[&.isActive]:bg-atomicTangerine
            group-[&.isActive]:text-white"
            >
              <Settings />
              <span>Paramètres</span>
            </button>
          </NavLink>
          <div className="w-full h-full flex justify-center items-end">
            <button
              onClick={() => {
                updateUser(null);
              }}
              className="w-full bg-transparent 
            flex items-center px-4 py-1
            shadow-none text-licorice
            rounded
            space-x-2 hover:bg-atomicTangerine/50 
            group-[&.isActive]:bg-atomicTangerine
            group-[&.isActive]:text-white"
            >
              <LogOut />
              <span>Deconnexion</span>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full px-5">
        <Header className="pt-8" />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
