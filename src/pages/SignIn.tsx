import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import BannerImg from "../assets/banner.png";
import pathAsset from "../assets/Vector 1.svg";
import logoImg from "../assets/logo_sm.png";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../components/use-toast";
import { useUser } from "../hooks/UserContext";
import { SERVER_URL } from "../lib/constants";

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const { toast } = useToast();
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    Object.entries(data).forEach((value) => {
      formData.append(value[0], value[1]);
    });

    fetch(`${SERVER_URL}/user/auth/signin`, {
      method: "POST",
      body: formData,
    }).then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        updateUser(data.data);
        toast({
          description: "Connexion reussie",
          title: "Success",
          variant: "success",
        });

        navigate("/");
      } else {
        const data = await res.json();

        toast({
          description: data.message,
          title: "Error",
          variant: "destructive",
        });
      }
    });
  };
  return (
    <div className="grid md:grid-cols-2 h-screen">
      <div className="mt-12 mx-auto flex flex-col px-5 sm:px-0">
        <div className="flex items-baseline">
          <img src={logoImg} alt="logo img" width={32} />
          <h1
            className="text-2xl font-montserrat 
                font-semibold text-licorice"
          >
            Kap
          </h1>
        </div>
        <div className=" flex flex-col h-full justify-center mb-12">
          <h3 className="text-3xl font-semibold text-licorice">Se connecter</h3>
          <p className="text-licorice/45">
            Bienvenue, s'il vous plait entrer vous informations
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-8"
          >
            <div>
              <Label htmlFor="email" className="text-licorice font-bold">
                Email
              </Label>
              <Input
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
              />
              {errors.email && (
                <p className="text-destructive">Veuillez entrer votre email</p>
              )}
            </div>
            <div>
              <Label htmlFor="password" className="text-licorice font-bold">
                Mot de passe
              </Label>
              <Input
                type="password"
                {...register("password", {
                  required: "Veuillez entrer votre mot de passe",
                  minLength: {
                    message:
                      "Votre mot de passe doit avoir minimum 7 caractères",
                    value: 7,
                  },
                })}
              />
              {errors.password && (
                <p className="text-destructive text-sm">{`${errors.password.message}`}</p>
              )}
            </div>
            <Button
              type="submit"
              className="bg-atomicTangerine 
                  font-semibold text-licorice
                   hover:bg-atomicTangerine/80"
              disabled={isSubmitting}
            >
              Se connecter
            </Button>
            <p className="text-licorice/60 text-center mt-8 relative">
              Vous n'avez pas un compte ?{" "}
              <Link to="/signup" className="font-semibold">
                Creer un compte
                <img
                  src={pathAsset}
                  alt=""
                  width={64}
                  aria-hidden="true"
                  className="absolute right-0 -translate-x-12"
                />
              </Link>
            </p>
          </form>
        </div>
      </div>
      <div className="bg-atomicTangerine/20 h-full max-md:hidden">
        <div className="flex justify-center items-center h-full">
          <img src={BannerImg} alt="" className="max-w-3xl w-full" />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
