# QualityScout Mobile 📱

## 🎓 Proyecto de Tesis

Esta aplicación móvil desarrollada en React Native surge como solución a problemáticas identificadas en vitivinícolas medianas, donde la **falta de información centralizada** y los **flujos de información ineficientes** generaban pérdidas significativas en los procesos de control de calidad.

### 🍇 Problemática Identificada
En las vitivinícolas medianas se observaron los siguientes problemas:
- **Información dispersa** en múltiples sistemas no integrados
- **Procesos manuales** propensos a errores humanos
- **Falta de trazabilidad** en tiempo real de los controles
- **Comunicación deficiente** entre departamentos
- **Reportes desactualizados** que dificultaban la toma de decisiones
- **Pérdida de datos** por sistemas no centralizados

### 💡 Solución Propuesta
QualityScout Mobile centraliza toda la información de control de calidad en una plataforma móvil intuitiva que **funciona en complemento con una página web administrativa**. La aplicación móvil se conecta al backend de la página web para sincronizar datos y permite:

- **Detección automática de errores en etiquetas** usando un modelo de IA entrenado específicamente para identificar defectos en etiquetas de botellas
- Gestión integral de productos y controles de calidad
- Generación de informes y visualización de estadísticas en tiempo real
- Mejora significativa en la eficiencia operacional mediante automatización

### 🌐 Ecosistema Completo
- **Página Web**: Panel administrativo completo con backend robusto
- **App Móvil**: Interfaz optimizada para trabajo de campo y controles en tiempo real
- **Modelo de IA**: Detección automática de defectos en etiquetas de botellas
- **Backend Compartido**: Sincronización de datos entre web y móvil

## 🚀 Características Principales

### 👥 Sistema de Roles
- **Especialista**: Acceso completo al sistema con capacidades de gestión
- **Control de Calidad**: Acceso limitado para operaciones de control

### 🔧 Funcionalidades Core
- **Autenticación segura** con encriptación AES
- **Gestión de productos** (crear, editar, ver, eliminar)
- **Sistema de controles de calidad** con estados (Aprobado, Rechazado, Reproceso)
- **Detección automática de errores en etiquetas** mediante modelo de IA entrenado
- **Generación de informes** detallados
- **Dashboard con estadísticas** y gráficos interactivos
- **Gestión de usuarios** (solo para especialistas)
- **Chatbot integrado** para asistencia
- **Escáner de códigos de barras**
- **Cámara integrada** para documentación y análisis de etiquetas
- **Búsqueda avanzada** de productos y controles

### 📊 Dashboard y Reportes
- Gráficos de torta para estados de controles
- Gráficos de barras para rechazos por país
- Estadísticas mensuales de rechazos y reprocesos
- Visualización de datos en tiempo real

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React Native** 0.76.3
- **Expo** 52.0.11
- **React Navigation** 6.1.18
- **React Native Paper** 5.12.5

### Gráficos y Visualización
- **React Native Chart Kit** 6.12.0
- **React Native SVG** 15.8.0

### Funcionalidades Nativas
- **Expo Camera** 16.0.7
- **Expo Barcode Scanner** 13.0.1
- **React Native WebView** 13.12.4

### Seguridad y Almacenamiento
- **Crypto-JS** 4.2.0
- **AsyncStorage** 1.23.1

### UI/UX
- **React Native Vector Icons** 10.1.0
- **React Native Dropdown Picker** 5.4.6
- **React Native Date Picker** 5.0.7

## 📁 Estructura del Proyecto

```
QualityScout-Mobile/
├── android/                    # Configuración Android
├── assets/                     # Recursos estáticos
│   ├── icons/                 # Iconos de la aplicación
│   └── images/                # Imágenes y logos
├── components/                 # Componentes reutilizables
│   ├── chatbot.js             # Componente del chatbot
│   └── shared.js              # Componentes compartidos
├── navigators/                 # Navegadores de la app
│   ├── EspecialistaNavigator.js
│   ├── ControlCalidadNavigator.js
│   ├── FooterNavigator.js
│   └── NavNavigator.js
├── screens/                    # Pantallas de la aplicación
│   ├── Auth/                  # Autenticación
│   │   └── Login.js
│   ├── Especialista/          # Pantallas del especialista
│   │   ├── Informes/
│   │   ├── Usuarios/
│   │   ├── Dashboard.js
│   │   └── HomeEspecialista.js
│   ├── ControlCalidad/        # Pantallas control de calidad
│   │   └── HomeControlCalidad.js
│   └── Shared/                # Pantallas compartidas
│       ├── Productos/
│       ├── Buscador.js
│       ├── Controles.js
│       └── ...
├── App.js                     # Componente principal
├── config.js                  # Configuración de la API
├── package.json               # Dependencias del proyecto
└── app.json                   # Configuración de Expo
```

## 🔧 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Expo CLI
- Android Studio (para desarrollo Android)
- Xcode (para desarrollo iOS, solo en macOS)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd QualityScout-Mobile-main
```

2. **Instalar dependencias**
```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**
   - Editar `config.js` con la URL de tu backend:
```javascript
export const URL_API_BACKEND = "https://tu-api-backend.com";
```

4. **Ejecutar la aplicación**
```bash
# Desarrollo
npm start
# o
expo start

# Android
npm run android
# o
expo run:android

# iOS
npm run ios
# o
expo run:ios
```

## 🔐 Configuración de Seguridad

La aplicación utiliza encriptación AES para proteger las credenciales de usuario:

```javascript
// Configuración en Login.js
const secretKey = "E93{P254sNRJy2XG"; // 16 bytes
const iv = 'E93{P254sNRJy2XG';      // 16 bytes
```

**⚠️ Importante**: En producción, estas claves deben ser gestionadas de forma segura y no estar hardcodeadas.

## 📱 Funcionalidades por Rol

### 👨‍💼 Especialista
- ✅ Dashboard con estadísticas completas
- ✅ Gestión completa de usuarios
- ✅ Creación y edición de informes
- ✅ Gestión de productos
- ✅ Visualización de todos los controles
- ✅ Acceso a todas las funcionalidades

### 👨‍🔬 Control de Calidad
- ✅ Realización de controles de calidad
- ✅ Visualización de productos
- ✅ Búsqueda de controles
- ✅ Escáner de códigos de barras
- ❌ Sin acceso a gestión de usuarios
- ❌ Sin acceso a dashboard completo

## 🤖 Chatbot Integrado

La aplicación incluye un chatbot flotante que:
- Se integra con Stack AI
- Proporciona asistencia en tiempo real
- Interfaz deslizante animada
- Accesible desde cualquier pantalla

## 📊 API Backend

La aplicación se conecta a un backend REST que maneja **todas las operaciones CRUD del sistema** a través de endpoints especializados:

### 🔐 Autenticación
- `POST /api/authapi/login` - Autenticación de usuarios

### 📈 Dashboard y Estadísticas
- `POST /api/ApiDashboard/CantidadPorEstado` - Estadísticas por estado
- `POST /api/ApiDashboard/RechazadosPais` - Rechazos por país
- `POST /api/ApiDashboard/RechazadosMensuales` - Rechazos mensuales
- `POST /api/ApiDashboard/ReprocesosMensuales` - Reprocesos mensuales

### 🍷 Gestión de Productos
- `GET /api/productos` - Listar productos
- `POST /api/productos` - Crear producto
- `PUT /api/productos/{id}` - Actualizar producto
- `DELETE /api/productos/{id}` - Eliminar producto
- `GET /api/productos/{id}` - Obtener producto específico

### 🔍 Controles de Calidad
- `GET /api/controles` - Listar controles
- `POST /api/controles` - Crear control
- `PUT /api/controles/{id}` - Actualizar control
- `DELETE /api/controles/{id}` - Eliminar control
- `GET /api/controles/{id}` - Obtener control específico

### 👥 Gestión de Usuarios (Solo Especialistas)
- `GET /api/usuarios` - Listar usuarios
- `POST /api/usuarios` - Crear usuario
- `PUT /api/usuarios/{id}` - Actualizar usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario
- `GET /api/usuarios/{id}` - Obtener usuario específico

### 📋 Informes
- `GET /api/informes` - Listar informes
- `POST /api/informes` - Crear informe
- `PUT /api/informes/{id}` - Actualizar informe
- `DELETE /api/informes/{id}` - Eliminar informe
- `GET /api/informes/{id}` - Obtener informe específico

### 🤖 Detección de Errores en Etiquetas
- `POST /api/ia/analizar-etiqueta` - Enviar imagen para análisis de IA
- `GET /api/ia/resultado/{id}` - Obtener resultado del análisis
- `POST /api/ia/entrenar-modelo` - Actualizar modelo con nuevos datos

**Nota**: Todos los endpoints requieren autenticación Bearer Token y respetan los permisos por rol de usuario.

## 🌐 Integración Web-Móvil

Esta aplicación móvil **funciona en complemento con una página web administrativa** que:

### 📊 Página Web (Backend Principal)
- **Panel administrativo completo** con todas las funcionalidades de gestión
- **Backend robusto** que maneja toda la lógica de negocio
- **Base de datos centralizada** con toda la información del sistema
- **Gestión avanzada de usuarios** y permisos
- **Configuración del modelo de IA** para detección de errores
- **Reportes ejecutivos** y análisis avanzados

### 📱 App Móvil (Cliente Optimizado)
- **Interfaz optimizada** para trabajo de campo
- **Controles de calidad en tiempo real** con cámara integrada
- **Sincronización automática** con el backend web
- **Funcionalidad offline** para áreas sin conectividad
- **Notificaciones push** para alertas importantes

### 🔄 Sincronización de Datos
- **Tiempo real**: Cambios instantáneos entre web y móvil
- **Consistencia**: Misma información en ambas plataformas
- **Backup automático**: Respaldo continuo en el servidor web
- **Resolución de conflictos**: Manejo inteligente de cambios simultáneos

## 🏗️ Build y Deployment

### Desarrollo
```bash
expo start --dev-client
```

### Build para Android
```bash
# APK
eas build --platform android --profile production

# AAB para Google Play Store
eas build --platform android --profile production --auto-submit
```

### Build para iOS
```bash
eas build --platform ios --profile production
```

## 🎨 Diseño y UI

### Paleta de Colores
- **Primario**: `#260202` (Rojo oscuro)
- **Secundario**: `#f25757` (Rojo claro)
- **Acento**: `#bf6565` (Rojo medio)
- **Fondo**: `#ffffff` (Blanco)
- **Texto**: `#0d0d0d` (Negro)

### Componentes UI
- Navegación por pestañas inferior
- Animaciones fluidas con Animated API
- Diseño responsive
- Iconografía consistente
- Formularios intuitivos

## 🔍 Funcionalidades Especiales

### 🤖 Detección de Errores con IA
- **Modelo entrenado** específicamente para detectar errores en etiquetas de botellas
- **Análisis automático** de imágenes capturadas con la cámara
- **Identificación de defectos** como:
  - Etiquetas mal alineadas
  - Texto borroso o ilegible
  - Colores incorrectos
  - Daños físicos en la etiqueta
  - Información faltante o incorrecta
- **Integración con controles de calidad** para automatizar el proceso de revisión

### Escáner de Códigos
- Integración con Expo Barcode Scanner
- Soporte para múltiples formatos
- Interfaz de cámara nativa

### Gestión de Archivos
- Expo File System para manejo de archivos
- Clipboard para copiar/pegar
- Almacenamiento local seguro

### Gráficos Interactivos
- Gráficos de torta para distribución
- Gráficos de barras para comparaciones
- Datos en tiempo real desde la API

## 🐛 Troubleshooting

### Problemas Comunes

1. **Error de conexión a la API**
   - Verificar la URL en `config.js`
   - Comprobar conectividad de red
   - Validar certificados SSL

2. **Problemas de autenticación**
   - Limpiar AsyncStorage
   - Verificar formato de credenciales
   - Comprobar encriptación

3. **Errores de build**
   - Limpiar cache: `expo r -c`
   - Reinstalar dependencias: `rm -rf node_modules && npm install`
   - Verificar versiones de dependencias


## 👥 Equipo de Desarrollo

- **Desarrollador Principal**: Antonio
- **Tipo de Proyecto**: Tesis de grado - Aplicación móvil empresarial
- **Área de Investigación**: Optimización de procesos en vitivinícolas medianas
- **Estado**: En desarrollo (no está online)
- **Objetivo Académico**: Demostrar la mejora en eficiencia operacional mediante centralización de información


---

**Nota**: Esta aplicación móvil funciona en conjunto con una página web administrativa y requiere acceso al backend compartido para sincronizar datos. El sistema completo incluye detección automática de errores en etiquetas mediante inteligencia artificial entrenada específicamente para la industria vitivinícola.