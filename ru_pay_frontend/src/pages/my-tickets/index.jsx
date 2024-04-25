import { AuthContext } from "@/contexts/AuthContext";
import { Badge } from "@/lib/components/ui/badge";
import { Button } from "@/lib/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import UserService from "@/services/UserService";
import { useContext, useEffect, useState } from "react";
import QRCodeDialog from "./components/QRCodeDialog";
import { DrawerTrigger } from "@/lib/components/ui/drawer";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const response = await UserService.getTickets(user.id);

      setTickets(response);
    })();
  }, [user.id]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Meus Tickets</h1>
      </div>
      <div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Preço</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow className="hover:bg-accent">
                <TableCell>{ticket.typeTicket}</TableCell>
                <TableCell>
                  <Badge
                    className="text-xs"
                    variant={
                      ticket.statusTicket === "ACTIVE" ? "default" : "outline"
                    }
                  >
                    {ticket.statusTicket}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {formatCurrency(ticket.price)}
                </TableCell>
                <TableCell className="text-right">
                  <QRCodeDialog
                    trigger={<Button>Gerar QRCode</Button>}
                    data={ticket.id}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
