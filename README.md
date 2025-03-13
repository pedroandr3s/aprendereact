# Cuaderno - Gestión de Finanzas

Cuaderno es una aplicación web para la gestión de ingresos y gastos de un local. Permite registrar movimientos financieros y visualizar un historial detallado. La aplicación está integrada con Firebase para almacenar la información de manera segura y en tiempo real.

## Características ✨

- **Registro de ingresos y gastos** 💰
- **Historial de transacciones** 📛
- **Conexión con Firebase para almacenamiento en la nube** ☁️
- **Interfaz simple y fácil de usar** 🖥️
- **Desplegado en GitHub Pages** 🌍

## Tecnologías utilizadas 🛠️

- React ⚛️
- Firebase 🔥
- Tailwind CSS 🎨
- Styled-components 💅
- GitHub Pages 🚀

## Estructura del Proyecto 

```
cuaderno/
│── build/              # Archivos generados tras la compilación
│── node_modules/       # Dependencias instaladas
│── public/            # Archivos estáticos (favicon, manifest, etc.)
│── src/               # Código fuente del proyecto
│   ├── components/    # Componentes reutilizables
│   │   ├── Expense.js
│   │   ├── Income.js
│   │   ├── TransactionForm.js
│   │   ├── TransactionList.js
│   │   ├── historial.js
│   │   ├── firebaseConfig.js
│   ├── styles/        # Archivos de estilo
│   ├── utils/         # Utilidades y funciones auxiliares
│   ├── App.js         # Componente principal
│   ├── index.js       # Punto de entrada de la aplicación
│── .gitignore         # Archivos y carpetas a ignorar en Git
│── package.json       # Configuración del proyecto y dependencias
│── postcss.config.js  # Configuración de PostCSS
│── tailwind.config.js # Configuración de Tailwind CSS
│── README.md          # Documentación del proyecto
```

## Instalación y uso 🏷️

1. Clona el repositorio:
   ```sh
   git clone https://github.com/pedroandr3s/cuaderno.git
   cd cuaderno
   ```

2. Instala las dependencias:
   ```sh
   npm install
   ```

3. Configura Firebase:
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
   - Agrega tu archivo `firebaseConfig.js` con la configuración de Firebase.

4. Inicia la aplicación en modo desarrollo:
   ```sh
   npm start
   ```

5. Para desplegar en GitHub Pages:
   ```sh
   npm run deploy
   ```

## Uso 🚀

- Ingresa los datos de los ingresos y gastos.
- Consulta el historial para visualizar los movimientos financieros.
- Los datos se almacenan en Firebase en tiempo real.

## Demo 🎥

Puedes ver la aplicación en funcionamiento aquí: [Cuaderno](https://pedroandr3s.github.io/cuaderno/)

## Autor ✍️

Desarrollado por **Pedro Andrés**. 

## Contribuciones 🤝

Las contribuciones son bienvenidas. ¡Siéntete libre de hacer un fork y mejorar el proyecto!

## Licencia 📚

Este proyecto está bajo la licencia MIT.

