# 🏋️ Gym Profile - Instruções para GitHub Copilot

## 📋 Sobre o Projeto

Aplicação web de checklist para treinos de academia desenvolvida com Next.js, TypeScript, Tailwind CSS e DaisyUI. Sistema cliente-side com armazenamento local via Dexie.js (IndexedDB).

## 🎯 Objetivo

Gerenciar treinos de academia permitindo:
- Visualizar exercícios em formato checklist com ordem, séries, repetições e carga
- Editar exercícios inline (trocar aparelho, ajustar séries/reps/carga) com confirmação
- Salvar histórico completo de treinos executados com timestamps
- Exportar dados (futuro)

## ��️ Arquitetura

### Stack Tecnológico
- **Framework**: Next.js 14+ com App Router
- **Linguagem**: TypeScript (strict mode)
- **Estilização**: Tailwind CSS + DaisyUI
- **Estado**: Zustand
- **Banco de Dados**: Dexie.js (wrapper IndexedDB)
- **Componentes**: react-select para selects com busca

### Estrutura de Pastas
```
/app
  page.tsx                    # Interface principal
  layout.tsx
/components
  /workout
    ExerciseCard.tsx          # Card com modo visualização/edição
    SearchableExerciseSelect.tsx  # Select com busca de exercícios
    WorkoutChecklist.tsx      # Lista completa de exercícios
    ConfirmModal.tsx          # Modal de confirmação DaisyUI
/lib
  db.ts                       # Schema e setup Dexie.js
  types.ts                    # Tipos TypeScript
  seedData.ts                 # Dados iniciais (67 exercícios + templates)
  exportData.ts               # Utilitário de exportação
/stores
  workoutStore.ts             # Zustand store
```

## 📊 Modelo de Dados

### Tabelas Dexie.js

**exercises**
- `id`: number (auto-increment)
- `number`: number (1-67)
- `name`: string

**workoutTemplates**
- `id`: number (auto-increment)
- `name`: string ("Treino A", "Treino B")
- `exercises`: WorkoutExercise[]

**workoutSessions** (com index em `startTime`)
- `id`: number (auto-increment)
- `templateId`: number
- `templateName`: string
- `startTime`: Date
- `endTime`: Date
- `duration`: number (minutos)
- `exercises`: WorkoutExercise[] (snapshot completo)

### Tipos TypeScript

```typescript
Exercise {
  id: number
  number: number  // 1-67
  name: string
}

WorkoutExercise {
  exerciseId: number
  exerciseNumber: number
  exerciseName: string
  order: number
  sets: number
  reps: number
  weight: number  // aceita decimais (ex: 7.5)
  completed: boolean
}

WorkoutTemplate {
  id: number
  name: string
  exercises: WorkoutExercise[]
}

WorkoutSession {
  id: number
  templateId: number
  templateName: string
  startTime: Date
  endTime: Date
  duration: number
  exercises: WorkoutExercise[]
}
```

## 🎨 Componentes e Fluxo

### ExerciseCard
- **Modo Visualização**: ordem, número/nome exercício, séries/reps, carga kg, checkbox, botão "Editar"
- **Modo Edição**: inputs editáveis (sets, reps, weight decimal), SearchableExerciseSelect para trocar exercício, botões "OK"/"Cancelar"
- **Ao clicar OK**: abrir ConfirmModal perguntando se deseja alterar template original

### SearchableExerciseSelect
- Carrega 67 exercícios de `db.exercises`
- Exibe formato: "Nº - Nome" (ex: "01 - Pulley Alto")
- Busca por número ou nome (debounced)
- Integrado com DaisyUI styling

### WorkoutChecklist
- Lista de ExerciseCards ordenados
- Barra de progresso (X/8 exercícios completados)
- Botão "Finalizar Treino"

### Página Principal
- Seletor de treino (A/B)
- Ao selecionar: carrega template, salva `startTime`, reseta checkboxes
- Renderiza WorkoutChecklist
- Botão "Finalizar Treino": calcula duration, salva snapshot completo em `workoutSessions`

## 📦 Dados Iniciais

### 67 Aparelhos
Números 1-67 com nomes específicos (Pulley Alto, Vertical Traction, Remada Simetria, etc.)

### Treino A - Membros Superiores (8 exercícios)
Intervalo: 40s | Duração: 40min
1. #17 Supino Vertical - 3×15
2. #13 Pec Deck - 3×15
3. #01 Pulley Alto - 3×12
4. #07 Remada Baixa - 3×12
5. #04 Remada Simetria - 3×10
6. #24 Tríceps Barra - 3×10
7. #21 Cross Over - 3×8
8. #05 Elevação Lateral - 3×8

### Treino B - Pernas e Core (8 exercícios)
Intervalo: 40s | Duração: 40min
1. #44 Leg Horizontal - 3×15
2. #36 Cadeira Extensora - 3×15
3. #40 Mesa Flexora - 3×12
4. #45 Cadeira Abdutora - 3×12
5. #46 Cadeira Adutora - 3×10
6. #64 Máquina Lombar - 3×10
7. #62 Panturrilha em Pé - 3×8
8. #61 Banco Panturrilha - 3×8

## ⚙️ Regras de Implementação

### Código
- Usar `"use client"` em componentes interativos
- TypeScript strict mode
- Validação de peso: aceitar decimais (type="number" step="0.5")
- Persistência automática após confirmação

### Edição de Exercícios
- Edição inline modifica template original
- Sempre solicitar confirmação antes de salvar
- Modal deve ter mensagem clara: "Deseja salvar alterações no template original?"

### Histórico
- Salvar snapshot completo do treino (não apenas referência)
- Incluir timestamp início/fim e calcular duração
- Preservar integridade: se template mudar depois, histórico mantém dados originais

### Exportação (futuro)
- Estrutura JSON versionada: `{ version: "1.0", exportDate, exercises[], templates[], sessions[] }`
- Usar `db.exercises.toArray()`, `db.workoutTemplates.toArray()`, `db.workoutSessions.toArray()`

## 🚫 O Que NÃO Fazer

- ❌ Não implementar undo de edições ainda
- ❌ Não criar interface de visualização de histórico ainda (apenas salvar)
- ❌ Não adicionar timer de intervalo entre exercícios
- ❌ Não usar LocalStorage (capacidade insuficiente)
- ❌ Não separar sessões e templates em páginas diferentes (tudo na mesma tela)

## 📝 Convenções

### Nomenclatura
- Componentes: PascalCase
- Hooks: useCamelCase
- Variáveis: camelCase
- Constantes: UPPER_SNAKE_CASE

### Commits
- feat: nova funcionalidade
- fix: correção
- refactor: refatoração
- style: estilização
- docs: documentação

### Idioma
- Interface: Português (PT-BR)
- Código: Inglês (variáveis, funções, tipos)
- Comentários: Português quando necessário

## 🔮 Funcionalidades Futuras (não implementar ainda)

- Visualização de histórico com gráficos
- Múltiplos templates (C, D, E...)
- Importar/exportar dados
- Calendário de treinos
- Estatísticas de progresso
- Sincronização na nuvem
- Timer de descanso entre exercícios
- Notas por exercício
- Fotos/vídeos de execução
