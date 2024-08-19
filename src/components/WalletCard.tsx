import { ChangeEvent, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import { Popover, PopoverTrigger, PopoverContent } from "./popover";
import { Edit3, EllipsisVertical, Trash2 } from "lucide-react";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import myFetch from "../lib/myFect";
import { useUser } from "../hooks/UserContext";
import { useToast } from "./use-toast";

const WalletCard = ({
  walletData,
  reload,
}: {
  walletData: {
    nom: string;
    description: string;
    solde: number;
    id: number;
  };
  reload: () => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [wallet, setWallet] = useState(walletData);
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useUser();
  const { toast } = useToast();

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    if (formRef.current) {
      const data = new FormData(formRef.current);
      data.set("wallet_id", walletData.id.toString());
      myFetch("wallet/update", {
        method: "POST",
        data: data,
        token: user?.token ?? "",
      })
        .then(async (res) => {
          if (res.ok) {
            toast({
              title: "Succes",
              description: "Portefeuille mis a jour",
              variant: "success",
            });

            setIsEditing(!isEditing);
            reload();
          } else {
            const value = await res.json();

            toast({
              title: "Erreur",
              description: value.message,
              variant: "destructive",
            });
          }
        })
        .catch((err) => {
          toast({
            title: "Erreur",
            description: err.message,
            variant: "destructive",
          });
        });
    }
    e.preventDefault();
  };

  const onDelete = () =>{
    const data = new FormData();
    data.set('wallet_id', walletData.id.toString());

    myFetch('wallet/delete', {
      method : 'POST',
      data : data,
      token : user?.token ?? ""
    }).then(async(res)=>{
      if(res.ok){
        toast({
          title : 'Succes',
          description: 'Portefeuille supprime',
          variant: 'success'
        })
        reload();
      }else{
        const data = await res.json();
        toast({
          title : 'Erreur',
          description: data.message,
          variant: 'destructive'
        })
      }
    }).catch((err)=>{
      toast({
        title : 'Erreur',
        description: err.message,
        variant: 'destructive'
      })
    })
  }
  return (
    <Card>
      {isEditing ? (
        <form ref={formRef} className="space-y-4 p-4" onSubmit={onSubmit}>
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input
              name="name"
              id="name"
              value={wallet.nom}
              onChange={(e) => setWallet({ ...wallet, nom: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              name="description"
              id="description"
              value={wallet.description}
              onChange={(e) =>
                setWallet({ ...wallet, description: e.target.value })
              }
            />
          </div>
          <div>
            <Label htmlFor="solde">Solde</Label>
            <Input
              name="solde"
              id="solde"
              type="number"
              value={wallet.solde}
              onChange={(e) =>
                setWallet({ ...wallet, solde: Number(e.target.value) })
              }
            />
          </div>
          <div className="flex justify-between">
            <Button
              variant="outline"
              className="hover:bg-atomicTangerine/20"
              onClick={() => setIsEditing(!isEditing)}
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
      ) : (
        <>
          {" "}
          <CardHeader>
            <CardTitle className="flex justify-between">
              {wallet.nom}
              <Popover>
                <PopoverTrigger>
                  <EllipsisVertical size="16" className="text-slate-700" />
                </PopoverTrigger>
                <PopoverContent className="w-fit space-y-3">
                  <div
                    className="flex space-x-2 items-center 
                    cursor-pointer hover:bg-atomicTangerine/10
                    px-2 py-1"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit3 size="16" className="text-sm" />{" "}
                    <span>Modifier</span>
                  </div>
                  <div
                    className="flex space-x-2 items-center 
                   cursor-pointer hover:bg-atomicTangerine/10
                   px-2 py-1 text-red-500"
                   onClick={onDelete}
                  >
                    <Trash2 size="16" /> <span>Supprimer</span>
                  </div>
                </PopoverContent>
              </Popover>
            </CardTitle>
            <CardDescription>{wallet.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-2">
            <div>
              <p className="text-slate-400">votre solde</p>
              <p className="font-bold text-xl">
                {new Intl.NumberFormat().format(wallet.solde)} F
              </p>
            </div>
            <div>
              <p className="text-slate-400">Monaire</p>
              <p>FCFA</p>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};

export default WalletCard;
