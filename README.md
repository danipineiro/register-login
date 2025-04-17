# 🧪 Plantilla para aplicaciones fullstack con Django, Angular y Docker

Este repositorio es una plantilla lista para usar que integra **Django** (backend) y **Angular con Angular Material** (frontend), todo orquestado con **Docker** y **Docker Compose**. Ideal para iniciar proyectos con autenticación de usuarios ya implementada (registro y login), tareas en segundo plano y una estructura moderna lista para producción.

Incluye:

- 🔧 Backend con Django + Django REST Framework
- 🎨 Frontend con Angular + Angular Material
- 🐳 Entorno Dockerizado
- 🐘 Base de datos PostgreSQL
- 📬 Cola de tareas con Celery + Redis
- ✅ Workflows de CI/CD con GitHub Actions

---

## 🚀 Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ⚙️ Configuración inicial

1. Clona el repositorio:
    ```bash
    git clone https://github.com/danipineiro/register-login
    cd register-login
    ```

2. Copia el archivo de variables de entorno y edítalo si es necesario:
    ```bash
    cp .env.example .env
    ```

3. Construye y levanta los contenedores:
    ```bash
    docker-compose up --build
    ```

4. Accede al frontend en [http://localhost:4200](http://localhost:4200)  
   El backend estará disponible en [http://localhost:8000](http://localhost:8000)

---

## 🔐 Funcionalidades implementadas

- Registro de usuarios
- Inicio de sesión con autenticación JWT
- Gestión de sesiones desde el frontend
- Protección de rutas en Angular

---

## ✅ Integración continua

Este proyecto utiliza **GitHub Actions** para:

- Verificar el formato del código (Black para Python)
- Ejecutar tests automáticos (Pytest)
- Validar la build completa del entorno Docker
- Desplegar automáticamente en producción (opcional)

---
## 🚀 Entrega continua a AWS
Cuando haces push a la rama master (entorno staging), o creas un tag con formato v* (entorno production), el workflow:

- Verifica el código y tests.
- Construye la imagen Docker del backend.
- La sube automáticamente a un repositorio en Amazon ECR.

- Usa etiquetas latest para staging y el nombre del tag para production.

Esto permite tener imágenes preparadas para ser desplegadas automáticamente en un entorno AWS.

> 💡 El workflow usa aws-actions/configure-aws-credentials y amazon-ecr-login para autenticarse y subir la imagen al registro.

---

## 📦 Tecnologías

| Tecnología            | Uso           |
|-----------------------|---------------|
| Django                | Backend       |
| Django REST Framework | REST API      |
| Dj-Rest-Auth          | Autenticación |
| Celery                | Tareas asíncronas         |
| Redis                 | Cola de mensajes para Celery |
| Angular               | Frontend SPA  |
| Angular Material      | UI components |
| PostgreSQL            | Base de datos |
| Docker                | Contenedores  |
| GitHub Actions        | CI/CD         |

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT.  
Puedes usarlo libremente como base para tus propias apps.

---

## 🙌 Autor

Creado con cariño desde Galicia por [Daniel Piñeiro](https://www.linkedin.com/in/dpineiro/).