
## Refatoração: Contexto Local & Banco Local

### Modelos de Dados Atuais

#### Exercise
```
{
	id: number;
	number: number;
	name: string;
}
```

#### WorkoutExercise
```
{
	exerciseId: number;
	exerciseNumber: number;
	exerciseName: string;
	order: number;
	sets: number;
	reps: number;
	weight: number;
	completed: boolean;
}
```

#### WorkoutTemplate
```
{
	id?: number;
	name: string;
	exercises: WorkoutExercise[];
	intervalSeconds?: number;
}
```

#### WorkoutSession
```
{
	id?: number;
	templateId: number;
	templateName: string;
	startTime: Date;
	endTime: Date;
	duration: number;
	exercises: WorkoutExercise[];
}
```

---
Etapas seguintes: mapear dependências de contexto global, planejar migração para contexto local e persistência Dexie.js/IndexedDB.
