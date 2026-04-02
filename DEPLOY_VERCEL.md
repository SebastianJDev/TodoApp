# Despliegue en Vercel

## Pasos para subir la app a Vercel

### 1. Requisitos previos
- Cuenta en [Vercel.com](https://vercel.com)
- Git instalado
- Repositorio Git en la carpeta del proyecto

### 2. Crear repositorio Git (si no lo tienes)
```bash
git init
git add .
git commit -m "Initial commit - To-Do App"
```

### 3. Subirlo a GitHub
1. Crear repositorio en [GitHub](https://github.com/new)
2. En tu carpeta local:
```bash
git remote add origin https://github.com/TU_USUARIO/todoapp.git
git branch -M main
git push -u origin main
```

### 4. Desplegar en Vercel
**Opción A: Desde la interfaz web (más fácil)**
1. Ve a [https://vercel.com/new](https://vercel.com/new)
2. Inicia sesión con GitHub
3. Selecciona tu repositorio `todoapp`
4. Haz clic en "Deploy"
5. Espera a que termine (2-3 minutos)

**Opción B: Con Vercel CLI**
```bash
npm install -g vercel
vercel
```
Sigue las instrucciones en pantalla.

### 5. URL pública
Una vez desplegado, Vercel te dará una URL como:
```
https://todoapp-xxxxxxx.vercel.app
```

Esa será tu URL pública para que la incluyas en el informe.

### Notas importantes
- La base de datos SQLite es temporal en Vercel (se reinicia cada despliegue)
- Para persistencia real, usa MongoDB o Firebase
- El archivo `vercel.json` maneja automáticamente las rutas API y estática
