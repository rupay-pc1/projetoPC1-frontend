import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Label } from "@/lib/components/ui/label";
import { Input } from "@/lib/components/ui/input";
import { Button } from "@/lib/components/ui/button";
import { AuthContext } from '@/contexts/AuthContext'
import { Alert, AlertDescription, AlertTitle } from "@/lib/components/ui/alert"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"


export default function LoginForm({ className, ...props }) {
  const navigate = useNavigate();
  const [form, setForm] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth, auth } = useContext(AuthContext)
  const [error, setError] = useState({hasError: false, errorMessage: ""})

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);    
    setTimeout(() => {
      setIsLoading(false);
      if (form.email == 'arthur@gmail.com' && form.password == '123') {
        setAuth(true)
        navigate("/home");
      } else {
        setError({hasError: true, errorMessage: "Email ou Senha incorretos"})
      }
      setTimeout(() => {
        setError({hasError: false, errorMessage: ""})
      }, 2000);
    }, 3000);
  }

  function handleChange(event) {
    setForm({ ...form, [event.target.id]: event.target.value })
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

          <Button disabled={isLoading} variant="outline" onClick={handleClick}>
            Criar minha conta
          </Button>

          { error.hasError && 
            
            (<div className="absolute right-4 top-4 md:right-16 md:top-8">
              <Alert variant="destructive">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertTitle>{error.errorMessage}</AlertTitle>
              </Alert>
            </div>)
          }

        </div>
      </form>
    </div>
  );
}