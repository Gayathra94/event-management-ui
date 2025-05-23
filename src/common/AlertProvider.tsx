import { Alert, Snackbar, type AlertColor } from "@mui/material";
import { createContext, use, useContext, useState, type ReactNode } from "react";

type AlertContextType = {
    showAlert: (message: string, severity?: AlertColor) => void;
}
const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useGlobalAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("error alert context");
  }
  return context;
};

export default function AlertProvider({ children }: { children: ReactNode }) {

    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("")
    const [severity, setSeverity] = useState<AlertColor>("info")

    const showAlert = (msg: string, sev: AlertColor = "info") => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity} variant="filled" >
                    {message}
                </Alert>
            </Snackbar>

        </AlertContext.Provider>
    );

}