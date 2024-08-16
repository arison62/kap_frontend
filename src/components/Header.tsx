import { useUser } from "../hooks/UserContext";
import TitleListener from "./TitleListener";

const Header = ({ className }: { className?: string }) => {
  const { user } = useUser();
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center">
      <TitleListener />
        <div>
          <div
            className="flex gap-3 justify-center 
            items-center bg-slate-50
            p-2 rounded-full"
          >
            <p
              className="font-bold rounded-full 
                border w-12 h-12 flex items-center 
                justify-center shadow-inner
                shadow-atomicTangerine/10
                bg-atomicTangerine/10"
            >
              {user?.email.substring(0, 2).toUpperCase()}
            </p>
            <p className="font-medium text-slate-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
