import { Button } from "@/lib/components/ui/button";
import React from "react";

export default function PaymentNextSteps({ paymentUrl }) {
  return (
    <div className="flex flex-col gap-12 text-center pt-12">
      <h3 className="text-2xl font-bold tracking-tight">
        Ticket reservado - Aguardando pagamento
      </h3>
      <div className="w-1/2 mx-auto">
        <p className="leading-7">
          Clique no botão abaixo e realize o pagamento do seu ticket na nova
          guia que irá abrir. Após isso, navegue até a página de{" "}
          <a className="text-primary font-bold" href="/my-tickets">
            Meus Tickets
          </a>{" "}
          e gere o QRCode do seu ticket caso o pagamento já esteja aprovado.
        </p>
        <Button
          className="mt-8"
          onClick={() => window.open(paymentUrl, "_blank")}
        >
          Realizar pagamento
        </Button>
        <p className="mt-8 underline">
          <a className="text-primary font-bold" href="/my-tickets">
            Ir para Meus Tickets
          </a>
        </p>
      </div>
    </div>
  );
}
