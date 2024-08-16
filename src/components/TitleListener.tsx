import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TitleListener = () => {
    const location = useLocation()
    const [locationName, setLocationName] = useState("");

  useEffect(() => {
    switch(location.pathname) {
        case "/":
            setLocationName("Dashboard");
            break;
        case "/transactions":
            setLocationName("Transactions");
            break;
        case "/invoices":
            setLocationName("Factures");
            break;
        case "/wallet":
            setLocationName("Portefeuille");
            break;
        case "/settings":
            setLocationName("Parametres");
            break;
        default:
            setLocationName("Dashboard");
    }
  }, [location]);
  return <h2 className="font-bold text-licorice text-3xl">{locationName}</h2>;
};

export default TitleListener;
