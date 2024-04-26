import { Badge } from "@/lib/components/ui/badge";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/lib/components/ui/alert-dialog"



export default function TicketList() {

  const [tableContent, setTableContent] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(async () => {
    async function fetchData() {
      try {
        const response = await AdminService.listTickets();
        return response
      } catch (error) {
        console.log(error)
      }
    } 
    
    setTableContent(await fetchData());
  }, []); 

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold md:text-2xl">
          Listagem de Tickets
        </h1>
        {/* <h2> Para deletar um usuário, clique sobre ele. </h2> */}
      </div>
      <div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tableContent.map((ticket) => (
              <TableRow key={ticket.id} className="bg-accent">
                <TableCell>{ticket.id}</TableCell>
                <TableCell>{ticket.price}</TableCell>
                <TableCell>{ticket.typeTicket}</TableCell>
                <TableCell>{ticket.statusTicket}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </main>
  );
}
