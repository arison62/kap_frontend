import { useRef, useState, useEffect, ChangeEvent } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/input";
import { PenLine } from "lucide-react";
import { useUserLoader } from "../../fetcher/useUserLoader";
import { useToast } from "../../components/use-toast";
import myFetch from "../../lib/myFect";
import { useUser } from "../../hooks/UserContext";

const Settings = () => {
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { data, dispatch, isLoading } = useUserLoader();
  const { toast } = useToast();
  const { user } = useUser();

  const onSubmit = () => {
    if (formRef.current) {
      const data = new FormData(formRef.current);
      if (isEditable) {
        
        if (data.get("password") == data.get("passwordConfirm")) {
          myFetch("user/update", {
            method: "POST",
            data,
            token: user?.token as string,
          })
            .then(async (res) => {
              if (res.ok) {
                toast({
                  title: "Success",
                  description: "Modification reussie",
                  variant: "success",
                });
              }else{
                const data = await res.json();
                toast({
                  title: "Error",
                  description: data.message,
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

          setIsEditable(false);
        } else {
          toast({
            title: "Error",
            description: "Confirmation du mot de passe a echouee",
            variant: "destructive",
          });
        }
      }
    }
  };

  function onFieldChange({
    event,
    fieldName,
  }: {
    event: ChangeEvent<HTMLInputElement>;
    fieldName:
      | "name"
      | "firstName"
      | "adresse"
      | "phone"
      | "email"
      | "password";
  }) {
    dispatch({ type: fieldName, payload: event.target.value });
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditable]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    setIsEditable(!isEditable);
    onSubmit();
  };

  return (
    <div className="pt-8">
      <div className="flex flex-col space-y-2 text-licorice lg:w-full lg:max-w-2xl">
        <h3 className="text-2xl font-bold">Information du compte</h3>
        <p className="text-slate-500">Mettre a jour les information du compte</p>
        <div>
          <div className="flex mt-12 justify-between">
            <h4 className="text-xl font-bold">Informations personnelles</h4>
            <PenLine onClick={handleEditClick} />
          </div>

          <form ref={formRef} className="mt-12 flex flex-col gap-6">
            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="w-full">
                <Label>Prenom</Label>
                <Input
                  ref={inputRef}
                  name="firstName"
                  value={data.firstName}
                  onChange={(e) =>
                    onFieldChange({ event: e, fieldName: "firstName" })
                  }
                  disabled={!isEditable}
                />
              </div>

              <div className="w-full">
                <Label>Nom</Label>
                <Input
                  name="name"
                  value={data.name}
                  onChange={(e) =>
                    onFieldChange({ event: e, fieldName: "name" })
                  }
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="w-full">
                <Label>Adresse</Label>
                <Input
                  type="text"
                  name="address"
                  value={data.adresse}
                  onChange={(e) =>
                    onFieldChange({ event: e, fieldName: "adresse" })
                  }
                  disabled={!isEditable}
                />
              </div>

              <div className="w-full">
                <Label>Telephone</Label>
                <Input
                  name="phone"
                  type="text"
                  value={data.phone}
                  onChange={(e) =>
                    onFieldChange({ event: e, fieldName: "phone" })
                  }
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className="w-full">
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                value={data.email}
                onChange={(e) =>
                  onFieldChange({ event: e, fieldName: "email" })
                }
                disabled={!isEditable}
              />
            </div>
            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="w-full">
                <Label>Mot de passe</Label>
                <Input
                  type="password"
                  name="password"
                  onChange={(e) =>
                    onFieldChange({ event: e, fieldName: "password" })
                  }
                  disabled={!isEditable}
                />
              </div>

              <div className="w-full">
                <Label>Confirmer mot de passe</Label>
                <Input
                  name="passwordConfirm"
                  type="password"
                  disabled={!isEditable}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
