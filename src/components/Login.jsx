import {useState} from 'react';
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

const theme = createTheme();

const Login = (props) => {
    const [codigo, setCodigo] = useState("")
    const [codigoErroneo, setCodigoErroneo] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (codigoErroneo) setCodigoErroneo(false)

        let response = await fetch(authorizationEndpoints.authentificate, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({code: codigo})
        })

        if (response.ok) {
            props.setToken(await response.text())
            props.setLogeado()

            return
        }

        setCodigoErroneo(true)
    };

    return (
        <ThemeProvider theme={theme}>
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

                    <Typography component="h1" variant="h5">Sign in</Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Login