# 🧪 Fullstack Template for Django, Angular, and Docker Applications

🌐 Read this in: [Español](README.es.md)

This repository is a ready-to-use template that integrates **Django** (backend) and **Angular with Angular Material** (frontend), all orchestrated with **Docker** and **Docker Compose**. It's ideal for starting projects with built-in user authentication (registration and login), background tasks, and a modern, production-ready structure.

Includes:

- 🔧 Backend with Django + Django REST Framework
- 🎨 Frontend with Angular + Angular Material
- 🐳 Dockerized environment
- 🐘 PostgreSQL database
- 📬 Task queue with Celery + Redis
- ✅ CI/CD workflows with GitHub Actions

---

## 🚀 Requirements

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## ⚙️ Initial Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/danipineiro/fullstack-django-angular
    cd fullstack-django-angular
    ```

2. Copy the environment variables file and edit it if needed:
    ```bash
    cp .env.example .env
    ```

3. Build and start the containers:
    ```bash
    docker-compose up --build
    ```

4. Access the frontend at [http://localhost:4200](http://localhost:4200)  
   The backend will be available at [http://localhost:8000](http://localhost:8000)

---

## 🔐 Implemented Features

- User registration
- Login with JWT authentication
- Session management from the frontend
- Route protection in Angular

---

## ✅ Continuous Integration

This project uses **GitHub Actions** to:

- Check code formatting:
  - **Black** for Python
  - **Prettier** for Angular and TypeScript
- Run automated tests (Pytest)
- Validate the full Docker environment build
- Automatically deploy to production (optional)

---

## 🚀 Continuous Delivery to AWS

When you push to the `master` branch (staging environment) or create a tag starting with `v*` (production environment), the workflow will:

- Run code and test validations
- Build the Docker image for the backend
- Push it automatically to an Amazon ECR repository

- It uses the `latest` tag for staging and the tag name for production.

This allows for having Docker images ready for automatic deployment in an AWS environment.

> 💡 The workflow uses [`aws-actions/configure-aws-credentials`](https://github.com/aws-actions/configure-aws-credentials) and [`aws-actions/amazon-ecr-login`](https://github.com/aws-actions/amazon-ecr-login) to authenticate and push the image to the container registry.

---

## 📦 Technologies

| Technology            | Purpose                  |
|-----------------------|---------------------------|
| Django                | Backend                   |
| Django REST Framework | REST API                  |
| Dj-Rest-Auth          | Authentication            |
| Celery                | Asynchronous tasks        |
| Redis                 | Message broker for Celery |
| Angular               | Frontend SPA              |
| Angular Material      | UI components             |
| PostgreSQL            | Database                  |
| Docker                | Containers                |
| GitHub Actions        | CI/CD                     |

---

## 📄 License

This project is licensed under the MIT License.  
You are free to use it as a base for your own apps.

---

## 🙌 Author

Made with ❤️ in Galicia by [Daniel Piñeiro](https://www.linkedin.com/in/dpineiro/).
