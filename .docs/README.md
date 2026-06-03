# Informe de Refactorización: Aplicación de Clean Architecture

## Identificación del Grupo
* **Integrante 1:** Javier Montiel
* **Integrante 2:** Jenniffer Urrutia

---

## 1. Problemas e Incongruencias Arquitectónicas Identificadas

Al analizar el código fuente original provisto en el repositorio base, se identificaron las siguientes falencias estructurales que violaban los principios de diseño de software y las buenas prácticas de arquitectura:

* **Acoplamiento Fuerte con el ORM (Prisma):** Los servicios originales interactuaban de forma directa con `PrismaService`. Esto generaba una dependencia directa de la lógica de negocio hacia la tecnología de persistencia, violando el principio de que los detalles tecnológicos no deben dirigir el diseño del software.
* **Violación del Principio de Inversión de Dependencia (DIP):** Las capas de nivel superior (lógica de negocio) dependían directamente de módulos de bajo nivel (infraestructura de base de datos). Al no existir abstracciones o interfaces intermedias, el código se volvía rígido, difícil de testear mediante dobles de prueba (mocks) y altamente vulnerable a cambios en el esquema de datos.
* **Falta de Abstracción en Entidades:** Los datos que fluían por la aplicación dependían de los tipos autogenerados por el cliente de Prisma, en lugar de utilizar clases de dominio propias que representaran las reglas y restricciones del negocio de forma pura.
* **Estructura de Carpetas Difusa:** Si bien el proyecto original presentaba cierta separación por componentes (módulos como `posts`, `comments`, etc.), dentro de cada módulo las responsabilidades de transporte, lógica y persistencia estaban mezcladas en archivos con un alto nivel de acoplamiento.

---

## 2. Solución Aplicada: Estructura de Clean Architecture

Para solventar las problemáticas anteriores, se reestructuró el servidor aplicando **Clean Architecture organizada por componentes** (Screaming Architecture). Cada módulo del sistema (`categories`, `comments`, `likes`, `moderation`, `posts`) fue dividido internamente en tres capas con límites claros y unidireccionales:

### A. Capa de Dominio (Domain)
Es el núcleo del sistema y es completamente pura (TypeScript nativo sin frameworks ni librerías externas). Contiene:
* **Entidades (`.entity.ts`):** Clases planas que definen la estructura e identidad de los objetos del negocio.
* **Contratos/Interfaces de Repositorios (`.repository.ts`):** Interfaces que declaran los métodos de persistencia que el negocio necesita, delegando la implementación real a la capa externa.

### B. Capa de Aplicación (Application)
Orquesta el comportamiento del sistema. Contiene:
* **Casos de Uso (`.use-case.ts`):** Clases que implementan la lógica de negocio específica (ej. `CreatePostUseCase`, `ReportContentUseCase`). Estos casos de uso **inyectan las interfaces del dominio** a través de sus constructores, respetando estrictamente la inversión de dependencias.

### C. Capa de Infraestructura (Infrastructure)
Maneja las herramientas tecnológicas y los adaptadores externos. Contiene:
* **Controladores:** Adaptadores de NestJS encargados de recibir las peticiones HTTP, validar los datos de entrada y llamar al Caso de Uso correspondiente.
* **Repositorios de Persistencia (`prisma-*.repository.ts`):** Implementaciones concretas que utilizan el cliente de `PrismaService` para interactuar con la base de datos real, cumpliendo de manera estricta con las interfaces definidas en la capa de dominio.

---

## 3. Diagrama de Clases (Arquitectura del Servidor)

El siguiente diagrama detalla cómo se estructuró la relación entre componentes para desacoplar la lógica de la infraestructura tecnológica, asegurando que las dependencias apunten siempre hacia el interior (Dominio):

```mermaid
classDiagram
    class Controller {
        <<NestJS Adapter HTTP>>
        -useCase: UseCase
        +execute(dto)
    }
    
    class UseCase {
        <<Application Logic>>
        -repository: IRepository
        +execute(data)
    }
    
    class IRepository {
        <<Domain Interface>>
        +find(id)
        +save(entity)
    }
    
    class PrismaRepository {
        <<Infrastructure Persistence>>
        -prismaService: PrismaService
        +find(id)
        +save(entity)
    }
    
    class Entity {
        <<Domain Entity>>
        +id: string
    }

    Controller --> UseCase : Invoca el caso de uso
    UseCase --> IRepository : Depende de la abstracción
    UseCase ..> Entity : Utiliza datos puros
    PrismaRepository ..|> IRepository : Implementa el contrato
    PrismaRepository ..> Entity : Mapea datos hacia