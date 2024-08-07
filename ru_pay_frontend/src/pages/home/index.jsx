import moon from "@/assets/moon.jpg";
import sun from "@/assets/sun.jpg";
import { AuthContext } from "@/contexts/AuthContext";
import PaymentService from "@/services/PaymentService";
import { useContext, useEffect, useState } from "react";
import PaymentNextSteps from "./components/PaymentNextSteps";
import UserService from "@/services/UserService";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [payment, setPayment] = useState(null);
  const [availableTickets, setAvailableTickets] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await UserService.getAvailableTickets(user.id);

      setAvailableTickets(result);
    })();
  }, [user.id]);

  async function buyTicket(type) {
    const response = await PaymentService.makePayment({
      userId: user.id,
      ticketType: type,
    });

    setPayment(response.urlPayment);
  }

  function getUserType(userType) {
    return {
      STUDENT: "STUDENT",
      SCHOLARSHIP_STUDENT: "SCHOLARSHIP",
      EXTERNAL: "EXTERNAL",
    }[userType];
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Home</h1>
      </div>
      <div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm p-6">
        {payment ? (
          <PaymentNextSteps
            paymentUrl={payment}
            onContinue={() => setPayment(null)}
          />
        ) : (
          <div className="flex flex-col gap-12 text-center pt-12">
            <h3 className="text-2xl font-bold tracking-tight">
              Escolha sua refeição
            </h3>
            <div className="grid grid-cols-2 md:gap-10 sm:gap-10 gap-5">
              {availableTickets?.lunch === 1 ? (
                <button
                  className="flex flex-row gap-4 p-5 rounded-lg transition-all border items-center hover:bg-muted"
                  onClick={() =>
                    buyTicket(`${getUserType(user.typeUser)}_LUNCH_TICKET`)
                  }
                >
                  <img
                    alt="Almoço"
                    className="aspect-square w-20 rounded-md object-cover"
                    height="84"
                    src={sun}
                    width="84"
                  />
                  <h4 className="text-2xl font-bold tracking-tight">
                    Almoço - Meia
                  </h4>
                </button>
              ) : null}
              {availableTickets?.dinner === 1 ? (
                <button
                  className="flex flex-row gap-4 p-5 rounded-lg transition-all border items-center hover:bg-muted"
                  onClick={() =>
                    buyTicket(`${getUserType(user.typeUser)}_DINNER_TICKET`)
                  }
                >
                  <img
                    alt="Jantar"
                    className="aspect-square w-20 rounded-md object-cover"
                    height="84"
                    src={moon}
                    width="84"
                  />
                  <h4 className="text-2xl font-bold tracking-tight">
                    Jantar - Meia
                  </h4>
                </button>
              ) : null}
            </div>
            <div className="grid grid-cols-2 md:gap-10 sm:gap-10 gap-5">
              <button
                className="flex flex-row gap-4 p-5 rounded-lg transition-all border items-center hover:bg-muted"
                onClick={() =>
                  buyTicket(`${getUserType("EXTERNAL")}_LUNCH_TICKET`)
                }
              >
                <img
                  alt="Almoço"
                  className="aspect-square w-20 rounded-md object-cover"
                  height="84"
                  src={sun}
                  width="84"
                />
                <h4 className="text-2xl font-bold tracking-tight">
                  Almoço - Inteira
                </h4>
              </button>
              <button
                className="flex flex-row gap-4 p-5 rounded-lg transition-all border items-center hover:bg-muted"
                onClick={() =>
                  buyTicket(`${getUserType("EXTERNAL")}_DINNER_TICKET`)
                }
              >
                <img
                  alt="Jantar"
                  className="aspect-square w-20 rounded-md object-cover"
                  height="84"
                  src={moon}
                  width="84"
                />
                <h4 className="text-2xl font-bold tracking-tight">
                  Jantar - Inteira
                </h4>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
