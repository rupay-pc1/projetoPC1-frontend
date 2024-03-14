import React, {useContext} from 'react'
import PrivateRoutes from "@/routes/private.routes"
import PublicRoutes from "@/routes/public.routes";
import { AuthContext } from '@/contexts/AuthContext'

function App() {
  const { auth } = useContext(AuthContext)
  console.log("auth", auth)
  return auth ? <PrivateRoutes /> : <PublicRoutes />
}

export default App;