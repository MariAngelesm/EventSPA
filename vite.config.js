import { defineConfig } from 'vite';

// config Vite - SPA (Single Page Application)
export default defineConfig({
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,       // Puerto donde se ejecutará tu app
    open: true        // Abrir el navegador automáticamente al iniciar
  },

  // config (build)
  build: {
    outDir: 'dist'    // Out folder constructed archives Carpeta de salida para los archivos construidos
  },

  // Define el tipo de aplicación como SPA para que cualquier ruta interna
  // redirija a index.html (importante para evitar errores 404 al recargar rutas)
  appType: 'spa',

  // Asegura que los recursos (como CSS, JS) se resuelvan correctamente en producción
  base: './',

  // Puedes agregar alias aquí si lo deseas
  resolve: {
    alias: {
      '/@': '/src'
    }
  }
});