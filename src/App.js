import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './App.css';

// Componentes de ejemplo para demostraciones interactivas
const Saludo = ({ nombre }) => {
  return <h2>Hola, {nombre}</h2>;
};

const Contador = () => {
  const [contador, setContador] = useState(0);
  return (
    <div className="demo-box">
      <p>Contador: {contador}</p>
      <div className="button-group">
        <button onClick={() => setContador(contador + 1)}>Incrementar</button>
        <button onClick={() => setContador(contador - 1)}>Decrementar</button>
        <button onClick={() => setContador(0)}>Reiniciar</button>
      </div>
    </div>
  );
};

const TemaContext = React.createContext();

const ProveedorTema = ({ children }) => {
  const [tema, setTema] = useState('claro');
  
  return (
    <TemaContext.Provider value={{ tema, setTema }}>
      <div className={`tema-${tema}`}>
        {children}
        <div className="demo-box">
          <p>Tema actual: {tema}</p>
          <button 
            onClick={() => setTema(tema === 'claro' ? 'oscuro' : 'claro')}
          >
            Cambiar a tema {tema === 'claro' ? 'oscuro' : 'claro'}
          </button>
        </div>
      </div>
    </TemaContext.Provider>
  );
};

const ConsumidorTema = () => {
  const { tema } = React.useContext(TemaContext);
  return (
    <div className="tema-info">
      Este componente está consumiendo el contexto. El tema actual es: <strong>{tema}</strong>
    </div>
  );
};

const ComponenteReducer = () => {
  const initialState = { contador: 0, historial: [] };
  
  const reducer = (state, action) => {
    switch (action.type) {
      case 'incrementar':
        return {
          contador: state.contador + 1,
          historial: [...state.historial, 'incremento']
        };
      case 'decrementar':
        return {
          contador: state.contador - 1,
          historial: [...state.historial, 'decremento']
        };
      case 'reiniciar':
        return initialState;
      default:
        return state;
    }
  };
  
  const [state, dispatch] = React.useReducer(reducer, initialState);
  
  return (
    <div className="demo-box">
      <p>Contador con useReducer: {state.contador}</p>
      <div className="button-group">
        <button onClick={() => dispatch({ type: 'incrementar' })}>Incrementar</button>
        <button onClick={() => dispatch({ type: 'decrementar' })}>Decrementar</button>
        <button onClick={() => dispatch({ type: 'reiniciar' })}>Reiniciar</button>
      </div>
      <div className="historial">
        <h4>Historial de acciones:</h4>
        <ul>
          {state.historial.map((accion, index) => (
            <li key={index}>{accion}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Componentes de página
const Home = () => (
  <div className="page">
    <div className="hero">
      <h1>Guía Interactiva de Pedro</h1>
      <p>Aprende React de manera práctica con ejemplos interactivos. Esta aplicación es una demostración de los conceptos más importantes de React.</p>
    </div>
    <div className="section">
      <h2>¿Qué es React?</h2>
      <p>React es una biblioteca de JavaScript desarrollada por Facebook para la creación de interfaces de usuario interactivas y eficientes. Se basa en un enfoque declarativo y el uso de componentes reutilizables.</p>
      <p>En esta guía interactiva, aprenderás los conceptos fundamentales de React y verás ejemplos prácticos de cada uno.</p>
    </div>
  </div>
);

const Fundamentos = () => {
  const [nombre, setNombre] = useState('Visitante');
  
  const jsxCode = `const Elemento = () => {
  return <h1>Hola, mundo</h1>;
};`;

  const componenteCode = `const Saludo = ({ nombre }) => {
  return <h1>Hola, {nombre}</h1>;
};`;

  const estadoCode = `import { useState } from "react";

const Contador = () => {
  const [contador, setContador] = useState(0);
  
  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={() => setContador(contador + 1)}>
        Incrementar
      </button>
    </div>
  );
};`;

  return (
    <div className="page">
      <h2>Fundamentos de React</h2>
      
      <div className="section">
        <h3>JSX</h3>
        <p>JSX es una sintaxis que permite escribir estructuras similares a HTML dentro de JavaScript. Aunque no es obligatorio, es la forma más común de escribir componentes en React.</p>
        
        <SyntaxHighlighter language="jsx" style={atomDark}>
          {jsxCode}
        </SyntaxHighlighter>
        
        <div className="demo-container">
          <div className="demo-title">Ejemplo de JSX</div>
          <h1>Hola, mundo</h1>
        </div>
      </div>
      
      <div className="section">
        <h3>Componentes y Props</h3>
        <p>Los componentes son la unidad básica de una aplicación en React. Se pueden escribir como funciones o clases. Las props son propiedades que se pasan a los componentes.</p>
        
        <SyntaxHighlighter language="jsx" style={atomDark}>
          {componenteCode}
        </SyntaxHighlighter>
        
        <div className="demo-container">
          <div className="demo-title">Componente con Props</div>
          <div>
            <input 
              type="text" 
              value={nombre} 
              onChange={(e) => setNombre(e.target.value)} 
              placeholder="Tu nombre" 
              className="input"
            />
            <Saludo nombre={nombre} />
          </div>
        </div>
      </div>
      
      <div className="section">
        <h3>Estado y Ciclo de Vida</h3>
        <p>El estado permite a los componentes manejar información interna. Se gestiona mediante el hook `useState` en componentes funcionales.</p>
        
        <SyntaxHighlighter language="jsx" style={atomDark}>
          {estadoCode}
        </SyntaxHighlighter>
        
        <div className="demo-container">
          <div className="demo-title">Componente con Estado</div>
          <Contador />
        </div>
      </div>
    </div>
  );
};

const Hooks = () => {
  // useState Demo
  const [texto, setTexto] = useState('');
  
  // useEffect Demo
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  
  React.useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setCount(prevCount => prevCount + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const hooksCode = `// Algunos hooks comunes en React:

// useState - Para manejo de estado
const [valor, setValor] = useState(valorInicial);

// useEffect - Para efectos secundarios
useEffect(() => {
  // Código que se ejecuta después del renderizado
  return () => {
    // Función de limpieza (opcional)
  };
}, [dependencias]); // Array de dependencias

// useContext - Para consumir contextos
const valor = useContext(MiContexto);

// useReducer - Para estados complejos
const [state, dispatch] = useReducer(reducer, initialState);

// useRef - Para referencias mutables
const miReferencia = useRef(valorInicial);

// useMemo - Para memoización de valores
const valorMemoizado = useMemo(() => calcularValor(a, b), [a, b]);

// useCallback - Para memoización de funciones
const funcionMemoizada = useCallback(() => hacerAlgo(a, b), [a, b]);`;

  return (
    <div className="page">
      <h2>Hooks en React</h2>
      
      <div className="section">
        <p>Los hooks permiten gestionar el estado y el ciclo de vida en componentes funcionales, introducidos en React 16.8.</p>
        
        <SyntaxHighlighter language="jsx" style={atomDark}>
          {hooksCode}
        </SyntaxHighlighter>
      </div>
      
      <div className="section">
        <h3>useState</h3>
        <p>Permite agregar estado a componentes funcionales.</p>
        
        <div className="demo-container">
          <div className="demo-title">Demo de useState</div>
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Escribe algo..."
            className="input"
          />
          <p>Texto escrito: {texto || '(Vacío)'}</p>
        </div>
      </div>
      
      <div className="section">
        <h3>useEffect</h3>
        <p>Permite ejecutar código después del renderizado y gestionar efectos secundarios.</p>
        
        <div className="demo-container">
          <div className="demo-title">Demo de useEffect</div>
          <p>Contador: {count}</p>
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? 'Pausar' : 'Iniciar'}
          </button>
          <p><small>useEffect controla el intervalo basado en el estado de isRunning</small></p>
        </div>
      </div>
      
      <div className="section">
        <h3>useContext</h3>
        <p>Permite consumir contextos en componentes funcionales.</p>
        
        <div className="demo-container">
          <div className="demo-title">Demo de useContext</div>
          <ProveedorTema>
            <ConsumidorTema />
          </ProveedorTema>
        </div>
      </div>
      
      <div className="section">
        <h3>useReducer</h3>
        <p>Alternativa a useState para manejar estados complejos.</p>
        
        <div className="demo-container">
          <div className="demo-title">Demo de useReducer</div>
          <ComponenteReducer />
        </div>
      </div>
    </div>
  );
};

const EstadoGlobal = () => {
  const contextApiCode = `// Creación del contexto
const MiContexto = React.createContext();

// Proveedor del contexto
const ProveedorContexto = ({ children }) => {
  const [estado, setEstado] = useState(valorInicial);
  
  return (
    <MiContexto.Provider value={{ estado, setEstado }}>
      {children}
    </MiContexto.Provider>
  );
};

// Consumidor del contexto
const ComponenteConsumidor = () => {
  const { estado, setEstado } = useContext(MiContexto);
  // ...
};`;

  const reduxCode = `// Acción
const incrementar = () => ({
  type: 'INCREMENTAR'
});

// Reducer
const contadorReducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENTAR':
      return state + 1;
    default:
      return state;
  }
};

// Store
const store = createStore(contadorReducer);

// Conector a componente React
const mapStateToProps = (state) => ({
  contador: state
});

const mapDispatchToProps = {
  incrementar
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MiComponente);`;

  return (
    <div className="page">
      <h2>Manejo del Estado Global</h2>
      
      <div className="section">
        <p>Las aplicaciones a gran escala necesitan una gestión centralizada del estado. Las opciones más populares incluyen:</p>
        <ul>
          <li>Context API (para estados ligeros)</li>
          <li>Redux (para aplicaciones con estado complejo y compartido)</li>
          <li>Zustand o Recoil (opciones más modernas y ligeras)</li>
        </ul>
      </div>
      
      <div className="section">
        <h3>Context API</h3>
        <p>La API de Contexto de React proporciona una forma de compartir valores entre componentes sin tener que pasar props de forma explícita.</p>
        
        <SyntaxHighlighter language="jsx" style={atomDark}>
          {contextApiCode}
        </SyntaxHighlighter>
        
        <div className="demo-container">
          <div className="demo-title">Demo de Context API</div>
          <ProveedorTema>
            <div className="state-container">
              <ConsumidorTema />
              <p>El tema afecta a todos los componentes dentro del proveedor.</p>
            </div>
          </ProveedorTema>
        </div>
      </div>
      
      <div className="section">
        <h3>Redux</h3>
        <p>Redux es una biblioteca para gestionar el estado global de la aplicación que sigue un patrón de flujo de datos unidireccional.</p>
        
        <SyntaxHighlighter language="jsx" style={atomDark}>
          {reduxCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const Rutas = () => {
  const routesCode = `import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Home = () => <h2>Página de Inicio</h2>;
const About = () => <h2>Acerca de</h2>;

const App = () => {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/about">Acerca</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
};`;

  // Componentes para la demostración de rutas
  const InicioDemoRutas = () => <h3>Página de Inicio</h3>;
  const SobreDemoRutas = () => <h3>Acerca de Nosotros</h3>;
  const ContactoDemoRutas = () => <h3>Contacto</h3>;

  // Mini router para demostración
  const DemoRouter = () => {
    const [ruta, setRuta] = useState('/');
    
    const renderComponente = () => {
      switch (ruta) {
        case '/':
          return <InicioDemoRutas />;
        case '/sobre':
          return <SobreDemoRutas />;
        case '/contacto':
          return <ContactoDemoRutas />;
        default:
          return <InicioDemoRutas />;
      }
    };
    
    return (
      <div className="demo-router">
        <nav className="demo-nav">
          <button 
            className={ruta === '/' ? 'active' : ''} 
            onClick={() => setRuta('/')}
          >
            Inicio
          </button>
          <button 
            className={ruta === '/sobre' ? 'active' : ''} 
            onClick={() => setRuta('/sobre')}
          >
            Sobre
          </button>
          <button 
            className={ruta === '/contacto' ? 'active' : ''} 
            onClick={() => setRuta('/contacto')}
          >
            Contacto
          </button>
        </nav>
        <div className="demo-content">
          {renderComponente()}
        </div>
      </div>
    );
  };

  return (
    <div className="page">
      <h2>React Router</h2>
      
      <div className="section">
        <p>React Router permite la navegación entre distintas vistas en aplicaciones de una sola página (SPA).</p>
        
        <SyntaxHighlighter language="jsx" style={atomDark}>
          {routesCode}
        </SyntaxHighlighter>
        
        <div className="demo-container">
          <div className="demo-title">Demo de React Router</div>
          <DemoRouter />
        </div>
      </div>
    </div>
  );
};

const Estilizado = () => {
  const cssModulesCode = `/* Button.module.css */
.button {
  padding: 10px 15px;
  border-radius: 4px;
  background-color: #61dafb;
  color: white;
  border: none;
}

/* En tu componente */
import styles from './Button.module.css';

const Button = ({ children }) => {
  return <button className={styles.button}>{children}</button>;
};`;

  const styledComponentsCode = `import styled from 'styled-components';

const Button = styled.button\`
  padding: 10px 15px;
  border-radius: 4px;
  background-color: #61dafb;
  color: white;
  border: none;
  
  &:hover {
    background-color: #4fa8c7;
  }
\`;

// Uso
const MiComponente = () => {
  return <Button>Haz clic</Button>;
};`;

  const tailwindCode = `// Con Tailwind CSS
const Button = () => {
  return (
    <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
      Haz clic
    </button>
  );
};`;

  return (
    <div className="page">
      <h2>Estilizado en React</h2>
      
      <div className="section">
        <p>Existen varias formas de aplicar estilos a los componentes en React:</p>
        <ul>
          <li>CSS tradicional y preprocesadores (SASS, LESS)</li>
          <li>CSS Modules (estilos encapsulados por componente)</li>
          <li>Styled-components y otras bibliotecas CSS-in-JS</li>
          <li>Frameworks de utilidades como Tailwind CSS</li>
          <li>Bibliotecas de componentes como Material-UI, Chakra UI, etc.</li>
        </ul>
      </div>
      
      <div className="section">
        <h3>CSS Modules</h3>
        <p>Los módulos CSS permiten escribir estilos CSS que son locales al componente, evitando colisiones de nombres.</p>
        
        <SyntaxHighlighter language="jsx" style={atomDark}>
          {cssModulesCode}
        </SyntaxHighlighter>
      </div>
      
      <div className="section">
        <h3>Styled Components</h3>
        <p>Styled Components es una biblioteca popular para CSS-in-JS que permite escribir CSS directamente en el código JavaScript.</p>
        
        <SyntaxHighlighter language="jsx" style={atomDark}>
          {styledComponentsCode}
        </SyntaxHighlighter>
      </div>
      
      <div className="section">
        <h3>Tailwind CSS</h3>
        <p>Tailwind CSS es un framework de utilidades CSS que permite construir diseños rápidamente sin escribir CSS personalizado.</p>
        
        <SyntaxHighlighter language="jsx" style={atomDark}>
          {tailwindCode}
        </SyntaxHighlighter>
        
        <div className="demo-container">
          <div className="demo-title">Estilos en React</div>
          <div className="style-examples">
            <button className="btn-css-module">CSS Module</button>
            <button className="btn-styled">Styled Component</button>
            <button className="btn-tailwind">Tailwind CSS</button>
            <button className="btn-material">Material UI</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BuenasPracticas = () => {
  return (
    <div className="page">
      <h2>Buenas Prácticas en React</h2>
      
      <div className="section">
        <h3>Componentes</h3>
        <ul>
          <li>Escribe componentes pequeños y reutilizables con una única responsabilidad.</li>
          <li>Utiliza componentes funcionales y hooks en lugar de componentes de clase cuando sea posible.</li>
          <li>Separa lógica de presentación (componentes contenedores vs. componentes de presentación).</li>
          <li>Nombra tus componentes con claridad siguiendo la convención PascalCase.</li>
        </ul>
      </div>
      
      <div className="section">
        <h3>Hooks y Renderizado</h3>
        <ul>
          <li>Respeta las reglas de los hooks: solo llámalos en el nivel superior y solo desde componentes de función.</li>
          <li>Evita renderizados innecesarios utilizando React.memo, useMemo y useCallback cuando sea apropiado.</li>
          <li>Proporciona un array de dependencias completo y correcto a useEffect, useMemo y useCallback.</li>
          <li>No uses hooks dentro de bucles, condiciones o funciones anidadas.</li>
        </ul>
      </div>
      
      <div className="section">
        <h3>Estado</h3>
        <ul>
          <li>Mantén el estado lo más local posible y eleva solo cuando sea necesario.</li>
          <li>Utiliza Context API para estados globales ligeros y Redux para estados más complejos.</li>
          <li>Divide estados complejos en piezas más pequeñas y manejables.</li>
          <li>Prefiere múltiples llamadas a useState en lugar de un solo objeto grande cuando los estados cambien independientemente.</li>
        </ul>
      </div>
      
      <div className="section">
        <h3>Optimización</h3>
        <ul>
          <li>Utiliza React.lazy y Suspense para la carga diferida de componentes.</li>
          <li>Implementa virtualización para listas largas con react-window o react-virtualized.</li>
          <li>Utiliza herramientas de profiling para identificar cuellos de botella en el rendimiento.</li>
          <li>Evita cálculos costosos durante el renderizado utilizando useMemo.</li>
          <li>Memoriza funciones que se pasan como props con useCallback para evitar renderizados innecesarios.</li>
        </ul>
      </div>
    </div>
  );
};

const Pruebas = () => {
  const jestCode = `// Prueba de un componente con Jest y React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import Contador from './Contador';

test('renderiza el contador con valor inicial 0', () => {
  render(<Contador />);
  const countElement = screen.getByText(/contador: 0/i);
  expect(countElement).toBeInTheDocument();
});

test('incrementa el contador cuando se hace clic en el botón', () => {
  render(<Contador />);
  const button = screen.getByText(/incrementar/i);
  fireEvent.click(button);
  const countElement = screen.getByText(/contador: 1/i);
  expect(countElement).toBeInTheDocument();
});`;

  const cypressCode = `// cypress/integration/contador.spec.js
describe('Contador', () => {
  it('incrementa el valor cuando se hace clic en el botón', () => {
    cy.visit('/');
    cy.contains('Contador: 0');
    cy.contains('Incrementar').click();
    cy.contains('Contador: 1');
  });
});`;

  return (
    <div className="page">
      <h2>Pruebas en React</h2>
      
      <div className="section">
        <p>Las pruebas son esenciales para garantizar la calidad del código y prevenir errores. En React, hay varios tipos de pruebas:</p>
        <ul>
          <li><strong>Pruebas Unitarias:</strong> Prueban componentes individuales de forma aislada.</li>
          <li><strong>Pruebas de Integración:</strong> Prueban cómo interactúan varios componentes.</li>
          <li><strong>Pruebas de Extremo a Extremo (E2E):</strong> Prueban la aplicación completa como lo haría un usuario real.</li>
        </ul>
      </div>
      
      <div className="section">
        <h3>Jest y React Testing Library</h3>
        <p>Jest es un framework de pruebas y React Testing Library es una biblioteca para probar componentes de React.</p>
        
        <SyntaxHighlighter language="jsx" style={atomDark}>
          {jestCode}
        </SyntaxHighlighter>
      </div>
      
      <div className="section">
        <h3>Cypress</h3>
        <p>Cypress es una herramienta para pruebas de extremo a extremo que permite probar la aplicación en un navegador real.</p>
        
        <SyntaxHighlighter language="jsx" style={atomDark}>
          {cypressCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const Ecosistema = () => {
  return (
    <div className="page">
      <h2>Herramientas y Ecosistema</h2>
      
      <div className="section">
        <h3>Iniciar Proyectos</h3>
        <ul>
          <li>
            <strong>Vite:</strong> Herramienta de desarrollo rápida que ofrece un entorno de desarrollo instantáneo y optimizaciones para producción.
            <div className="code-snippet">
              <SyntaxHighlighter language="bash" style={atomDark}>
                {`npm create vite@latest mi-app-react -- --template react`}
              </SyntaxHighlighter>
            </div>
          </li>
          <li>
            <strong>Create React App:</strong> Configuración cero para crear aplicaciones React.
            <div className="code-snippet">
              <SyntaxHighlighter language="bash" style={atomDark}>
                {`npx create-react-app mi-app-react`}
              </SyntaxHighlighter>
            </div>
          </li>
          <li>
            <strong>Next.js:</strong> Framework React para aplicaciones con renderizado del lado del servidor (SSR).
            <div className="code-snippet">
              <SyntaxHighlighter language="bash" style={atomDark}>
                {`npx create-next-app@latest mi-app-next`}
              </SyntaxHighlighter>
            </div>
          </li>
        </ul>
      </div>
      
      <div className="section">
        <h3>Herramientas de Desarrollo</h3>
        <ul>
          <li>
            <strong>ESLint:</strong> Herramienta de linting para identificar problemas en el código JavaScript/React.
          </li>
          <li>
            <strong>Prettier:</strong> Formateador de código para mantener un estilo consistente.
          </li>
          <li>
            <strong>React DevTools:</strong> Extensión del navegador para inspeccionar componentes React.
          </li>
          <li>
            <strong>Redux DevTools:</strong> Herramienta para depurar el estado de Redux.
          </li>
        </ul>
      </div>
      
      <div className="section">
        <h3>Bibliotecas Populares</h3>
        <ul>
          <li>
            <strong>React Router:</strong> Navegación para aplicaciones React.
          </li>
          <li>
            <strong>Redux/Redux Toolkit:</strong> Gestión de estado.
          </li>
          <li>
            <strong>Formik/React Hook Form:</strong> Manejo de formularios.
          </li>
          <li>
            <strong>Axios/SWR/React Query:</strong> Gestión de peticiones HTTP.
          </li>
          <li>
            <strong>Material-UI/Chakra UI/Tailwind CSS:</strong> Sistemas de diseño y estilizado.
          </li>
          <li>
            <strong>Testing Library/Jest/Cypress:</strong> Pruebas.
          </li>
        </ul>
      </div>
      
      <div className="section">
        <h3>Documentación</h3>
        <ul>
          <li>
            <strong>Storybook:</strong> Herramienta para documentar y desarrollar componentes de forma aislada.
          </li>
          <li>
            <strong>Docusaurus:</strong> Generador de sitios de documentación.
          </li>
        </ul>
      </div>
    </div>
  );
};

const Conclusion = () => {
  return (
    <div className="page">
      <h2>Conclusión</h2>
      
      <div className="section">
        <p>Aprender React implica conocer sus fundamentos, hooks, gestión del estado, rutas, estilizado, pruebas y herramientas del ecosistema. Dominar estos aspectos te permitirá destacar como desarrollador en una empresa que utilice React.</p>
        
        <h3>Puntos clave para destacar:</h3>
        <ul>
          <li>Comprende profundamente los conceptos fundamentales de React: componentes, props, estado y el ciclo de vida.</li>
          <li>Domina los hooks de React para escribir código más limpio y reutilizable.</li>
          <li>Aprende a gestionar el estado de forma eficiente, ya sea con Context API, Redux u otras soluciones.</li>
          <li>Conoce las mejores prácticas y patrones de diseño en React.</li>
          <li>Familiarízate con las herramientas de prueba para garantizar la calidad del código.</li>
          <li>Mantente actualizado con las nuevas características y tendencias del ecosistema React.</li>
        </ul>
        
        <h3>Recursos adicionales:</h3>
        <ul>
          <li>Documentación oficial de React: <a href="https://reactjs.org/docs/getting-started.html" target="_blank">reactjs.org</a></li>
          <li>React DevTools: <a href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi" target="_blank">Extensión para navegadores</a></li>
          <li>Cursos en línea en plataformas como Udemy, Pluralsight, Frontend Masters</li>
          <li>Comunidades: Stack Overflow, Reddit r/reactjs, Discord de React</li>
        </ul>
      </div>
    </div>
  );
};

// Componente para la navegación
const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="main-nav">
      <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
        Inicio
      </Link>
      <Link to="/fundamentos" className={location.pathname === '/fundamentos' ? 'active' : ''}>
        Fundamentos
      </Link>
      <Link to="/hooks" className={location.pathname === '/hooks' ? 'active' : ''}>
        Hooks
      </Link>
      <Link to="/estado-global" className={location.pathname === '/estado-global' ? 'active' : ''}>
        Estado Global
      </Link>
      <Link to="/rutas" className={location.pathname === '/rutas' ? 'active' : ''}>
        Rutas
      </Link>
      <Link to="/estilizado" className={location.pathname === '/estilizado' ? 'active' : ''}>
        Estilizado
      </Link>
      <Link to="/buenas-practicas" className={location.pathname === '/buenas-practicas' ? 'active' : ''}>
        Buenas Prácticas
      </Link>
      <Link to="/pruebas" className={location.pathname === '/pruebas' ? 'active' : ''}>
        Pruebas
      </Link>
      <Link to="/ecosistema" className={location.pathname === '/ecosistema' ? 'active' : ''}>
        Ecosistema
      </Link>
      <Link to="/conclusion" className={location.pathname === '/conclusion' ? 'active' : ''}>
        Conclusión
      </Link>
    </nav>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="main-footer">
      <p>Guía Interactiva de Pedro &copy; {new Date().getFullYear()}</p>
      <p>
        Creado con <span role="img" aria-label="heart">❤️</span>IA (Inteligencia Artesanal) usando React
      </p>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <div className="app">
        <header className="main-header">
          <div className="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" />
            <h1>Guía Interactiva de React</h1>
          </div>
        </header>
        
        <Navigation />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/fundamentos" element={<Fundamentos />} />
            <Route path="/hooks" element={<Hooks />} />
            <Route path="/estado-global" element={<EstadoGlobal />} />
            <Route path="/rutas" element={<Rutas />} />
            <Route path="/estilizado" element={<Estilizado />} />
            <Route path="/buenas-practicas" element={<BuenasPracticas />} />
            <Route path="/pruebas" element={<Pruebas />} />
            <Route path="/ecosistema" element={<Ecosistema />} />
            <Route path="/conclusion" element={<Conclusion />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;