import React, { useContext } from "react";
import PrivateRoutes from "@/routes/private.routes";
import PublicRoutes from "@/routes/public.routes";
import AdminPrivateRoutes from "@/routes/admin/admin.private.routes";

import { AuthContext } from "@/contexts/AuthContext";

function App() {
  const { auth, user } = useContext(AuthContext);

  if (auth) {
    if (user?.typeUser === "ADMIN") {
      return <AdminPrivateRoutes />;
    }

    return <PrivateRoutes />;
  } else {
    return <PublicRoutes />;
  }
}

export default App;
