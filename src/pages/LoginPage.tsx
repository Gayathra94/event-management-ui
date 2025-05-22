import { useNavigate } from "react-router-dom";
import {Box, Button, FormControl, FormHelperText,Paper, Stack,TextField, Typography} from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import KeyIcon from '@mui/icons-material/Key';


type FormValues = {
    username: string;
    password: string;
};
type FormValuesCreateUser = {
    username: string;
};

const LoginPage = () => {

    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<FormValues>({
        defaultValues: {
            username: "",
            password: "",
        }
    });

    const [step, setStep] = React.useState<"LOGIN" | "CREATE">("LOGIN");
    const [enableCreateUser, setEnableCreateUser] = React.useState(false);


    const handleLogin = async (data: FormValues) => {
        navigate("dashboard");
    };

    const handleCreate = async (data: FormValues) => {

    }

    const handleForgetPassword = () => {
        setEnableCreateUser(true)
    }


    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >

            <Paper elevation={3} sx={{ p: 4, width: "90%", maxWidth: 400, py: "60px", px: "30px", borderRadius: "20px", opacity: 0.96, my: { md: 0, xs: 5 }, mx: { md: 0, xs: 5 }, textAlign: "center" }}>
                <Stack direction="column" alignItems="center" spacing={2} sx={{ marginBottom: '20px' }}>
                    <Typography textAlign="center" sx={{ fontWeight: 900, fontFamily: "'Poppins', 'Arial', sans-serif" }} variant="h5">
                        Welcome Back
                    </Typography>
                </Stack>

                {!enableCreateUser && (
                    <form onSubmit={handleSubmit(step === "LOGIN" ? handleLogin : handleCreate)} noValidate>
                        <Grid container spacing={3}>
                            <Grid size={12}>
                                <Typography textAlign="left" sx={{ fontWeight: "semibold", fontSize: "15px", mb: "2px", mt: "2px", color: "#2D2D2D" }}>
                                    Username{" "}<Box component="span" sx={{ color: "red" }}>*</Box>
                                </Typography>

                                <FormControl fullWidth error={!!errors.username} size="small" >
                                    <Controller name="username" defaultValue="" control={control} rules={{ required: "Username is required." }}
                                        render={({ field }) => (
                                            <TextField {...field} label="User ID" size="small"/>
                                        )}
                                    />
                                    <FormHelperText>{errors.username?.message}</FormHelperText>
                                </FormControl>
                            </Grid>

                            <Grid size={12}>
                                <Typography textAlign="left" sx={{ fontWeight: "semibold", fontSize: "15px", mb: "2px", color: "#2D2D2D" }}>
                                    Password{" "}<Box component="span" sx={{ color: "red" }}>*</Box>
                                </Typography>

                                <FormControl fullWidth error={!!errors.password} size="small" >
                                    <Controller name="password" defaultValue="" control={control} rules={{ required: "Password is required." }}
                                        render={({ field }) => (
                                            <TextField {...field} label="Password" type="password" size="small" />
                                        )}
                                    />
                                    <FormHelperText>{errors.password?.message}</FormHelperText>
                                </FormControl>
                            </Grid>
                            {step === "LOGIN" && (
                                <Grid size={12} >
                                    <Button type="submit" fullWidth size="small" variant="contained" startIcon={<LoginIcon />} className="custom-button" sx={{ my: 1 }}> <Typography sx={{ padding: "4px", fontWeight: 500, fontFamily: "Poppins", y: 3 }}>Login</Typography> </Button>
                                    <Button size="small" variant="text" onClick={handleForgetPassword}
                                        sx={{
                                            textTransform: 'none',
                                            padding: 0,
                                            minWidth: 'auto',
                                            fontSize: '0.875rem',
                                            color: '#752A15',
                                            '&:hover': {
                                                textDecoration: 'underline',
                                                backgroundColor: 'transparent'
                                            }
                                        }}> Create a new account </Button>
                                </Grid>
                            )}
                        </Grid>
                    </form>
                )}
                {enableCreateUser && (
                    <CreateUser forgetPasswordFunction={enableCreateUser} setForgetPasswordFunction={setEnableCreateUser} handleBackToLogin={() => setEnableCreateUser(false)}></CreateUser>
                )}
            </Paper>
        </Box>
    );
};

function CreateUser(props: { forgetPasswordFunction: boolean, setForgetPasswordFunction: React.Dispatch<React.SetStateAction<boolean>>; handleBackToLogin: () => void; }) {

    const { control, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<FormValuesCreateUser>({
        defaultValues: {
            username: ""
        }
    });
    const handleCreateUser = async (data: FormValuesCreateUser) => {

    };

    return (
        <>
            <form onSubmit={handleSubmit(handleCreateUser)} noValidate>

                <Grid container spacing={2}>

                    <Grid size={6}>
                        <Button fullWidth size="small" variant="outlined" onClick={() => props.handleBackToLogin()} >
                            Back
                        </Button>
                    </Grid>
                    <Grid size={6}>
                        <Button type="submit" fullWidth size="small" variant="contained" startIcon={<KeyIcon />} >
                            Create User
                        </Button>
                    </Grid>
                </Grid>

            </form>

        </>
    );
}

export default LoginPage;
