import React, { useContext } from "react";
import PrivateRoutes from "@/routes/private.routes";
import PublicRoutes from "@/routes/public.routes";
import AdminPrivateRoutes from "@/routes/admin/admin.private.routes";

import { AuthContext } from "@/contexts/AuthContext";

function App() {
  const { auth, adminAuth } = useContext(AuthContext);
  
  if (auth){
    return <PrivateRoutes />
  } else if (!adminAuth) {
    return <PublicRoutes />;
  } else {
    return <AdminPrivateRoutes />
  }
}

export default App;
