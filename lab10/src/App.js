import React, { Component } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Container, Typography, TextField, Button, Box, Grid 
} from '@mui/material';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos: [],
      recuperado: false,
      nuevaDescripcion: '',
      nuevoPrecio: ''
    };
  }

  componentDidMount() {
    this.cargarProductos();
  }

  cargarProductos = () => {
    fetch('http://localhost:8000/api/producto/')
      .then((response) => response.json())
      .then((prod) => {
        this.setState({ 
          productos: prod,
          recuperado: true 
        });
      })
      .catch((error) => console.error("Error al traer datos:", error));
  }

  manejarEnvio = (e) => {
    e.preventDefault();
    const { nuevaDescripcion, nuevoPrecio } = this.state;

    if (!nuevaDescripcion || !nuevoPrecio) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    fetch('http://localhost:8000/api/producto/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        descripcion: nuevaDescripcion,
        precio: parseFloat(nuevoPrecio)
      })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al guardar el producto');
      }
      return response.json();
    })
    .then(() => {
      this.setState({ nuevaDescripcion: '', nuevoPrecio: '' });
      this.cargarProductos(); 
    })
    .catch(error => console.error("Error al guardar:", error));
  }

  mostrarTabla() {
    return (
      <Container sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" color="primary" sx={{ fontWeight: 'bold' }}>
          Mantenimiento de Productos - Tecsup
        </Typography>

        <Box 
          component="form" 
          onSubmit={this.manejarEnvio} 
          sx={{ 
            mb: 4, 
            p: 3, 
            backgroundColor: '#f9f9f9',
            boxShadow: 3, 
            borderRadius: 2 
          }}
        >
          <Typography variant="h6" sx={{ mb: 2, color: '#333', fontWeight: 'medium' }}>
            Agregar Nuevo Producto
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={5}>
              <TextField 
                fullWidth 
                label="Descripción del producto" 
                variant="outlined" 
                value={this.state.nuevaDescripcion}
                onChange={(e) => this.setState({ nuevaDescripcion: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField 
                fullWidth 
                label="Precio (S/.)" 
                type="number" 
                inputProps={{ step: "0.01" }}
                variant="outlined" 
                value={this.state.nuevoPrecio}
                onChange={(e) => this.setState({ nuevoPrecio: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <Button fullWidth type="submit" variant="contained" color="success" size="large">
                Guardar Producto
              </Button>
            </Grid>
          </Grid>
        </Box>

        <TableContainer component={Paper} elevation={3}>
          <Table aria-label="tabla de productos">
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Código</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Descripción</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.productos.map((prod) => (
                <TableRow key={prod.codigo} hover>
                  <TableCell>{prod.codigo}</TableCell>
                  <TableCell>{prod.descripcion}</TableCell>
                  <TableCell>S/. {prod.precio ? prod.precio.toFixed(2) : "0.00"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }

  render() {
    if (this.state.recuperado) {
      return this.mostrarTabla();
    } else {
      return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', fontSize: '1.5rem', fontFamily: 'Roboto', color: '#555' }}>
          Recuperando datos desde la API de Django...
        </div>
      );
    }
  }
}

export default App;
