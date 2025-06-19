# Proceso de Extracción y Estructuración de Planes Curriculares

## 🚀 1. Objetivo y Prompt Inicial

Mi misión comenzó con el siguiente reto:

**Extraer toda la información curricular relevante de los planes en PDF** y convertirla en un formato estructurado y fácil de usar (JSON), siguiendo una lógica clara y completa.

- **Campos requeridos:**
    - Grado
    - Año
    - Áreas
        - Objetivos
        - Contenidos
            - Temas y subtemas
            - Conceptual, Procedimental, Actitudinal, Actividades, Indicadores

**Reglas clave:**

- No omitir información.
- No usar “ver documento original”.
- Seguir siempre la estructura pedida en el prompt inicial.

---

## 🧠 2. Diseño del Proceso

Dividí el trabajo en fases bien definidas para asegurar precisión y exhaustividad:

### 🔍 a) Mapeo Estructural

1. Identifiqué las **áreas principales** del currículo.
2. Extraje **temas y subtemas** de cada área, creando primero una estructura básica en JSON.

### 🏗️ b) Desarrollo Profundo

1. Agregué, tema por tema, los campos:
    - Conceptual
    - Procedimental
    - Actitudinal
    - Actividades
    - Indicadores
2. Respeté la **jerarquía y anidamiento** cuando los planes usaban subtemas.

### 🔄 c) Iteración Documento por Documento

1. Repetí el proceso para los dos documentos enviados (octavo y duodécimo grado), adaptando la estructura según la organización y profundidad de cada plan.

### 🛠️ d) Estrategias para Precisión

- Consulté índices temáticos, cuadros y diagramas, y el cuerpo del texto.
- Usé lenguaje técnico y fiel al plan, solo ajustando formato y estructura.

---

## 🔄 3. Flujo de Trabajo

1. **Definición del modelo JSON** (basado en el prompt).
2. **Carga y lectura de PDFs**.
3. **Extracción progresiva:**
    - Estructura básica de áreas y temas.
    - Profundización agregando los cinco campos por tema y subtema.
    - Validación constante con el usuario.
4. **Repetición para ambos grados** y ajustes por sugerencia del usuario.
5. **Síntesis y entrega** de bloques JSON completos.

---

## 🗂️ 4. Formato y Estructura de Datos

La estructura jerárquica JSON que utilicé fue:

```json
[
  {
    "grado": "…",
    "año": "…",
    "areas": [
      {
        "area": "…",
        "objetivos": [ … ],
        "contenidos": [
          {
            "tema": "…",
            "subtemas": [ … ],
            "conceptual": "…",
            "procedimental": "…",
            "actitudinal": "…",
            "actividades": [ … ],
            "indicadores": [ … ]
          }
        ]
      }
    ]
  }
]

```