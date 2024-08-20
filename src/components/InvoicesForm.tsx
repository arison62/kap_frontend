import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { useUser } from "../hooks/UserContext";

import myFetch from "../lib/myFect";
import { CalendarIcon, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { cn } from "../lib/utils";
import { addDays, format } from "date-fns";
import { Calendar } from "./calendar";
import CardInvoice from "./CardInvoice";
import { Link } from "react-router-dom";
import { toast } from "./use-toast";

type CustomerType = {
  nom: string;
  adresse: string;
  telephone: string;
  email: string;
  id: number;
};

type WalletType = {
  id: number;
  solde: number;
  nom: string;
  description: string;
};

const InvoicesForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [customer, setCustomer] = useState<CustomerType[]>();
  const [wallet, setWallet] = useState<WalletType[]>();
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);

  const [selectedCustomer, setSelectedCustomer] = useState(0);
  const [selectedWallet, setSelectedWallet] = useState(0);
  const { user } = useUser();
  const [date, setDate] = useState<Date>(new Date());
  const [price, setPrice] = useState(500);
  const [typeInvoice, setTypeInvoice] = useState("depense");
  const [statusInvoice, setStatusInvoice] = useState("en_cours");

  const onTypeInvoiceChange = (value: string) => {
    setTypeInvoice(value);
  };

  const onStatusInvoiceChange = (value: string) => {
    setStatusInvoice(value);
  };

  const onSubmit = (event: ChangeEvent<HTMLFormElement>) => {
    if (formRef.current) {
      const data = new FormData(formRef.current);
      const walletData = wallet?.[selectedWallet];
      data.set("wallet_id", walletData?.id.toString() as string);
      data.set("type", "client");

      myFetch("invoice/add", {
        method: "POST",
        data,
        token: user?.token as string,
      })
        .then(async (res) => {
          if (res.ok) {
            
            toast({
              title: "Succes",
              description: "Facture ajoute",
              variant: "success",
            })
          } else {
            const value = await res.json();
            toast({
              title: "Error",
              description: value.message,
              variant: "destructive",
            });
            setError(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          //setIsLoading(false);
        });
    }

    event.preventDefault();
    setReload(!reload);
  };
  useEffect(() => {
    const fetchData = () => {
      myFetch("customer/get", {
        method: "GET",
        data: new FormData(),
        token: user?.token as string,
      })
        .then(async (res) => {
          if (res.ok) {
            const value = await res.json();
            setCustomer(value.data);
          } else {
            setError(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          //setIsLoading(false);
        });
    };

    fetchData();
  }, [user?.token, reload]);
  useEffect(() => {
    const fetchData = () => {
      myFetch("wallet/get", {
        method: "GET",
        data: new FormData(),
        token: user?.token as string,
      })
        .then(async (res) => {
          if (res.ok) {
            const value = await res.json();
            console.log(value);
            setWallet(value.data);
          } else {
            setError(true);
          }
        })
        .catch((err) => {
          console.log(err);
          setError(true);
          //setIsLoading(false);
        });
    };

    fetchData();
  }, [user?.token, reload]);
  return (
    <div>
      <form
        ref={formRef}
        className="mt-8 flex flex-col gap-6 max-w-xl"
        onSubmit={onSubmit}
      >
        <div>
          {error && (
            <Link to="/customer/create">
              <div
                className="h-36 w-full border-dashed 
              border-2 flex items-center 
              justify-center text-slate-600 gap-2"
              >
                <Plus />
                <span> Enregistrer un Client</span>
              </div>
            </Link>
          )}
          {customer && (
            <CardInvoice
              userData={{
                name: customer[selectedCustomer].nom,
                email: customer[selectedCustomer].email,
                address: customer[selectedCustomer].adresse,
                telephone: customer[selectedCustomer].telephone,
              }}
              invoiceData={{
                date: new Date(),
                price: price,
                date_echeance: date,
                status: statusInvoice,
                type: typeInvoice,
              }}
            />
          )}
        </div>
        <div className="flex gap-6 flex-col lg:flex-row">
          {customer && (
            <Select
              onValueChange={(value) => setSelectedCustomer(Number(value))}
              defaultValue="0"
            >
              <SelectTrigger className="h-fit">
                <SelectValue placeholder="Choisir un client" />
              </SelectTrigger>
              <SelectContent>
                {customer.map((data, idx) => (
                  <SelectItem key={data.nom + idx} value={idx.toString()}>
                    <div className="flex flex-col items-start">
                      <span>{data.nom}</span>
                      <span className="text-slate-500">{data.email}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
           {wallet && (
            <Select
              onValueChange={(value) => setSelectedWallet(Number(value))}
              defaultValue="0"
            >
              <SelectTrigger className="h-fit">
                <SelectValue placeholder="Choisir un client" />
              </SelectTrigger>
              <SelectContent>
                {wallet.map((data, idx) => (
                  <SelectItem key={data.nom + idx} value={idx.toString()}>
                    <div className="flex flex-col items-start">
                      <span>{data.nom}</span>
                      <span className="text-slate-500 text-sm">{Intl.NumberFormat("fr-FR").format(data.solde)} FCFA</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex gap-6 flex-col lg:flex-row">
          <div className="w-full flex flex-col space-y-2">
            <Label>Date echeance</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <Select
                  onValueChange={(value) =>
                    setDate(addDays(new Date(), parseInt(value)))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Duree" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="1">Demain</SelectItem>
                    <SelectItem value="3">Dans 3 jours</SelectItem>
                    <SelectItem value="7">Dans une semaine</SelectItem>
                  </SelectContent>
                </Select>
                <div className="rounded-md border">
                  <Calendar
                    selectedDate={date}
                    onChange={setDate}
                    className="w-fit top-10 left-0"
                  />
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-full space-y-2">
            <Label>Montant Total</Label>
            <div className="flex items-baseline space-x-2">
              <Input
                name="montant_total"
                type="number"
                value={price}
                min={500}
                max={wallet?.[selectedWallet]?.solde}
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />{" "}
            </div>
          </div>
        </div>
        <div className="flex gap-6 flex-col lg:flex-row">
          <div className="w-full space-y-2">
            <Label>Type</Label>
            <Select
              name="type_trans"
              onValueChange={onTypeInvoiceChange}
              defaultValue={typeInvoice}
            >
              <SelectTrigger>
                <SelectValue placeholder="Type facture" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="depense">Depense</SelectItem>
                <SelectItem value="entree">Entree</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full space-y-2">
            <Label>Status</Label>
            <Select
              name="status"
              onValueChange={onStatusInvoiceChange}
              defaultValue={statusInvoice}
            >
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annulee">Annulee</SelectItem>
                <SelectItem value="payee">Payee</SelectItem>
                <SelectItem value="en_cours">En cours</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="w-full">
          <Button
            type="submit"
            className="w-full bg-atomicTangerine hover:bg-atomicTangerine/80"
          >
            {" "}
            Enregistrer{" "}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default InvoicesForm;
