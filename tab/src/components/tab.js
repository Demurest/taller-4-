import React, {useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LinkForm from './LinkForm';
import MaterialDatatable from "material-datatable";
import axios from 'axios';
import Button from '@material-ui/core/Button';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function SimpleTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [data,setData] = useState([]);

  const [copiaValues,setCopia] = useState("");
  //const [accion,setAccion] = useState("Guardar");

  const handleChange = (event, newValue) => {

    setValue(newValue);
  };



  const columns = [
    {
    name: "Sel",
       options: {
         headerNoWrap: true,
         customBodyRender: (item) => {
           return (
             <Button
               variant="contained"
               className="btn-block"
               onClick={() =>{

                   setCopia(item);
                   console.log(copiaValues);

                   /*setNombre(item.nombre)
                   setApellido(item.apellido)
                   setRut(item.rut)
                   setId(item.id)
                   setAccion("Modificar")*/

               }}
             >
               Seleccionar
             </Button>
           );
         },
       },
     },

    {
        name: 'Usuario',
        field: 'usuario'
    },
    {
        name: 'Password',
        field: 'password'
    },

  ];

  const options = {
    selectableRows: false
  };

  useEffect(() => {

    Listar();
  },[]);

  const Listar = () =>{

        axios
            .get(
                `http://192.99.144.232:8080/api/usuario`
            )
            .then(
                (response) => {
                    setData(response.data)
                    Listar()
                },
                (error) => {
                  alert("Error al listar")
                }



            );
    }

  const addUser = (LinkObject, copiaAccion) => {

    if(copiaAccion==="Guardar"){
        axios
        .post(
            `http://192.99.144.232:8080/api/usuario`, {
            usuario: LinkObject.usuario,
            password: LinkObject.password
        }
        )
        .then(
            (response) => {
                if (response.status === 200) {
                    alert("Registro Correcto")
                  /*  Swal.fire({
                        title: 'Perfecto!',
                        text: 'Registro Correcto',
                        icon: 'success',
                        confirmButtonText: 'ok'
                      })*/
                  //  Listar();
                  //  Limpiar();
                }

            },
            (error) => {

                alert("Error al registrar")
            }



        );
    }

    if(copiaAccion==="Modificar"){


    axios
    .put(
        `http://192.99.144.232:8080/api/usuario/${LinkObject.id}`, {
        usuario: LinkObject.usuario,
        password: LinkObject.password
    }
    )
    .then(
        (response) => {
            if (response.status === 200) {
                alert("Modificacion correcta")
                Listar();
                Limpiar();
            }

        },
        (error) => {

            alert("Error al Modificar")
        }



    );
  }
  }


  const Eliminar = (LinkEliminated) =>{

      axios
      .delete(
          `http://192.99.144.232:8080/api/usuario/${LinkEliminated.id}`
      )
      .then(
          (response) => {
              if (response.status === 200) {
                  alert("Eliminacion correcta")
                  Listar();
                  Limpiar();
              }

          },
          (error) => {

              alert("Error al registrar")
          }



      );

  }
  const Limpiar = () => {

      setCopia("");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Registrar" {...a11yProps(0)} />
          <Tab label="Listar" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>

        <div>
          <LinkForm {...{addUser,copiaValues,Eliminar}}/>
        </div>
      </TabPanel>

      <TabPanel value={value} index={1}>

        <div>
          <MaterialDatatable
          title={"Employee List"}
          data={data}
          columns={columns}
          options={options}
          />
        </div>

      </TabPanel>

    </div>
  );
}
