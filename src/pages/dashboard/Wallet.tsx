import { ChangeEvent, useEffect, useRef, useState } from "react";
import WalletCard from "../../components/WalletCard";
import { useUser } from "../../hooks/UserContext";
import myFetch from "../../lib/myFect";
import { Button } from "../../components/button";
import { Plus } from "lucide-react";
import { Label } from "../../components/label";
import { Input } from "../../components/input";
import { useToast } from "../../components/use-toast";

interface Wallet {
  id: number;
  nom: string;
  description: string;
  solde: number;
}


const Wallet = () => {
  const { user } = useUser();
  const [isForm, setForm] = useState(false);
  const [relaod, setReload] = useState(false);
  const [, setLoading] = useState<boolean>(false);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      myFetch("wallet/get", {
        method: "GET",
        data: new FormData(),
        token: user?.token as string,
      })
        .then(async (res) => {
          if (res.ok) {
            const value = await res.json();
         
            setWallets(value.data);
            setLoading(false);
          } else if (res.status == 404) {
            setError("Pas de Portefeuille");
          } else {
            const value = await res.json();
            setError(value.message);
          }
        })
        .catch((err) => {
          setError(err.message);
        });
    };

    fetchData();
  }, [relaod, user?.token]);

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    if (formRef.current) {
      const data = new FormData(formRef.current);
      myFetch("wallet/add", {
        method: "POST",
        data: data,
        token: user?.token ?? "",
      })
        .then(async (res) => {
          if (res.ok) {
            toast({
              title: "Success",
              description: "Ajout du portefeuille reussi",
              variant: "success",
            });
            setForm(!isForm);
            setReload(!relaod)
          } else {
            toast({
              title: "Erreur",
              description: "Erreur lors de l'ajout du portefeuille",
              variant: "destructive",
            });
          }
        })
        .catch((error) => {
          toast({
            title: "Erreur",
            description: error.message,
            variant: "destructive",
          });
        });
    }

    event.preventDefault();
  };

  return (
    <div className="pt-8">
      <div className="max-w-md flex flex-col space-y-6">
        {error && !isForm && (
          <p className="border-2 text-center p-24 border-dotted text-slate-600">
            {error}
          </p>
        )}
        {isForm && (
          <form ref={formRef} className="space-y-4 p-4" onSubmit={onSubmit}>
            <div>
              <Label htmlFor="name">Nom</Label>
              <Input name="name" id="name" />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input name="description" id="description" />
            </div>
            <div>
              <Label htmlFor="solde">Solde</Label>
              <Input name="solde" id="solde" type="number" />
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                className="hover:bg-atomicTangerine/20"
                onClick={() => setForm(!isForm)}
              >
                Annuler
              </Button>
              <Button
                className="bg-atomicTangerine/80 
              hover:bg-atomicTangerine"
                type="submit"
              >
                Valider
              </Button>
            </div>
          </form>
        )}
        {/* <WalletCard
          walletData={{
            name: "Orange Money",
            description: "Service de paiement Orange CM",
            solde: 500000,
          }}
        /> */}

        {!error && !isForm && (
          <div className="overflow-scroll max-h-[calc(100vh-200px)] pb-2 space-y-4">
            {wallets.map((wallet) => (
              <WalletCard
                walletData={{ ...wallet }}
                reload={() => setReload((val) => !val)}
              />
            ))}
          </div>
        )}
        <Button
          className={`space-x-2 bg-atomicTangerine/10
           text-licorice font-semibold hover:bg-atomicTangerine
            hover:text-white w-full ${isForm ? "hidden" : ""}`}
          onClick={() => setForm(!isForm)}
        >
          <Plus />
          <span> Ajouter un portefeuille</span>
        </Button>
      </div>
    </div>
  );
};

export default Wallet;
