import { Link } from "react-router-dom";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import BannerImg from "../assets/banner.png";
import pathAsset from "../assets/Vector 1.svg";
import logoImg from "../assets/logo_sm.png";
import { Label } from "../components/label";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { SERVER_URL } from "../lib/constants";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log(SERVER_URL);
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
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
          <h3 className="text-3xl font-semibold text-licorice">
            Creer un compte
          </h3>
          <p className="text-licorice/45">
            Bienvenue, s'il vous plait entrer vous informations
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 mt-8"
            onChange={() => console.log(errors)}
          >
            <div>
              <Label htmlFor="email" className="text-licorice font-bold">
                Nom
              </Label>
              <Input
                type="text"
                {...register("name", { required: "Veuillez entrer votre nom" })}
              />
              {errors.name?.message && (
                <p className="text-destructive text-sm">{`${errors.name.message}`}</p>
              )}
            </div>
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
              Creer un compte
            </Button>
            <p className="text-licorice/60 text-center mt-8 relative">
              Vous avez deja un compte ?{" "}
              <Link to="/signin" className="font-semibold">
                Se connecter
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

export default SignUp;
