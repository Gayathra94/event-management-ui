import { useNavigate } from "react-router-dom";
import { Alert, Box, Button, FormControl, FormHelperText, Paper, Stack, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import type { User } from "../model/User";
import { createUser } from "../services/auth-service";
import dayjs from "dayjs";
import { useGlobalAlert } from "../common/AlertProvider";
import type { AxiosError } from "axios";


type FormValues = {
    username: string;
    password: string;
};


const LoginPage = () => {

    const navigate = useNavigate();
    const { control, handleSubmit, formState: { errors }} = useForm<FormValues>({ defaultValues: { username: "",password: "", }});
    const [enableCreateUser, setEnableCreateUser] = React.useState(false);

    const handleLogin = async (data: FormValues) => {
        navigate("dashboard");
    };

    const handleUserCreation = () => {
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

                    {!enableCreateUser && (
                        <Typography textAlign="center" sx={{ fontWeight: 900, fontFamily: "'Poppins', 'Arial', sans-serif" }} variant="h5"> Login </Typography>
                    )}
                    {enableCreateUser && (
                        <Typography textAlign="center" sx={{ fontWeight: 900, fontFamily: "'Poppins', 'Arial', sans-serif" }} variant="h5"> Create Account </Typography>
                    )}
                </Stack>

                {!enableCreateUser && (
                    <form onSubmit={handleSubmit(handleLogin)} noValidate>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <Typography textAlign="left" sx={{ fontWeight: "semibold", fontSize: "15px", mb: "2px", mt: "2px", color: "#2D2D2D" }}>
                                    Username{" "}<Box component="span" sx={{ color: "red" }}>*</Box>
                                </Typography>

                                <FormControl fullWidth error={!!errors.username} size="small" >
                                    <Controller name="username" defaultValue="" control={control} rules={{ required: "Username is required." }}
                                        render={({ field }) => (
                                            <TextField {...field} size="small"
                                                slotProps={{
                                                    input: { inputProps: { maxLength: 50 } }
                                                }} />
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
                                            <TextField {...field} type="password" size="small"
                                                slotProps={{
                                                    input: { inputProps: { maxLength: 100 } }
                                                }} />
                                        )}
                                    />
                                    <FormHelperText>{errors.password?.message}</FormHelperText>
                                </FormControl>
                            </Grid>
                            {!enableCreateUser && (
                                <Grid size={12} >
                                    <Button type="submit" fullWidth size="small" variant="contained" startIcon={<LoginIcon />} className="custom-button" sx={{ my: 1 }}> <Typography sx={{ padding: "4px", fontWeight: 500, fontFamily: "Poppins", y: 3 }}>Login</Typography> </Button>
                                    <Button size="small" variant="text" onClick={handleUserCreation}
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
                    <CreateUser enableCreateUser={enableCreateUser} setEnableCreateUser={setEnableCreateUser} handleBackToLogin={() => setEnableCreateUser(false)}></CreateUser>
                )}
            </Paper>
        </Box>
    );
};

function CreateUser(props: { enableCreateUser: boolean, setEnableCreateUser: React.Dispatch<React.SetStateAction<boolean>>; handleBackToLogin: () => void; }) {

    const { showAlert } = useGlobalAlert();
    const { control, handleSubmit, formState: { errors } } = useForm<User>({
        defaultValues: {  id: "",username: "", password: "",name: "", email: "",role: "ADMIN", createdAt: dayjs(), updatedAt: dayjs()}
    });

    const handleCreateUser = async (user: User) => {
        try {
            const response = await createUser(user);
            if (response.status === 200) {
                showAlert(`User has been created successfully.`, "success")
            }
        } catch (err: unknown) {
            const error = err as AxiosError;
            showAlert(`${error.response?.data}`, "error")
        }
    };

    return (
            <form onSubmit={handleSubmit(handleCreateUser)} noValidate>

                <Grid container spacing={2}>

                    <Grid size={12}>
                        <Typography textAlign="left" sx={{ fontWeight: "semibold", fontSize: "15px", mb: "2px", mt: "2px", color: "#2D2D2D" }}>
                            Username{" "}<Box component="span" sx={{ color: "red" }}>*</Box>
                        </Typography>
                        <FormControl fullWidth error={!!errors.username} size="small" >
                            <Controller name="username" defaultValue="" control={control} rules={{ required: "Username is required." }}
                                render={({ field }) => (
                                    <TextField {...field} size="small" slotProps={{
                                        input: { inputProps: { maxLength: 50 } }
                                    }} />
                                )}
                            />
                            <FormHelperText>{errors.username?.message}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid size={12}>
                        <Typography textAlign="left" sx={{ fontWeight: "semibold", fontSize: "15px", mb: "2px", mt: "2px", color: "#2D2D2D" }}>Password{" "}<Box component="span" sx={{ color: "red" }}>*</Box></Typography>
                        <FormControl fullWidth error={!!errors.password} size="small">
                            <Controller name="password" defaultValue="" control={control} rules={{
                                required: "Password is required.",
                                pattern: {
                                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                    message: "Must contain 8+ characters, uppercase, lowercase, number, and special character.",
                                },
                            }}
                                render={({ field }) => (
                                    <TextField {...field} type="password" size="small" slotProps={{
                                        input: { inputProps: { maxLength: 100 } }
                                    }} />
                                )}
                            />
                            <FormHelperText>{errors.password?.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <Typography textAlign="left" sx={{ fontWeight: "semibold", fontSize: "15px", mb: "2px", mt: "2px", color: "#2D2D2D" }}>Name</Typography>
                        <FormControl fullWidth size="small">
                            <Controller name="name" defaultValue="" control={control}
                                render={({ field }) => (
                                    <TextField {...field} type="text" size="small" slotProps={{
                                        input: { inputProps: { maxLength: 100 } }
                                    }} />
                                )}
                            />
                        </FormControl>
                    </Grid>
                    <Grid size={12}>
                        <Typography textAlign="left" sx={{ fontWeight: "semibold", fontSize: "15px", mb: "2px", mt: "2px", color: "#2D2D2D" }}>Email</Typography>
                        <FormControl fullWidth error={!!errors.email} size="small">
                            <Controller name="email" defaultValue="" control={control} rules={{
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: "Please add valid email.",
                                },
                            }}
                                render={({ field }) => (
                                    <TextField {...field} type="text" size="small" slotProps={{
                                        input: { inputProps: { maxLength: 255 } }
                                    }} />
                                )}
                            />
                            <FormHelperText>{errors.email?.message}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid size={6}>
                        <Button fullWidth size="small" variant="outlined" onClick={() => props.handleBackToLogin()} > Back </Button>
                    </Grid>
                    <Grid size={6}>
                        <Button type="submit" fullWidth size="small" variant="contained" startIcon={<PersonAddIcon />} > Create User</Button>
                    </Grid>
                </Grid>

            </form>
    );
}

export default LoginPage;
