Plataforma de Mensajes AI
Este proyecto es una interfaz de visualización de mensajes entre usuarios y una IA, creada con Next.js 14, React y TypeScript. Permite buscar, copiar y navegar por los mensajes de manera accesible y responsive.

Instrucciones de Instalación
Clonar el repositorio:

bash
Copy
Edit
git clone https://github.com/f3l3p1/AI-Messaging-Platform
cd ai-messaging-platform % 

Instalar dependencias:

bash
Copy
Edit
npm install
Ejecutar el servidor de desarrollo:

bash
Copy
Edit
npm run dev
Abrir la aplicación en:
http://localhost:3000

Suposiciones
La API externa (/api/messages) devuelve mensajes con el siguiente formato:

json
Copy
Edit
{
  "id": "1",
  "bot_sender": 1,
  "message_text": "¡Hola!",
  "message_date": "2024-02-29T15:10:512Z"
}
Los mensajes se agrupan por fecha en:

Hoy
Ayer
Esta semana
Fechas anteriores
Características Implementadas
Requisitos básicos:

Obtiene mensajes a través de una ruta API de Next.js.
Agrupa mensajes por fecha.
Diferencia visualmente entre mensajes de IA y del usuario.
Muestra las fechas de manera legible.
Diseño responsive (móvil, tablet y escritorio).
Botón para ir al final de la conversación.
Encabezados de fecha fijos mientras se desplaza.
Extras:

Navegación con teclado: Usa las flechas arriba y abajo.
Buscar mensajes: Filtra mensajes con una barra de búsqueda.
Copiar mensajes: Copia el contenido del mensaje al portapapeles.
Accesibilidad: Soporte para lectores de pantalla con etiquetas ARIA.
Decisiones Técnicas
Next.js 14: Por su optimización de rendimiento y manejo de rutas modernas.
TypeScript: Garantiza seguridad en los tipos y reduce errores.
date-fns: Para manejar y comparar fechas de manera eficiente.
Limitaciones o Mejoras Futuras
Paginación: Agregar paginación para listas largas de mensajes.
Enlace entre mensajes: Mejorar el flujo de conversaciones enlazadas.
Errores: Mejorar los mensajes de error y añadir mecanismos de reintento.
Interfaz: Añadir más animaciones y mejoras visuales.
