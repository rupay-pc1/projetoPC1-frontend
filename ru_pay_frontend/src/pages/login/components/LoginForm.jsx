import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Label } from "@/lib/components/ui/label";
import { Input } from "@/lib/components/ui/input";
import { Button } from "@/lib/components/ui/button";
import { AuthContext } from "@/contexts/AuthContext";
import { Alert, AlertDescription, AlertTitle } from "@/lib/components/ui/alert";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import AuthenticationService from "@/services/AuthenticationService";
import { Toaster } from "@/lib/components/ui/toaster";
import { useToast } from "@/lib/components/ui/use-toast";
import UserService from "@/services/UserService";

export default function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth, setUser } = useContext(AuthContext);
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      handleConfirm();
    }, 2000);
  };

  const handleConfirm = async () => {
    try {
      const payload = {
        ...formData,
      };
      const response = await AuthenticationService.loginUser(payload);
      setAuth(true);

      localStorage.setItem("token", response.access_token);

      if (response.access_token) {
        const { id, email, name, registration, typeUser } =
          await UserService.getUserInfo(payload.email);

        const user = { id, email, name, registration, typeUser };

        localStorage.setItem("userInfo", JSON.stringify(user));

        setUser(user);
      }

      redirecTo("/");
    } catch {
      showErrorMessage("error", "Email ou Senha incorretos");
    } finally {
      setIsLoading(false);
    }
  };

  const showErrorMessage = (variant, message) => {
    toast({
      variant: variant,
      description: message,
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const redirecTo = (url) => {
    if (!isLoading) {
      navigate(url);
    }
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form>
        <div className="grid gap-2">
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
              onChange={handleChange}
            />
          </div>

          <Button disabled={isLoading} onClick={onSubmit}>
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>

          <Button
            disabled={isLoading}
            variant="outline"
            onClick={() => redirecTo("/register")}
          >
            Criar minha conta
          </Button>
          <Toaster />
        </div>
      </form>
    </div>
  );
}
