---
name: Deuda técnica
about: Documenta una deuda técnica detectada para su posterior resolución.
title: ''
labels: ''
assignees: ''

---

---
name: 💸 Deuda Técnica
about: Documenta una deuda técnica detectada para su posterior resolución.
title: '[TechDebt] Breve descripción del problema'
labels: [tech-debt]
---

### 📌 Descripción del problema técnico

Describe brevemente la deuda técnica identificada. ¿Qué parte del código o arquitectura está implicada y por qué se considera deuda técnica?

---

### 🔍 Contexto

Explica por qué existe esta deuda (decisión técnica temporal, falta de tiempo, solución provisional, etc.) y cómo afecta al proyecto actual o futuro.

---

### 🎯 Impacto

Marca lo que aplique:

- [ ] Dificulta nuevos desarrollos
- [ ] Ralentiza el mantenimiento
- [ ] Aumenta la complejidad del código
- [ ] Potencial fuente de bugs
- [ ] Otro: _especificar_

---

### 🛠️ Propuesta de solución

Sugiere cómo podría resolverse esta deuda técnica. Si aún no hay una solución clara, indica qué opciones o investigaciones serían necesarias.

---

### ⏳ Estimación de esfuerzo

Selecciona una opción:

- [ ] < 1 hora  
- [ ] 1–4 horas  
- [ ] 1 día  
- [ ] Varias jornadas  
- [ ] Requiere investigación

---

### 📎 Archivos o áreas afectadas

Enumera rutas o módulos relevantes (por ejemplo):  
`/src/app/services/form-validator.service.ts`

---

### ✅ Criterios de aceptación

- [ ] La solución elimina o reduce significativamente la deuda  
- [ ] Se han añadido tests si es necesario  
- [ ] Se ha documentado el cambio (código, READM
