import { useRef, useState, useEffect, ChangeEvent } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "../../components/input";
import { PenLine } from "lucide-react";
import { useUserLoader } from "../../fetcher/useUserLoader";

const Settings = () => {
  const [isEditable, setIsEditable] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { data, dispatch, isLoading } = useUserLoader();

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

  const handleEditClick = () => setIsEditable(!isEditable);

  return (
    <div className="pt-12">
      <div className="flex flex-col space-y-2 text-licorice lg:w-full lg:max-w-2xl">
        <h3 className="text-2xl font-bold">Account Information</h3>
        <p className="text-slate-500">Update your account information</p>
        <div>
          <div className="flex mt-12 justify-between">
            <h4 className="text-xl font-bold">Personal Information</h4>
            <PenLine onClick={handleEditClick} />
          </div>

          <form className="mt-12 flex flex-col gap-6">
            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="w-full">
                <Label>First Name</Label>
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
                <Label>Last Name</Label>
                <Input
                  name="lastName"
                  value={data.name}
                  onChange={(e)=>onFieldChange({event:e,fieldName:"name"})}
                  disabled={!isEditable}
                />
              </div>
            </div>
            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="w-full">
                <Label>Address</Label>
                <Input
                  type="text"
                  name="address"
                  value={data.adresse}
                  onChange={(e) =>onFieldChange({event:e,fieldName:"adresse"})}
                  disabled={!isEditable}
                />
              </div>

              <div className="w-full">
                <Label>Phone</Label>
                <Input
                  name="phone"
                  type="text"
                  value={data.phone}
                  onChange={(e) =>onFieldChange({event:e,fieldName:"phone"})}
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
                onChange={(e) =>onFieldChange({event:e,fieldName:"email"})}
                disabled={!isEditable}
              />
            </div>
            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="w-full">
                <Label>Password</Label>
                <Input
                  type="password"
                  name="password"
                
                  onChange={(e)=>onFieldChange({event : e, fieldName : 'password'})}
                  disabled={!isEditable}
                />
              </div>

              <div className="w-full">
                <Label>Confirm Password</Label>
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
