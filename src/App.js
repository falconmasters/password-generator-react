import React, {useState, useEffect} from 'react';
import './App.css';
import Imagen from './img/logo.png';
import styled from 'styled-components';
import { BotonIncrementar, BotonDisminuir, BotonCheck, BotonGenerar } from './componentes/botones';
import generarPassword from './funciones/generarPassword';

const App = () => {
	const [configuracion, cambiarConfiguracion] = useState({
		numeroDeCaracteres: 7,
		simbolos: true,
		numeros: true,
		mayusculas: true
	});

	const [passwordGenerada, cambiarPasswordGenerada] = useState('');

	useEffect(() => {
		cambiarPasswordGenerada(generarPassword(configuracion));
	}, [configuracion]);

	const incrementarNumeroCaracteres = () => {
		cambiarConfiguracion((configuracionAnterior) => {
			const nuevaConfiguracion = {...configuracionAnterior};
			nuevaConfiguracion.numeroDeCaracteres += 1;
			return nuevaConfiguracion; 
		});
	}

	const disminuirNumeroCaracteres = () => {
		if(configuracion.numeroDeCaracteres > 1){
			cambiarConfiguracion((configuracionAnterior) => {
				const nuevaConfiguracion = {...configuracionAnterior};
				nuevaConfiguracion.numeroDeCaracteres -= 1;
				return nuevaConfiguracion; 
			});
		}
	}

	const toggleSimbolos = () => {
		cambiarConfiguracion((configuracionAnterior) => {
			const nuevaConfiguracion = {...configuracionAnterior};
			nuevaConfiguracion.simbolos = !nuevaConfiguracion.simbolos;
			return nuevaConfiguracion; 
		});
	}

	const toggleNumeros = () => {
		cambiarConfiguracion((configuracionAnterior) => {
			const nuevaConfiguracion = {...configuracionAnterior};
			nuevaConfiguracion.numeros = !nuevaConfiguracion.numeros;
			return nuevaConfiguracion; 
		});
	}

	const toggleMayusculas = () => {
		cambiarConfiguracion((configuracionAnterior) => {
			const nuevaConfiguracion = {...configuracionAnterior};
			nuevaConfiguracion.mayusculas = !nuevaConfiguracion.mayusculas;
			return nuevaConfiguracion; 
		});
	}

	const onSubmit = (e) => {
		e.preventDefault();

		cambiarPasswordGenerada(generarPassword(configuracion));
	}

	return (
		<div className="contenedor">
			<Logo>
				<img src={Imagen} alt="" />
			</Logo>

			<form onSubmit={onSubmit}>
				<Fila>
					<label>Numero de caracteres:</label>
					<Controles>
						<BotonDisminuir click={disminuirNumeroCaracteres} />
						<span>{configuracion.numeroDeCaracteres}</span>
						<BotonIncrementar click={incrementarNumeroCaracteres} />
					</Controles>
				</Fila>
				<Fila>
					<label>¿Incluir Simbolos?</label>
					<BotonCheck seleccionado={configuracion.simbolos} click={toggleSimbolos} />
				</Fila>
				<Fila>
					<label>¿Incluir Numeros?</label>
					<BotonCheck seleccionado={configuracion.numeros} click={toggleNumeros} />
				</Fila>
				<Fila>
					<label>¿Incluir Mayusculas?</label>
					<BotonCheck seleccionado={configuracion.mayusculas} click={toggleMayusculas} />
				</Fila>
				<Fila>
					<BotonGenerar />
					<Input type="text" readOnly={true} value={passwordGenerada} />
				</Fila>
			</form>
		</div>
	);
}
 
export default App;

const Logo = styled.div`
	margin-bottom: 50px;

	img {
		width: 100%;
		vertical-align: top;
	}
`

const Fila = styled.div`
	margin-bottom: 40px;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 10px;
`;

const Controles = styled.div`
	display: flex;
	justify-content: space-between;
	text-align: center;

	& > * {
		flex: 1;
	}

	span {
		line-height: 40px;
		background: #33257E;
	}
`;

const Input = styled.input`
	width: 100%;
	background: none;
	border-radius: 4px;
	border: 1px solid rgba(255,255,255, .25);
	color: #fff;
	height: 40px;
	line-height: 40px;
	cursor: pointer;
	transition: all .3s ease;

	&:hover {
		border: 1px solid rgba(255,255,255, .50);
	}

	&::selection {
		background: #212139;
	}

	&::-moz-selection {
		background: #212139;
	}
`;