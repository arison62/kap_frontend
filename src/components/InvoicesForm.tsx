import { ChangeEvent, useEffect, useRef, useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { useUser } from "../hooks/UserContext";

import myFetch from "../lib/myFect";
import { CalendarIcon } from "lucide-react";
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

const customersData = [
  {
    name: "customer",
    email: "customer@email.com",
    address: "customer address",
    telephone: "666666666",
  },
  {
    name: "customer2",
    email: "customer2@email.com",
    address: "customer2 address",
    telephone: "666666666",
  },
  {
    name: "customer3",
    email: "customer3@email.com",
    address: "customer3 address",
    telephone: "666666666",
  },
  {
    name: "customer4",
    email: "customer4@email.com",
    address: "customer4 address",
    telephone: "666666666",
  },
  {
    name: "customer5",
    email: "customer5@email.com",
    address: "customer5 address",
    telephone: "666666666",
  },
  {
    name: "customer6",
    email: "customer6@email.com",
    address: "customer6 address",
    telephone: "666666666",
  },
  {
    name: "customer7",
    email: "customer7@email.com",
    address: "customer7 address",
    telephone: "666666666",
  },
  {
    name: "customer8",
    email: "customer7@email.com",
    address: "customer7 address",
    telephone: "666666666",
  },
  {
    name: "customer9",
    email: "customer7@email.com",
    address: "customer7 address",
    telephone: "666666666",
  },
  {
    name: "customer10",
    email: "customer7@email.com",
    address: "customer7 address",
    telephone: "666666666",
  },
  {
    name: "customer11",
    email: "customer7@email.com",
    address: "customer7 address",
    telephone: "666666666",
  },
];

type CustomerType = {
  nom: string;
  adresse: string;
  telephone: string;
  email: string;
  id: number

}

const InvoicesForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [customer, setCustomer] = useState<CustomerType[]>();

  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false)

  const [selectedCustomer, setSelectedCustomer] = useState(0);
  const { user } = useUser();
  const [date, setDate] = useState<Date>(new Date());
  const [price, setPrice] = useState(0);
  const [typeInvoice, setTypeInvoice] = useState("depense");
  const [statusInvoice, setStatusInvoice] = useState("en_cours");

  const onTypeInvoiceChange = (value: string) => {
    setTypeInvoice(value);
  };

  const onStatusInvoiceChange = (value: string) => {
    setStatusInvoice(value);
  };

    useEffect(() => {
      const fetchData = () => {
        myFetch("customer/get", {
          method: "GET",
          data: new FormData(),
          token: user?.token as string,
        }).then(async (res) => {
          if (res.ok) {
            const value = await res.json();
            console.log(value);
            setCustomer(value.data);
          }
        });
      };

      fetchData();
    }, [user?.token]);
  return (
    <div>
      <form ref={formRef} className="mt-8 flex flex-col gap-6 max-w-xl">
        <div>
          {customer && 
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
          /> }
        </div>
        {customer &&
        <Select onValueChange={(value) => setSelectedCustomer(Number(value))}>
          <SelectTrigger>
            <SelectValue placeholder="Choisir un client" />
          </SelectTrigger>
          <SelectContent>
            {customer.map((data, idx) => (
              <SelectItem key={data.nom + idx} value={idx.toString()}>
                {data.nom}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> }
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
                onChange={(e) => setPrice(parseInt(e.target.value))}
              />{" "}
            </div>
          </div>
        </div>
        <div className="flex gap-6 flex-col lg:flex-row">
          <div className="w-full space-y-2">
            <Label>Type</Label>
            <Select
              name="type"
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
        <div className="flex gap-6 flex-col lg:flex-row">
          <div className="w-full"></div>
        </div>
      </form>
    </div>
  );
};

export default InvoicesForm;
