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



export default function UserList() {

  const [tableContent, setTableContent] = useState([])
  const [modalOpen, setModalOpen] = useState(false)

  useEffect(async () => {
    async function fetchData() {
      try {
        const response = await AdminService.listUsers();
        console.log(response)
        return response
      } catch (error) {
        console.log(error)
      }
    } 
    
    setTableContent(await fetchData());
  }, []); 

  const normalizeTableContent = () => {
    console.log(tableContent)
    if (tableContent.length == 0) {
      return []
      
    }
    console.log(tableContent)
    const res = tableContent.map((client) => {
      return {
        "id": client.id,
        "name": client.name,
        "email": client.email,
        "type": client.typeUser,
        "registration": client.registration,
        "created_at": "20-03-2023"
      }
    })

    return res
  }

    const handleClick = async (clientId) => {
      console.log(clientId)
      const res = await AdminService.getUserById(clientId)
      setModalOpen(true)
      console.log(res)
    }


  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold md:text-2xl">
          Listagem de Usuários
        </h1>
        <h2> Para deletar um usuário, clique sobre ele. </h2>
      </div>
      <div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Registration</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {normalizeTableContent().map((client) => (
              <TableRow key={client.id} className="bg-accent cursor-pointer" onClick={() => handleClick(client.id)}>
                <TableCell>
                  <div className="font-medium">{client.name}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {client.email}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{client.type}</TableCell>
                <TableCell className="hidden md:table-cell">{client.created_at}</TableCell>
                <TableCell className="text-right">{client.registration}</TableCell>
              </TableRow>
            ))}
          </TableBody>

          
          <AlertDialog open={modalOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Você deseja deletar esse usuário ? </AlertDialogTitle>
                <AlertDialogDescription>
                Esta ação é permanente e não poderá ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setModalOpen(false)}> Cancelar </AlertDialogCancel>
                <AlertDialogAction onClick={() => setModalOpen(false)}>Confirmar Exclusão</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>


        </Table>
      </div>
    </main>
  );
}
