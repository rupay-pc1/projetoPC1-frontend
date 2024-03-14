import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Label } from "@/lib/components/ui/label";
import { Input } from "@/lib/components/ui/input";
import { Button } from "@/lib/components/ui/button";


export default function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      navigate('/home');
    }, 3000);
  }

  const handleClick = () => {
    if (!isLoading) {
      navigate('/register');
    }
  };

  return(
    <div className={cn("grid gap-6", className)} {...props}>
      <form>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="fullname">Email</Label>
            <Input
              id="fullname"
              placeholder="Fulano de Tal"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>

          <div className="grid gap-1">
            <Label htmlFor="fullname">Senha</Label>
            <Input
              id="fullname"
              placeholder="Fulano de Tal"
              type="text"
              autoCapitalize="none"
              autoComplete="name"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>

          <Button disabled={isLoading} onClick={onSubmit}>
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Entrar
          </Button>

          <Button disabled={isLoading} variant="outline" onClick={handleClick}>
            Criar minha conta
          </Button>
        </div>
      </form>
    </div>
  );
}