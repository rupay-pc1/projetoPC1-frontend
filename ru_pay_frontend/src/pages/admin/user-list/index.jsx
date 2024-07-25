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
} from "@/lib/components/ui/alert-dialog";
import UserTypeMapEnum from "@/enums/userTypeMapEnum";
import { Input } from "@/lib/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { Label } from "@/lib/components/ui/label";
import UserTypeEnum from "@/enums/userTypeEnum";
import { Button } from "@/lib/components/ui/button";

import { formatDate, sortTableContentByDateField } from "@/lib/utils";

import arrow from "@/assets/arrow_down.png";


export default function UserList() {
  const [tableContent, setTableContent] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedValue, setSelectedValue] = useState(null);
  const [registration, setRegistration] = useState(null);

  const [buttonClicked, setButtonClicked] = useState(false);

  const [sortOrder, setSortOrder] = useState('desc');
  const [isRotated, setIsRotated] = useState(false);

  const handleSortButtonClick = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setIsRotated(!isRotated)
    setSortOrder(newOrder);
    const sortedContent = sortTableContentByDateField(tableContent, newOrder, "created_at");
    setTableContent(sortedContent);
  };

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const handleRegistrationChange = (event) => {
    setRegistration(event.target.value);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const query = mountQuery()
        const response = await AdminService.listUsers(query);
        setTableContent(normalizeTableContent(response));
      } catch (error) {
        console.log(error);
      }
    }
  
    fetchData();
  }, [buttonClicked, selectedValue]);
  
  const mountQuery = () => {
    var query = ``
    console.log(selectedValue)
    if (selectedValue !== null && selectedValue !== "TODOS") {
      query += `typeUser=${selectedValue}&`
    }
    console.log(registration)
    if (registration !== null && registration !== "") {
      query += `registration=${registration}`
    }

    return query
  }

  const getRandomIndex = (max) => Math.floor(Math.random() * max);

  const normalizeTableContent = (users) => {
    if (users.length == 0) {
      return [];
    }
    const days = ["24", "18","07"]

    const res = users.map((client) => {
      const randomDay = days[getRandomIndex(days.length)];
      console.log(randomDay)
      const date = formatDate(`2024-06-${randomDay}T23:31:03.372851`)
      console.log(date)
      return {
        id: client.id,
        name: client.name,
        email: client.email,
        type: client.typeUser,
        registration: client.registration,
        created_at: date,
      };
    });
    return res
  };

  const handleClick = async (clientId) => {
    console.log(clientId);
    const res = await AdminService.getUserById(clientId);
    setModalOpen(true);
    console.log(res);
  };

  const handleButtonClick = () => {
    setButtonClicked(prev => !prev);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between gap-2">
       <div className="flex flex-col gap-2">
        <h1 className="text-lg font-semibold md:text-2xl">
            Listagem de Usuários
          </h1>
          <h2> Para deletar um usuário, clique sobre ele. </h2>
       </div>

       <div className="flex gap-4">
        <div>
              <Label>Tipo de Usuário</Label>
              <Select onValueChange={handleValueChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecionar" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={"TODOS"}>Todos</SelectItem>
                  <SelectItem value={UserTypeEnum.EXTERNAL}>Externo</SelectItem>
                  <SelectItem value={UserTypeEnum.STUDENT}>Estudante</SelectItem>
                  <SelectItem value={UserTypeEnum.SCHOLARSHIP_STUDENT}>
                    Estudante Bolsista
                  </SelectItem>
                </SelectContent>
              </Select>
        </div>
              
        <div>
              <Label htmlFor="matricula">Matrícula</Label>
              <Input
                id="registration"
                placeholder="000000000"
                type="text"
                autoCapitalize="none"
                autoComplete="matricula"
                autoCorrect="off"
                value={registration}
                onChange={handleRegistrationChange}
              />
        </div>
        <div>
          <Button
            className="mt-6"
            onClick={handleButtonClick}
          >
            Filtrar
          </Button>
        </div>

       </div>
      </div>
      <div className="flex flex-1 justify-center rounded-lg border border-dashed shadow-sm p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuário</TableHead>
              <TableHead className="hidden sm:table-cell">Tipo</TableHead>
              <TableHead className="hidden md:table-cell">
                <div className="flex gap-4 cursor-pointer" onClick={handleSortButtonClick}>
                  <p> Data de criação </p>
                  <img 
                  src={arrow} 
                  height="20px" 
                  width="20px" 
                  alt="" 
                  className={`transition-transform duration-300 ${isRotated ? 'rotate-180' : 'rotate-0'}`} />

                  

                </div>
                </TableHead>
              <TableHead className="text-right">Matrícula</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {tableContent.map((client) => (
              <TableRow
                key={client.id}
                className="bg-accent cursor-pointer"
                onClick={() => handleClick(client.id)}
              >
                <TableCell>
                  <div className="font-medium">{client.name}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {client.email}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {UserTypeMapEnum[client.type]}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {client.created_at}
                </TableCell>
                <TableCell className="text-right">
                  {client.registration}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <AlertDialog open={modalOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Você deseja deletar esse usuário ?{" "}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação é permanente e não poderá ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel onClick={() => setModalOpen(false)}>
                  {" "}
                  Cancelar{" "}
                </AlertDialogCancel>
                <AlertDialogAction onClick={() => setModalOpen(false)}>
                  Confirmar Exclusão
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </Table>
      </div>
    </main>
  );
}
