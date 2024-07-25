import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/lib/components/ui/table";
import { useEffect, useState } from "react";
import AdminService from "@/services/AdminService";
import statusMapEnum from "@/enums/statusMapEnum";
import ticketTypeMapEnum from "@/enums/ticketTypeMapEnum";
import { formatCurrency, formatDate, sortTableContentByDateField } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { Label } from "@/lib/components/ui/label";
import { Button } from "@/lib/components/ui/button";
import arrow from "@/assets/arrow_down.png";

export default function TicketList() {
  const [tableContent, setTableContent] = useState([]);

  const [selectedStatus, setSelectedStatus] = useState(null)

  const [selectedType, setSelectedType] = useState(null)

  const [sortOrder, setSortOrder] = useState('desc');
  const [isRotated, setIsRotated] = useState(false);

  const handleSelectedStatus = (value) => {
    setSelectedStatus(value);
  };

  const handleSelectedType = (value) => {
    setSelectedType(value);
  };

  const handleSortButtonClick = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setIsRotated(!isRotated)
    setSortOrder(newOrder);
    const sortedContent = sortTableContentByDateField(tableContent, newOrder, "purchaseDate");
    setTableContent(sortedContent);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const query = mountQuery()
        const response = await AdminService.listTickets(query);
        console.log(response)
        setTableContent(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [selectedStatus, selectedType]);


  const mountQuery = () => {
    var query = ``
    if (selectedStatus !== null && selectedStatus !== "TODOS") {
      query += `statusTicket=${selectedStatus}&`
    }

    if (selectedType !== null && selectedType !== "TODOS") {
      query += `typeTicket=${selectedType}`
    }

    return query
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      
      <div>
      <div className="flex gap-4 justify-between">
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

          <div>
                <Label>Tipo</Label>
                <Select onValueChange={handleSelectedType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Selecionar" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value={"TODOS"}>Todos</SelectItem>
                    <SelectItem value={"LUNCH"}>Almoco</SelectItem>

                    <SelectItem value={"STUDENT_LUNCH_TICKET"}>Almoço - Estudante</SelectItem>
                    <SelectItem value={"STUDENT_DINNER_TICKET"}>Jantar  - Estudante </SelectItem>

                    <SelectItem value={"EXTERNAL_DINNER_TICKET"}>Jantar - Externo </SelectItem>
                    <SelectItem value={"EXTERNAL_LUNCH_TICKET"}>Almoço - Externo </SelectItem>

                    <SelectItem value={"SCHOLARSHIP_LUNCH_TICKET"}>Almoço - Bolsista </SelectItem>
                    <SelectItem value={"SCHOLARSHIP_DINNER_TICKET"}>Jantar - Bolsista </SelectItem>

                  </SelectContent>
                </Select>
          </div>

          {/* <div>
            <Button
              className="mt-6"
              onClick={console.log()}
            >
              Filtrar
            </Button>
          </div> */}
        </div>
       </div>
      </div>
      <div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="flex gap-4 cursor-pointer" onClick={handleSortButtonClick}>
                    <p> Data da compra  </p>
                    <img 
                    src={arrow} 
                    height="20px" 
                    width="20px" 
                    alt="" 
                    className={`transition-transform duration-300 ${isRotated ? 'rotate-180' : 'rotate-0'}`} />

                    

                  </div>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tableContent.map((ticket) => (
              <TableRow key={ticket.id} className="bg-accent">
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{formatCurrency(ticket.price)}</TableCell>
                <TableCell>{ticketTypeMapEnum[ticket.typeTicket]}</TableCell>
                <TableCell>{statusMapEnum[ticket.statusTicket]}</TableCell>
                <TableCell>{formatDate(ticket.purchaseDate)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
