import { useEffect, useState } from "react";
import UserTypeEnum from "@/enums/userTypeEnum";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Label } from "@/lib/components/ui/label";
import { Input } from "@/lib/components/ui/input";
import { Button } from "@/lib/components/ui/button";
import { useToast } from "@/lib/components/ui/use-toast";
import { Toaster } from "@/lib/components/ui/toaster";
import AuthenticationService from "@/services/AuthenticationService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/lib/components/ui/select";
import { useNavigate } from "react-router-dom";

export default function RegisterForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    registration: "",
    cpf: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  const [selectedValue, setSelectedValue] = useState(null);
  // const [error, setError] = useState({hasError: false, errorMessage: ""})
  const { toast } = useToast();

  const handleValueChange = (value) => {
    setSelectedValue(value);
  };

  const handleConfirm = async () => {
    try {
      const payload = {
        ...formData,
        typeUser: selectedValue,
      };
      const response = await AuthenticationService.registerUser(payload);
      showErrorMessage("success", "Cadastro realizado com sucesso!");
      redirecTo("/login");
    } catch (error) {
      showErrorMessage(
        "error",
        "Ocorreu um erro ao tentar realizar seu cadastro!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      handleConfirm();
    }, 2000);
  };

  const redirecTo = (url) => {
    if (!isLoading) {
      navigate(url);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const showErrorMessage = (variant, message) => {
    toast({
      variant: variant,
      description: message,
    });
  };

  // const validatePassword = () => {
  //   let errorMessage = "";
  //   let hasError = false;
  //   let password = formData.password
  //   let passwordConfirm = formData.passwordConfirm

  //   const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  //   if (password !== passwordConfirm) {
  //       errorMessage = "As senhas não coincidem.";
  //       hasError = true
  //   }
  //   else if (password.length < 8) {
  //       errorMessage = "A senha deve conter pelo menos 8 caracteres.";
  //       hasError = true
  //   }
  //   else if (!re.test(password)) {
  //       errorMessage = "A senha deve conter pelo menos um número, uma letra maiúscula, uma letra minúscula e um caractere especial.";
  //       hasError = true
  //   }
  //   setError({hasError: hasError, errorMessage: errorMessage})
  // }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="fullname">Nome Completo</Label>
            <Input
              id="name"
              placeholder="Fulano de Tal"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="nome@exemplo.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              placeholder="**********"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password_confirm">Confirme sua senha</Label>
            <Input
              id="passwordConfirm"
              placeholder="**********"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              value={formData.passwordConfirm}
              onChange={handleChange}
            />
          </div>
          {/* { error.hasError && 
              <Alert variant="">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>{error.errorMessage}</AlertTitle>
              </Alert>
          } */}
          <div>
            <Label htmlFor="password_confirm">Tipo de Usuário</Label>
            <Select onValueChange={handleValueChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecionar" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value={UserTypeEnum.EXTERNAL}>Externo</SelectItem>
                <SelectItem value={UserTypeEnum.STUDENT}>Estudante</SelectItem>
                <SelectItem value={UserTypeEnum.SCHOLARSHIP_STUDENT}>
                  Estudante Bolsista
                </SelectItem>
                {/* <SelectItem value={UserTypeEnum.ADMIN}>Admin</SelectItem> */}
              </SelectContent>
            </Select>
          </div>
          {[UserTypeEnum.STUDENT, UserTypeEnum.SCHOLARSHIP_STUDENT].includes(
            selectedValue,
          ) ? (
            <div className="grid gap-1">
              <Label htmlFor="matricula">Matrícula</Label>
              <Input
                id="registration"
                placeholder="000000000"
                type="text"
                autoCapitalize="none"
                autoComplete="matricula"
                autoCorrect="off"
                disabled={isLoading}
                value={formData.matricula}
                onChange={handleChange}
              />
            </div>
          ) : null}
          <Button disabled={isLoading} onClick={onSubmit}>
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Cadastrar
          </Button>
          <Toaster />
        </div>
      </form>
    </div>
  );
}
