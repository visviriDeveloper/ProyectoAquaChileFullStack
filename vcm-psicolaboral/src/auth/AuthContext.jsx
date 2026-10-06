import { useCallback, useState } from "react";
import * as auth from "../services/authService";
import { AuthContext } from "./context";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => auth.sesionActual());

  const entrar = useCallback(async (email, password) => {
    const u = await auth.login(email, password);
    setUsuario(u);
    return u;
  }, []);

  const salir = useCallback(() => {
    auth.logout();
    setUsuario(null);
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, entrar, salir }}>
      {children}
    </AuthContext.Provider>
  );
}
