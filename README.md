# 🧪 Plantilla para aplicaciones fullstack con Django, Angular y Docker

Este repositorio es una plantilla lista para usar que integra **Django** (backend) y **Angular con Angular Material** (frontend), todo orquestado con **Docker** y **Docker Compose**. Ideal para iniciar proyectos con autenticación de usuarios ya implementada (registro y login).

Incluye:

- 🔧 Backend con Django + Django REST Framework
- 🎨 Frontend con Angular + Angular Material
- 🐳 Entorno Dockerizado
- 🐘 Base de datos PostgreSQL
- ✅ Workflows de CI con GitHub Actions

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
