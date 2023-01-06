import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert'
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { authorizationEndpoints } from "../api/endpoints";
import { CircularProgress } from "@mui/material";

const theme = createTheme();

const Login = (props) => {
    const [codigo, setCodigo] = useState("")
    const [codigoErroneo, setCodigoErroneo] = useState(false)
    const [haciendoSubmit, setHaciendoSubmit] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        setHaciendoSubmit(true)

        if (codigoErroneo) setCodigoErroneo(false)

        let response = await fetch(authorizationEndpoints.authentificate, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ code: codigo })
        })

        if (response.ok) {
            props.setToken(await response.text())
            props.setLogeado()
            setHaciendoSubmit(false)

            return
        }

        setCodigoErroneo(true)
        setHaciendoSubmit(false)
    };

    return (
        <ThemeProvider theme={theme}>
            <div style={{ background: "grey", width: "100%", height: "80px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <img src={'ferroglobe500.png'} alt="Logo" style={{ width: '70px', display: 'pointer' }} />
                <span style={{ fontFamily: "Roboto", fontWeight: "bold", fontSize: "25px" }}>Ferroglobe</span>
            </div>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5"> Control de acceso </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            fullWidth
                            label="Codigo"
                            type="password"
                            autoComplete="current-password"
                            value={codigo}
                            onChange={ev => {
                                setCodigo(ev.target.value)
                            }}
                        />

                        {codigoErroneo ?
                            <Alert severity="error">El código introducido no es válido</ Alert>
                            : null}

                        {haciendoSubmit ?
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                <CircularProgress />
                            </div>
                            :
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Acceder
                            </Button>
                        }
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Login