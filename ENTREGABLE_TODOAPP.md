# Entregable - Sistema de Gestion de Tareas (To-Do App)

## 1. Aplicacion elegida

### Nombre del sistema
To-Do App Web (gestion de tareas por estados)

### Descripcion funcional
Aplicacion web que permite administrar tareas personales o de equipo en listas/estados (por ejemplo: Pendiente, En Proceso, Completada).

#### Funcionalidades principales
- Crear tareas
- Editar tareas
- Eliminar tareas
- Marcar tareas como completadas
- Organizar tareas por listas o estados

### Informacion tecnica
- Plataforma: Web
- Lenguaje: JavaScript (Node.js + Express + frontend vanilla)
- Base de datos: SQLite (archivo local `todoapp.db`)
- Acceso:
  - URL: http://localhost:3000
  - Repositorio: [COMPLETAR_REPO]

### Evidencia de funcionamiento
- Screenshot principal de la app ejecutandose: [INSERTAR_IMAGEN_AQUI]
- Estado de ejecucion verificado: Aplicacion iniciada correctamente en http://localhost:3000

---

## 2. Test Plan

### 2.1 Objetivo
Verificar que la aplicacion gestione correctamente las tareas en todas las operaciones principales, asegurando funcionalidad, integridad de datos y experiencia de usuario adecuada.

### 2.2 Alcance

#### Incluye
- Crear tareas
- Editar tareas
- Eliminar tareas
- Marcar tareas como completadas
- Visualizacion por listas o estados

#### Excluye
- Autenticacion y autorizacion de usuarios (si no fue implementada)
- Notificaciones externas (correo/push), si no aplica

### 2.3 Estrategia de pruebas
- Pruebas funcionales: validar comportamiento de cada requisito.
- Pruebas de UI: verificar elementos visuales, mensajes y flujo de uso.
- Pruebas de validacion de datos: entradas validas/invalidas, campos obligatorios, limites.

### 2.4 Tipos de pruebas
- Unitarias: validacion de funciones/metodos individuales (`tests/validation.test.js`).
- Integracion: interaccion API/backend-base de datos (`tests/api.test.js`).
- Sistema: validacion end-to-end desde interfaz hasta persistencia.

### 2.5 Recursos
- Hardware: PC o laptop
- Software: Navegador Google Chrome
- Recurso humano: 1 usuario tester
- Entorno: local o despliegue web

### 2.6 Cronograma

| Actividad | Tiempo |
|---|---|
| Diseno de pruebas | 1 dia |
| Ejecucion de pruebas | 2 dias |

### 2.7 Criterios de aceptacion
- No existen errores criticos (bloqueantes).
- Las funcionalidades cumplen los requisitos definidos.
- Los resultados esperados de los casos de prueba se cumplen.
- La aplicacion mantiene consistencia de datos tras operaciones CRUD.

---

## 3. Casos de prueba

### 3.1 Lista de Test Cases

| ID | Nombre | Descripcion |
|---|---|---|
| TC01 | Crear tarea | Verifica la creacion correcta de una tarea nueva |
| TC02 | Editar tarea | Verifica la actualizacion de titulo/descripcion de una tarea |
| TC03 | Eliminar tarea | Verifica la eliminacion de una tarea existente |
| TC04 | Completar tarea | Verifica el cambio de estado a completada |

### 3.2 Caso detallado (obligatorio)

#### Test Case: TC01 - Crear tarea
- Precondicion: El usuario se encuentra en la pantalla principal de la app.
- Datos de prueba:
  - Titulo: "Estudiar pruebas de software"
  - Descripcion: "Completar test plan y casos de prueba"
- Pasos:
  1. Hacer clic en "Nueva tarea".
  2. Escribir el titulo de la tarea.
  3. (Opcional) Escribir descripcion.
  4. Hacer clic en "Guardar".
- Resultado esperado:
  - La tarea aparece inmediatamente en la lista "Pendiente" (o estado por defecto).
  - La tarea queda almacenada en la base de datos.
- Resultado obtenido: La tarea se crea correctamente y aparece en la columna "Pendiente".
- Estado final: [x] Passed  [ ] Failed
- Severidad (si falla): N/A
- Observaciones: Validado manualmente en interfaz y por prueba automatizada de API.

---

## 4. Evidencia de ejecucion (obligatoria)

### TC01 - Crear tarea
- Captura antes (pantalla sin la nueva tarea): [INSERTAR_IMAGEN_ANTES]
- Captura despues (pantalla con la nueva tarea creada): [INSERTAR_IMAGEN_DESPUES]
- Resultado de ejecucion: [x] Passed  [ ] Failed
- Fecha de ejecucion: 02/04/2026
- Tester: Sebastian

### Recomendacion para no perder puntos
- Adjuntar capturas legibles y con fecha/hora visible si es posible.
- Mantener consistencia entre pasos, resultado esperado y resultado obtenido.
- Si algun caso falla, registrar evidencia del error y observaciones.

---

## 5. Registro de ejecucion sugerido

| ID | Ejecutado por | Fecha | Resultado | Evidencia |
|---|---|---|---|---|
| TC01 | [Nombre] | [dd/mm/aaaa] | Passed/Failed | Captura antes/despues |
| TC02 | [Nombre] | [dd/mm/aaaa] | Passed/Failed | Captura |
| TC03 | [Nombre] | [dd/mm/aaaa] | Passed/Failed | Captura |
| TC04 | [Nombre] | [dd/mm/aaaa] | Passed/Failed | Captura |

### Resultado de pruebas automatizadas
- Comando ejecutado: `npm test`
- Resultado: 2 archivos de prueba ejecutados, 4 pruebas totales, 4 aprobadas.
- Detalle:
  - `tests/api.test.js`: 2/2 Passed
  - `tests/validation.test.js`: 2/2 Passed

---

## 6. Checklist final de entrega

- [ ] Descripcion de la aplicacion clara y sin ambiguedades
- [ ] Informacion tecnica completa (plataforma, lenguaje, BD, acceso)
- [ ] Screenshot general de la app funcionando
- [ ] Test Plan completo con 7 secciones
- [ ] Lista de Test Cases (TC01-TC04)
- [ ] Caso detallado TC01 completo
- [ ] Evidencia antes/despues de TC01
- [ ] Resultado Passed/Failed documentado
- [x] Backend/API funcionando
- [x] Frontend funcionando
- [x] Pruebas unitarias e integracion ejecutadas y aprobadas
