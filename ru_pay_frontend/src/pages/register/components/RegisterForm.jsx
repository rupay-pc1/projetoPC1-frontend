import { useState } from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Label } from "@/lib/components/ui/label";
import { Input } from "@/lib/components/ui/input";
import { Button } from "@/lib/components/ui/button";

export default function RegisterForm({ className, ...props }) {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label htmlFor="fullname">Nome Completo</Label>
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
            <Label htmlFor="matricula">Matrícula</Label>
            <Input
              id="matricula"
              placeholder="000000000"
              type="text"
              autoCapitalize="none"
              autoComplete="matricula"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="cpf">CPF</Label>
            <Input
              id="cpf"
              placeholder="000.000.000-00"
              type="text"
              autoCapitalize="none"
              autoComplete="cpf"
              autoCorrect="off"
              disabled={isLoading}
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
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password_confirm">Confirme sua senha</Label>
            <Input
              id="password_confirm"
              placeholder="**********"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Cadastrar
          </Button>
        </div>
      </form>
    </div>
  );
}
