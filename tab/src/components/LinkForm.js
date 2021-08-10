import React, {useEffect,useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp(props) {
  const classes = useStyles();

  const initialValues = {
    usuario: "",
    password: "",
    id: null
  }

  const [accion,setAccion] = useState("Guardar");

  const [values,setValues] = useState(initialValues);

  const handleInputChange = (e) => {

    const {name,value} = e.target;
    setValues({...values,[name]: value});
  }


  const handleSubmit = (e) =>{
    e.preventDefault();
    props.addUser(values,accion);

    setValues({...initialValues});
  }

  const handleEliminated = (e) =>{
    props.Eliminar(values);
    setValues({...initialValues});
  }


  useEffect(() => {
  if(props.copiaValues === ""){
    setValues({...initialValues});
  }else{
    setValues(props.copiaValues);
    setAccion("Modificar");
  }
},[props.copiaValues]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}  noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="usuario"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="user name"
                value={values.usuario}
                onChange={handleInputChange}
                autoFocus
              />
            </Grid>


            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={values.password}
                onChange={handleInputChange}
                autoComplete="current-password"
              />
            </Grid>

          </Grid>
          <Button

            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}

          >
            {accion}
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
            onClick={handleEliminated}
          >
              Eliminar
          </Button>

        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
