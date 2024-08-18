import { useState, useEffect, useReducer } from "react";
import { useUser } from "../hooks/UserContext";
import myFetch from "../lib/myFect";

export type UserDataType = {
  name: string;
  firstName: string;
  adresse: string;
  phone: string;
  email: string;
  password: string;
};

const reducer = (state: UserDataType, action: ReducerAction): UserDataType => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.payload };
    case "firstName":
      return { ...state, firstName: action.payload };
    case "adresse":
      return { ...state, adresse: action.payload };
    case "phone":
      return { ...state, phone: action.payload };
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };

    default:
      throw new Error(
        `Invalid action type: ${(action as { type: string }).type}`
      );
  }
};

export type ReducerAction =
  | { type: "name"; payload: string }
  | { type: "firstName"; payload: string }
  | { type: "adresse"; payload: string }
  | { type: "phone"; payload: string }
  | { type: "email"; payload: string }
  | { type: "password"; payload: string };

export const useUserLoader = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { user } = useUser();
  const [data, dispatch] = useReducer(reducer, {
    name: "",
    firstName: "",
    adresse: "",
    phone: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const response = await myFetch("user/get", {
          method: "GET",
          token: user?.token ?? "",
          data: new FormData(),
        });

        console.log("Data value");
        if (response.ok) {
          const userData = (await response.json())?.data;

          dispatch({ type: "name", payload: userData?.name ?? "" });
          dispatch({ type: "email", payload: userData?.email ?? "" });
          dispatch({ type: "firstName", payload: userData?.nom ?? "" });
          dispatch({ type: "adresse", payload: userData?.adresse ?? "" });
          dispatch({ type: "phone", payload: userData?.phone ?? "" });
        } else {
          const responseData = await response.json();
          setError(responseData.message);
          setLoading(false);
        }
      } catch (error) {
        setError((error as Error).message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, dispatch, error, isLoading };
};
