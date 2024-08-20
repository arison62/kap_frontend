import { ChangeEvent, useRef, useState } from "react";

import { Label } from "./label";
import { Input } from "./input";
import { Button } from "./button";
import { useUser } from "../hooks/UserContext";
import myFetch from "../lib/myFect";
import { useToast } from "./use-toast";

const CustomerForm = () => {
  const [data, setData] = useState({
    email: "",
    name: "",
    address: "",
    telphone: "",
  });

  const { user } = useUser();
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    if (formRef.current) {
      const data = new FormData(formRef.current);
      myFetch("customer/add", {
        method: "POST",
        data,
        token: user?.token as string,
      })
        .then(async (res) => {
          if (res.ok) {
            toast({
              title: "Succes",
              description: "Client ajoute",
              variant: "success",
            });
          } else {
            const value = await res.json();
            toast({
              title: "Error",
              description: value.message,
              variant: "destructive",
            });
          }
        })
        .catch((err) => {
          toast({
            title: "Error",
            description: err.message,
            variant: "destructive",
          });
        });
    }

    e.preventDefault();
  };
  const onFieldChange = ({
    event,
    fieldName,
  }: {
    event: ChangeEvent<HTMLInputElement>;
    fieldName: string;
  }) => {
    setData({ ...data, [fieldName]: event.target.value });
  };

  return (
    <div>
      <form
        ref={formRef}
        className="flex flex-col gap-6"
        onSubmit={onSubmit}
      >
        <div className="flex gap-6 flex-col lg:flex-row">
          <div className="w-full">
            <Label>Nom</Label>
            <Input
              name="name"
              value={data.name}
              onChange={(e) => onFieldChange({ event: e, fieldName: "name" })}
            />
          </div>
        </div>
        <div className="flex gap-6 flex-col lg:flex-row">
          <div className="w-full">
            <Label>Adresse</Label>
            <Input
              type="text"
              name="address"
              onChange={(e) =>
                onFieldChange({ event: e, fieldName: "address" })
              }
            />
          </div>

          <div className="w-full">
            <Label>Telephone</Label>
            <Input
              name="telephone"
              type="text"
              onChange={(e) =>
                onFieldChange({ event: e, fieldName: "telephone" })
              }
            />
          </div>
        </div>
        <div className="w-full">
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            value={data.email}
            onChange={(e) => onFieldChange({ event: e, fieldName: "email" })}
          />
        </div>
        <div className="flex gap-6 flex-col lg:flex-row">
          <Button className="bg-atomicTangerine font-semibold text-white hover:bg-atomicTangerine/80">
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomerForm;
