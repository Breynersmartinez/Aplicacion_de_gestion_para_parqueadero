# Aplicaci-n-de-gesti-n-para-parqueadero
Este proyecto consiste en un sistema desarrollado para optimizar la gestión de vehículos y usuarios de un parqueadero, se utilizaron tecnologías, en fornt end como angular, JavaScript, TypeScript, html y css y backend Java y Springboot.
https://parzibyte.me/blog/wp-content/uploads/2022/05/Software-para-parqueadero-Configurar-tarifas-de-cobro.png


Paso 1: Instalar Angular CLI
Angular CLI (Command Line Interface) es una herramienta de línea de comandos que facilita la creación y gestión de proyectos en Angular. Abre tu terminal y ejecuta el siguiente comando para instalar Angular CLI de forma global:

npm install -g @angular/cli
Una vez completada la instalación, verifica que Angular CLI se haya instalado correctamente ejecutando el siguiente comando:

ng version
Paso 2: Crear un nuevo proyecto
Ahora que tienes Angular CLI instalado, puedes crear un nuevo proyecto Angular. Ejecuta el siguiente comando en tu terminal:

ng new mi-proyecto-angular
Esto creará un nuevo directorio llamado “mi-proyecto-angular” y generará la estructura inicial del proyecto.

Paso 3: Navegar al directorio del proyecto
Entra al directorio del proyecto recién creado utilizando el siguiente comando:

cd mi-proyecto-angular
Paso 4: Iniciar el servidor de desarrollo
Una vez que estés dentro del directorio del proyecto, ejecuta el siguiente comando para iniciar el servidor de desarrollo de Angular:

ng serve
Esto compilará tu proyecto y lo ejecutará en un servidor local. Abre tu navegador web y navega a http://localhost:4200. Ahí podrás ver tu aplicación Angular en funcionamiento.

Paso 5: Crear un componente
Los componentes son los bloques de construcción fundamentales en Angular. Puedes crear un componente utilizando el siguiente comando:

ng generate component nombre-del-componente
Esto generará automáticamente los archivos necesarios para tu nuevo componente, incluyendo el archivo de TypeScript, la plantilla HTML y el archivo de estilos CSS.

Paso 6: Configurar rutas
Las rutas te permiten navegar entre diferentes componentes en tu aplicación. Para configurar las rutas, abre el archivo app-routing.module.ts y agrega las siguientes líneas de código:

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
Esto configurará las rutas para dos componentes: “HomeComponent” y “AboutComponent”. Asegúrate de crear estos componentes y sus respectivas plantillas correspondientes.

Paso 7: Agregar contenido a los componentes
Ahora puedes agregar contenido a tus componentes recién creados. Abre los archivos de componentes (nombre-del-componente.component.ts, nombre-del-componente.component.html y nombre-del-componente.component.css) y personalízalos según tus necesidades. Puedes agregar texto, imágenes, enlaces y mucho más.

Paso 8: Ejecutar la aplicación
Una vez que hayas terminado de agregar contenido a tus componentes, guarda los archivos y vuelve a tu terminal. Asegúrate de que el servidor de desarrollo de Angular siga en ejecución. Si no es así, ejecuta el siguiente comando nuevamente:

ng serve
Luego, abre tu navegador y visita http://localhost:4200. Podrás ver tu aplicación Angular con los componentes y rutas que has creado.

¡Felicidades! Has creado tu primer proyecto en Angular desde cero. Ahora puedes seguir explorando y aprendiendo más sobre este poderoso framework.

Resumen y recomendaciones
En este artículo, aprendiste cómo crear un proyecto en Angular desde cero. Cubrimos los pasos fundamentales, desde la instalación de Angular CLI hasta la configuración de rutas y la creación de componentes. Aquí hay algunas recomendaciones finales:

Familiarízate con la estructura de archivos generada por Angular CLI. Te ayudará a organizar tu proyecto de manera eficiente.
Explora la documentación oficial de Angular (https://angular.io) para conocer más sobre las características y capacidades del framework.
Practica construyendo diferentes componentes y experimenta con las diversas funcionalidades de Angular.
Únete a la comunidad de Angular y participa en foros y grupos de discusión. Es una excelente manera de aprender de otros desarrolladores y compartir tus conocimientos.
¡Ahora estás listo para comenzar a construir tus propios proyectos en Angular! Disfruta del viaje y continúa aprendiendo.
