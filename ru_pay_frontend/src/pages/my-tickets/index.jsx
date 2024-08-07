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
import UserService from "@/services/UserService";
import { useContext, useEffect, useState } from "react";
import QRCodeDialog from "./components/QRCodeDialog";
import statusMapEnum from "@/enums/statusMapEnum";
import arrow from "@/assets/arrow_down.png";
import {
  formatCurrency,
  formatDate,
  sortTableContentByDateField,
} from "@/lib/utils";
import { Label } from "@/lib/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);

  const { user } = useContext(AuthContext);
  const [isRotated, setIsRotated] = useState(false);
  const [sortOrder, setSortOrder] = useState("desc");

  const [selectedStatus, setSelectedStatus] = useState(null);

  const handleSelectedStatus = (value) => {
    setSelectedStatus(value);
  };

  const handleSortButtonClick = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    setIsRotated(!isRotated);
    setSortOrder(newOrder);
    const sortedContent = sortTableContentByDateField(
      tickets,
      newOrder,
      "purchaseDate",
    );
    setTickets(sortedContent);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const query = mountQuery();
        const response = await UserService.getTickets(user.id, query);
        const sortedContent = sortTableContentByDateField(
          response,
          sortOrder,
          "purchaseDate",
        );
        setTickets(sortedContent);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [user.id, selectedStatus]);

  function getMealType(key) {
    if (
      [
        "STUDENT_DINNER_TICKET",
        "EXTERNAL_DINNER_TICKET",
        "SCHOLARSHIP_DINNER_TICKET",
      ].includes(key)
    ) {
      return "Jantar";
    }

    return "Almoço";
  }

  const mountQuery = () => {
    var query = ``;
    if (selectedStatus !== null && selectedStatus !== "TODOS") {
      query += `statusTicket=${selectedStatus}&`;
    }
    return query;
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-lg font-semibold md:text-2xl">
            Listagem de Tickets
          </h1>
        </div>
        <div className="flex gap-4">
          <div>
            <Label>Status</Label>
            <Select onValueChange={handleSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value={"TODOS"}>Todos</SelectItem>
                <SelectItem value={"ACTIVE"}>Ativo</SelectItem>
                <SelectItem value={"INACTIVE"}>Inativo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="text-right">
                <div
                  className="flex gap-4 cursor-pointer"
                  onClick={handleSortButtonClick}
                >
                  <p> Data da compra </p>
                  <img
                    src={arrow}
                    height="20px"
                    width="20px"
                    alt=""
                    className={`transition-transform duration-300 ${isRotated ? "rotate-180" : "rotate-0"}`}
                  />
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket) => (
              <TableRow className="hover:bg-accent">
                <TableCell>{getMealType(ticket.typeTicket)}</TableCell>
                <TableCell>
                  <Badge
                    className="text-xs"
                    variant={
                      ticket.statusTicket === "ACTIVE" ? "default" : "outline"
                    }
                  >
                    {statusMapEnum[ticket.statusTicket]}
                  </Badge>
                </TableCell>
                <TableCell>{formatCurrency(ticket.price)}</TableCell>
                <TableCell>
                  {ticket.purchaseDate
                    ? formatDate(new Date(ticket.purchaseDate))
                    : null}
                </TableCell>
                <TableCell className="text-right">
                  {ticket.statusTicket === "ACTIVE" ? (
                    <QRCodeDialog
                      trigger={<Button>Gerar QRCode</Button>}
                      data={ticket.id}
                    />
                  ) : null}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
