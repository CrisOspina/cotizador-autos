import React, { Component } from 'react'
//Componente funcional Header
import Header from './Header';
//Componente formulario . refs - props
import Formulario from './Formulario';
//Componente resumen
import Resumen from "./Resumen";
//Helper
import { obtenerDiferenciaAnio, calcularMarca, obtenerPlan } from '../helper';


class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      resultado: '',
      datos: {}
    }
  }

  //
  cotizarSeg = (datos) => {
    const {marca, plan, year} = datos

    //Agregar una base de 2000
    let resultado = 2000

    //Obtener la diferencia de años
    const diferencia = obtenerDiferenciaAnio(year)

    //Por cada año restar el 3% al valor del seguro
    resultado -= ((diferencia * 3) * resultado) / 100

    //Americano 15%, Asiatico 5% y Europeo 30% de incremento el valor actual
    resultado = calcularMarca(marca) * resultado

    //El plan del auto, el básico incremento el valor el 20% y el completo 50%
    let incrementoPlan = obtenerPlan(plan)

    //Dependiendo del plan - incrementar
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2)

    //Crear objeto para el resumen
    const datosAuto = {
      marca: marca,
      plan: plan,
      year: year
    }
    
    //Ya tenemos el costo
    this.setState({
      resultado: resultado,
      datos: datosAuto
    })
  }

  render() {
    return (
      <div className="contenedor">
          <Header 
                titulo = 'Cotizador de seguro de auto'
          />

          <div className="formulario">
            <Formulario 
                      cotizarSeg={this.cotizarSeg}
            />

            <Resumen 
                  datos = {this.state.datos}
                  resultado = {this.state.resultado}
            />

          </div>

      </div>
    )
  }
}

export default App;
