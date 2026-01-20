
Ciclo de um exercicio
1. NÃO INICIADO → [Começar]
2. EM EXECUÇÃO (série ativa) → [Pausar] [Finalizar Série]
3. PAUSADO (durante série) → [Retomar] [Finalizar Série]
4. DESCANSANDO (entre séries) → [Pausar Descanso] [Pular Descanso] + ⏱️ Timer
5. FINALIZADO (todas séries) → ✅ Completo

possível arquitetura clean


FSD

Feature-Sliced Design (FSD) is a modern architectural methodology for organizing front-end application code around features and business domains rather than technical concerns (e.g., grouping all components in a single components folder). It provides a standardized structure to make large-scale projects more maintainable, scalable, and easier to understand for new team members. 
Core Principles
FSD structures an application into a hierarchy of layers, slices, and segments, with strict rules governing dependencies. 
Layers: Standardized, hierarchical divisions of the application by scope of influence (top-down dependency flow).
Slices: Partition layers by business domain or feature, such as "user," "product," or "cart". Slices on the same layer cannot import from each other.
Segments: Organize code within a slice by technical purpose, e.g., UI components, business logic (model), or API interactions. 
The FSD Layers
Layers are arranged from top to bottom, and code in an upper layer can import from layers below it, but not from the same layer or layers above. 
app: Application initialization, routing, global styles, and providers.
pages: The application's pages or screens, which primarily compose components from lower layers.
widgets: Large, independent UI blocks, like a header, sidebar, or news feed, that combine features and entities.
features: Implementations of specific user interactions that provide business value (e.g., "add-to-cart," "user-authentication").
entities: Core business entities and their models (e.g., user, product, comment), containing the related logic and UI representations.
shared: Reusable, project-agnostic utilities, UI kits, API clients, and helper functions. This layer forms the foundation and has no business logic. 
Benefits
Scalability: The modular, isolated structure naturally accommodates growth and makes it easier for multiple teams to work in parallel.
Maintainability: Isolated features and explicit dependencies reduce the risk of unintended side effects when modifying code.
Readability: The standardized structure and business-oriented naming make it intuitive for developers to find code related to a specific feature or domain.
Controlled Reusability: Enforces a balance between the DRY (Don't Repeat Yourself) principle and local customization by defining clear boundaries for shared logic. 