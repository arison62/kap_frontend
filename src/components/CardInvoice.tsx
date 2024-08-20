// import { QRCode } from "react-qrcode-logo";
import { Card, CardContent, CardDescription, CardHeader } from "./card";
import { format } from "date-fns";
import { User } from "lucide-react";

type UserDataType = {
  name: string;
  email: string;
  address: string;
  telephone: string;
};

type InvoiceType = {
  price: number;
  date: Date;
  date_echeance: Date;
  type: string;
  status: string;
};
const CardInvoice = ({
  userData,
  invoiceData,
}: {
  userData: UserDataType;
  invoiceData: InvoiceType;
}) => {
  //const qrCodeValue = `${invoiceData.price} ${invoiceData.date} ${invoiceData.date_echeance} ${userData.name} ${userData.email} ${userData.address} ${userData.telephone}`;
  return (
    <Card>
      <CardHeader>
        <CardDescription className="flex items-center gap-2">
          <div
            className="border w-fit p-4 rounded-full
                bg-atomicTangerine/10"
          >
            <User size={32} strokeWidth={0.5} fill="black" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-licorice text-xl">
              {userData.name}
            </span>
            <span>{userData.email} </span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <span className="text-slate-500">{userData.telephone}</span>
        <span className="text-slate-500">{userData.address}</span>
        <div className="flex flex-col mt-5 space-y-2">
          <div>
            <span className="text-slate-500">Date : </span>
            <span className="font-semibold">
              {format(invoiceData.date, "PPP")}
            </span>
          </div>
          <div>
            <span className="text-slate-500">Date echeance : </span>
            <span className="font-semibold">
              {format(invoiceData.date_echeance, "PPP")}
            </span>
          </div>
          <div>
            <span className="text-slate-500">Montant total : </span>
            <span className="font-semibold">
              {new Intl.NumberFormat("fr-FR").format(invoiceData.price)}{" "}
              <span>FCFA</span>
            </span>
          </div>

          <div>
            <span className="text-slate-500">Type :</span>
            <span className="font-semibold"> {invoiceData.type}</span>
          </div>
          <div className={`group ${invoiceData.status} space-x-1`}>
            <span className="text-slate-500"> Status :</span>
            <span
              className="font-medium px-2 py-1 rounded-full
                group-[.annulee]:bg-red-300 
                bg-atomicTangerine/10
                group-[.payee]:bg-green-400"
            >
              {" "}
              {invoiceData.status}
            </span>
          </div>
        </div>
        {/* <div className="mt-4 border-2">
          <QRCode
            value={qrCodeValue}
            style={{ height: 300, width: 300 }}
            logoPaddingStyle="circle"
            qrStyle="squares"
            quietZone={20}
          />
        </div> */}
      </CardContent>
    </Card>
  );
};

export default CardInvoice;
