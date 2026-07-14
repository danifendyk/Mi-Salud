import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import {
  Activity,
  CalendarDays,
  Check,
  ChefHat,
  ChevronRight,
  CircleUserRound,
  Coffee,
  Download,
  Droplets,
  Dumbbell,
  Ellipsis,
  ExternalLink,
  Flame,
  LayoutDashboard,
  Moon,
  Plus,
  Scale,
  Settings,
  ShoppingBasket,
  Sparkles,
  Target,
  Timer,
  TrendingDown,
  Upload,
  UtensilsCrossed,
  X,
} from 'lucide-react'
import {
  calorieGoal,
  proteinGoal,
  recipes,
  shoppingList,
  waterGoal,
  weeklyPlan,
  workoutA,
  workoutB,
} from './data'
import type { Exercise, Recipe, WeightEntry } from './data'
import './App.css'

const WeightChart = lazy(() => import('./WeightChart'))

type View = 'inicio' | 'comidas' | 'compras' | 'gym' | 'progreso' | 'mas'

interface Snapshot {
  weightEntries: WeightEntry[]
  water: number
  completedMeals: string[]
  completedExercises: string[]
  checkedShopping: string[]
}

const navItems = [
  { id: 'inicio' as const, label: 'Inicio', icon: LayoutDashboard },
  { id: 'comidas' as const, label: 'Comidas', icon: UtensilsCrossed },
  { id: 'compras' as const, label: 'Compras', icon: ShoppingBasket },
  { id: 'gym' as const, label: 'Gym', icon: Dumbbell },
  { id: 'progreso' as const, label: 'Progreso', icon: TrendingDown },
]

function todayKey() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function formatDate(date: string, options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }) {
  return new Intl.DateTimeFormat('es-AR', options).format(new Date(`${date}T12:00:00`))
}

function useStoredState<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = window.localStorage.getItem(key)
      return saved ? (JSON.parse(saved) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

function downloadFile(content: string, filename: string, type: string) {
  const link = document.createElement('a')
  link.href = URL.createObjectURL(new Blob([content], { type }))
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(link.href)
}

function icsDate(date: Date) {
  const pad = (value: number) => String(value).padStart(2, '0')
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}00`
}

function nextWeekday(day: number, hour: number) {
  const date = new Date()
  const daysAhead = (day - date.getDay() + 7) % 7 || 7
  date.setDate(date.getDate() + daysAhead)
  date.setHours(hour, 0, 0, 0)
  return date
}

function createCalendar() {
  const workoutDate = nextWeekday(1, 18)
  const prepDate = nextWeekday(0, 17)
  const weightDate = new Date()
  weightDate.setDate(weightDate.getDate() + 1)
  weightDate.setHours(8, 0, 0, 0)
  const calendar = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//MI SALUD//ES',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    'UID:mi-salud-peso@local',
    `DTSTART:${icsDate(weightDate)}`,
    'RRULE:FREQ=DAILY',
    'SUMMARY:MI SALUD · Registrar peso',
    'DESCRIPTION:Pesate al despertar y registrá el valor en MI SALUD.',
    'BEGIN:VALARM',
    'TRIGGER:-PT5M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Registrar peso',
    'END:VALARM',
    'END:VEVENT',
    'BEGIN:VEVENT',
    'UID:mi-salud-gym@local',
    `DTSTART:${icsDate(workoutDate)}`,
    'RRULE:FREQ=WEEKLY;BYDAY=MO,WE,FR',
    'SUMMARY:MI SALUD · Gimnasio',
    'DESCRIPTION:Entrenamiento A/B de MI SALUD.',
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Prepararte para ir al gimnasio',
    'END:VALARM',
    'END:VEVENT',
    'BEGIN:VEVENT',
    'UID:mi-salud-prep@local',
    `DTSTART:${icsDate(prepDate)}`,
    'RRULE:FREQ=WEEKLY;BYDAY=SU',
    'SUMMARY:MI SALUD · Organizar comidas',
    'DESCRIPTION:Revisá la lista de compras y dejá comidas listas.',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    'DESCRIPTION:Organizar comidas',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  downloadFile(calendar, 'mi-salud-recordatorios.ics', 'text/calendar')
}

function MetricRing({ value, goal, label, unit, color }: { value: number; goal: number; label: string; unit: string; color: string }) {
  const percentage = Math.min((value / goal) * 100, 100)
  return (
    <div className="metric-ring" style={{ background: `conic-gradient(${color} ${percentage}%, #e9eee4 ${percentage}% 100%)` }}>
      <div className="metric-ring__inner">
        <strong>{value.toLocaleString('es-AR')}</strong>
        <span>{unit}</span>
      </div>
      <p>{label}</p>
    </div>
  )
}

function RecipeCard({ recipe, completed, expanded, onToggle, onExpand }: { recipe: Recipe; completed: boolean; expanded: boolean; onToggle: () => void; onExpand: () => void }) {
  return (
    <article className={`recipe-card ${completed ? 'recipe-card--done' : ''}`}>
      <div className="recipe-card__top">
        <span className="eyebrow">{recipe.slot}</span>
        <span className="recipe-time"><Timer size={14} /> {recipe.time}</span>
      </div>
      <h3>{recipe.title}</h3>
      <p>{recipe.description}</p>
      <div className="recipe-macros">
        <span><Flame size={15} /> {recipe.calories} kcal</span>
        <span>{recipe.protein} g proteína</span>
      </div>
      {expanded && (
        <div className="recipe-details">
          <div>
            <h4>Ingredientes</h4>
            <ul>{recipe.ingredients.map((ingredient) => <li key={ingredient}>{ingredient}</li>)}</ul>
          </div>
          <div>
            <h4>Cómo hacerlo</h4>
            <ol>{recipe.steps.map((step) => <li key={step}>{step}</li>)}</ol>
          </div>
          <div>
            <h4>Podés cambiar</h4>
            <ul>{recipe.substitutions.map((substitution) => <li key={substitution}>{substitution}</li>)}</ul>
          </div>
          <div>
            <h4>Tips de cocina</h4>
            <ul>{recipe.beginnerTips.map((tip) => <li key={tip}>{tip}</li>)}</ul>
          </div>
        </div>
      )}
      <div className="recipe-actions">
        <button className="text-button" type="button" onClick={onExpand}>{expanded ? 'Cerrar receta' : 'Ver receta'} <ChevronRight size={16} /></button>
        <button className={`check-button ${completed ? 'check-button--done' : ''}`} type="button" onClick={onToggle}>
          <Check size={16} /> {completed ? 'Registrada' : 'Registrar'}
        </button>
      </div>
    </article>
  )
}

function ExerciseModal({ exercise, onClose }: { exercise: Exercise; onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="exercise-modal" role="dialog" aria-modal="true" aria-label={exercise.name} onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Cerrar"><X size={20} /></button>
        <span className="eyebrow">Técnica guiada</span>
        <h2>{exercise.name}</h2>
        {exercise.model ? (
          <div className="model-viewer">
            <iframe src={exercise.model.embedUrl} title={`Modelo 3D de ${exercise.name}`} allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen />
            <p className="model-credit">
              Modelo 3D: <a href={exercise.model.modelUrl} target="_blank" rel="noreferrer">{exercise.model.modelName}</a> por <a href={exercise.model.creatorUrl} target="_blank" rel="noreferrer">{exercise.model.creator}</a>, {exercise.model.license} vía Sketchfab.
            </p>
          </div>
        ) : (
          <div className="motion-header"><Dumbbell size={33} strokeWidth={1.3} /><div><strong>Recorrido guiado</strong><span>Seguí las tres posiciones de abajo en cada repetición.</span></div></div>
        )}
        <section className="movement-sequence" aria-label={`Recorrido de ${exercise.name}`}>
          <article><span>1</span><small>INICIO</small><p>{exercise.startPosition}</p></article>
          <div className="movement-arrow"><ChevronRight size={22} /><small>HACÉ</small></div>
          <article className="movement-sequence__action"><span>2</span><small>MOVIMIENTO</small><p>{exercise.movement}</p></article>
          <div className="movement-arrow"><ChevronRight size={22} /><small>VOLVÉ</small></div>
          <article><span>3</span><small>RETORNO</small><p>{exercise.returnPosition}</p></article>
        </section>
        <a className="reference-button" href={exercise.referenceUrl} target="_blank" rel="noreferrer">{exercise.referenceTitle} <ExternalLink size={15} /></a>
        <div className="technique-grid">
          <div><h3>Preparación</h3><p>{exercise.setup}</p></div>
          <div><h3>Claves</h3><ol>{exercise.cues.map((cue) => <li key={cue}>{cue}</li>)}</ol></div>
        </div>
        <p className="caution"><Sparkles size={16} /> {exercise.caution}</p>
      </section>
    </div>
  )
}

function App() {
  const [view, setView] = useState<View>('inicio')
  const [weightEntries, setWeightEntries] = useStoredState<WeightEntry[]>('mi-salud-weight', [{ date: todayKey(), weight: 122 }])
  const [water, setWater] = useStoredState('mi-salud-water', 0)
  const [completedMeals, setCompletedMeals] = useStoredState<string[]>('mi-salud-meals', [])
  const [completedExercises, setCompletedExercises] = useStoredState<string[]>('mi-salud-exercises', [])
  const [checkedShopping, setCheckedShopping] = useStoredState<string[]>('mi-salud-shopping', [])
  const [expandedRecipe, setExpandedRecipe] = useState<string | null>(null)
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)
  const [weightDraft, setWeightDraft] = useState('122')
  const [weightFormOpen, setWeightFormOpen] = useState(false)
  const [workout, setWorkout] = useState<'A' | 'B'>('A')
  const backupInput = useRef<HTMLInputElement>(null)

  const lastWeight = weightEntries[weightEntries.length - 1]?.weight ?? 122
  const dayIndex = (new Date().getDay() + 6) % 7
  const currentPlan = weeklyPlan[dayIndex]
  const todayRecipes = currentPlan.meals.map((id) => recipes.find((recipe) => recipe.id === id)).filter((recipe): recipe is Recipe => Boolean(recipe))
  const mealStorageKey = (recipeId: string) => `${todayKey()}:${recipeId}`
  const registeredRecipes = recipes.filter((recipe) => completedMeals.includes(mealStorageKey(recipe.id)))
  const calories = registeredRecipes.reduce((total, recipe) => total + recipe.calories, 0)
  const protein = registeredRecipes.reduce((total, recipe) => total + recipe.protein, 0)
  const exercises = workout === 'A' ? workoutA : workoutB
  const completedTodayExercises = exercises.filter((exercise) => completedExercises.includes(exercise.id)).length
  const chartData = weightEntries.map((entry) => ({ label: formatDate(entry.date), weight: entry.weight }))
  const goalWeight = Math.max(lastWeight - 3, 0)
  const chartWithGoal = [...chartData, { label: 'Meta 4 sem.', weight: goalWeight }]

  const toggleMeal = (id: string) => {
    const storageKey = mealStorageKey(id)
    setCompletedMeals((current) => current.includes(storageKey) ? current.filter((item) => item !== storageKey) : [...current, storageKey])
  }
  const toggleExercise = (id: string) => setCompletedExercises((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  const toggleShopping = (item: string) => setCheckedShopping((current) => current.includes(item) ? current.filter((entry) => entry !== item) : [...current, item])

  const saveWeight = () => {
    const parsedWeight = Number(weightDraft.replace(',', '.'))
    if (!Number.isFinite(parsedWeight) || parsedWeight < 35 || parsedWeight > 300) return
    const entryDate = todayKey()
    setWeightEntries((current) => [...current.filter((entry) => entry.date !== entryDate), { date: entryDate, weight: parsedWeight }].sort((a, b) => a.date.localeCompare(b.date)))
    setWeightFormOpen(false)
  }

  const downloadBackup = () => {
    const snapshot: Snapshot = { weightEntries, water, completedMeals, completedExercises, checkedShopping }
    downloadFile(JSON.stringify(snapshot, null, 2), `mi-salud-respaldo-${todayKey()}.json`, 'application/json')
  }

  const restoreBackup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const data = JSON.parse(String(reader.result)) as Partial<Snapshot>
        if (!Array.isArray(data.weightEntries) || typeof data.water !== 'number') throw new Error('Formato inválido')
        setWeightEntries(data.weightEntries)
        setWater(data.water)
        setCompletedMeals(Array.isArray(data.completedMeals) ? data.completedMeals : [])
        setCompletedExercises(Array.isArray(data.completedExercises) ? data.completedExercises : [])
        setCheckedShopping(Array.isArray(data.checkedShopping) ? data.checkedShopping : [])
      } catch {
        window.alert('No se pudo leer ese respaldo de MI SALUD.')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }

  const renderHome = () => (
    <>
      <section className="page-heading home-heading">
        <div>
          <span className="eyebrow">Tu plan de hoy</span>
          <h1>Pequeñas decisiones,<br /><em>progreso real.</em></h1>
        </div>
        <div className="streak"><Activity size={18} /><span>Semana 1<br /><strong>en marcha</strong></span></div>
      </section>

      <section className="hero-metrics">
        <article className="calorie-card">
          <div className="calorie-card__copy"><span className="eyebrow">Energía de hoy</span><strong>{(calorieGoal - calories).toLocaleString('es-AR')} <small>kcal</small></strong><p>disponibles de {calorieGoal.toLocaleString('es-AR')}</p></div>
          <MetricRing value={calories} goal={calorieGoal} label="registradas" unit="kcal" color="#d9ed5e" />
        </article>
        <article className="water-card">
          <div><span className="eyebrow">Hidratación</span><strong>{(water / 1000).toLocaleString('es-AR', { maximumFractionDigits: 2 })} <small>L</small></strong><p>meta de {(waterGoal / 1000).toLocaleString('es-AR')} L</p></div>
          <div className="water-actions">
            <button type="button" onClick={() => setWater((current) => Math.max(0, current - 250))}>−</button>
            <Droplets size={28} />
            <button type="button" onClick={() => setWater((current) => Math.min(current + 250, 6000))}>+250</button>
          </div>
          <div className="water-progress"><span style={{ width: `${Math.min((water / waterGoal) * 100, 100)}%` }} /></div>
        </article>
      </section>

      <section className="two-column">
        <article className="surface-card today-card">
          <div className="section-title"><div><span className="eyebrow">Prioridad</span><h2>Hoy te toca</h2></div><button className="text-button" type="button" onClick={() => setView('gym')}>Ver gym <ChevronRight size={16} /></button></div>
          <div className="today-workout">
            <div className="workout-orb"><Dumbbell size={27} /></div>
            <div><strong>Entrenamiento {workout}</strong><p>{exercises.length} ejercicios · {completedTodayExercises}/{exercises.length} hechos</p></div>
            <button className="round-arrow" type="button" onClick={() => setView('gym')} aria-label="Abrir entrenamiento"><ChevronRight size={19} /></button>
          </div>
          <div className="progress-track"><span style={{ width: `${(completedTodayExercises / exercises.length) * 100}%` }} /></div>
          <p className="hint"><Moon size={15} /> Esta noche: intentá dejar el celular 30 min antes de dormir.</p>
        </article>
        <article className="surface-card weight-card">
          <div className="section-title"><div><span className="eyebrow">Tu referencia</span><h2>Peso</h2></div><button className="small-add" type="button" onClick={() => setWeightFormOpen(true)}><Plus size={16} /> Registrar</button></div>
          <div className="weight-number"><strong>{lastWeight.toLocaleString('es-AR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</strong><span>kg</span></div>
          <div className="weight-meta"><Target size={16} /><span>Meta inicial: 115,9 kg</span><span className="weight-pill">−0,75 kg/sem.</span></div>
        </article>
      </section>

      <section className="surface-card meals-preview">
        <div className="section-title"><div><span className="eyebrow">Nutrición simple</span><h2>Comidas de hoy</h2></div><button className="text-button" type="button" onClick={() => setView('comidas')}>Plan completo <ChevronRight size={16} /></button></div>
        <div className="meal-preview-grid">
          {todayRecipes.map((recipe) => <button className={`meal-preview ${completedMeals.includes(mealStorageKey(recipe.id)) ? 'meal-preview--done' : ''}`} key={recipe.id} type="button" onClick={() => toggleMeal(recipe.id)}><span>{completedMeals.includes(mealStorageKey(recipe.id)) ? <Check size={16} /> : recipe.slot.slice(0, 1)}</span><div><strong>{recipe.title}</strong><small>{recipe.calories} kcal · {recipe.protein} g prot.</small></div></button>)}
        </div>
      </section>
    </>
  )

  const renderMeals = () => (
    <>
      <section className="page-heading compact-heading">
        <div><span className="eyebrow">Comer para avanzar</span><h1>Tu cocina, <em>sin complicaciones.</em></h1><p>Elegí una receta, seguí los pasos y registrala al terminar.</p></div>
        <div className="protein-chip"><Flame size={17} /><strong>{protein} g</strong> / {proteinGoal} g proteína</div>
      </section>
      <section className="nutrition-summary">
        <div><span>Registrado</span><strong>{calories.toLocaleString('es-AR')} kcal</strong></div><div><span>Disponible</span><strong>{Math.max(calorieGoal - calories, 0).toLocaleString('es-AR')} kcal</strong></div><div><span>Proteína</span><strong>{protein} / {proteinGoal} g</strong></div>
      </section>
      <section className="weekly-guide"><div><span className="eyebrow">Cómo usarlo</span><h2>Repetir está bien.</h2><p>Este menú es una base para 2 a 3 semanas, no una regla eterna. Repetirlo hace más fácil comprar, cocinar y saber qué comer. Después cambiamos una receta por vez para no perder la organización.</p></div><div className="weekly-guide__steps"><p><strong>1.</strong> El domingo comprá la lista semanal.</p><p><strong>2.</strong> Cociná 2 o 3 porciones de pollo, arroz y verduras.</p><p><strong>3.</strong> SeguÍ el orden del plan o intercambiá almuerzo por almuerzo y cena por cena.</p></div></section>
      <section className="batch-cooking"><div className="batch-cooking__heading"><div><span className="eyebrow">Domingo · 1 h 30 min aprox.</span><h2>Cocina por tandas</h2><p>Preparás los almuerzos de la semana una vez. Después solo calentás una porción; desayunos y cenas se hacen en el momento.</p></div><div className="batch-cooking__badge"><ChefHat size={22} /><span>7 almuerzos<br /><strong>listos o congelados</strong></span></div></div><div className="batch-timeline"><article><span className="batch-step">01</span><div><h3>Prepará todo · 10 min</h3><p>Sacá 7 recipientes con tapa. Lavá manos y verduras. Cortá 1 kg de pollo en cubos para bowls, 600 g de pollo chico para el guiso, 3 cebollas y 3 zanahorias.</p></div></article><article><span className="batch-step">02</span><div><h3>Empezá el arroz · 20 min</h3><p>Lavá 400 g de arroz. Ponelo en una olla con 800 ml de agua y sal. Cuando hierva, tapá, bajá al mínimo y dejalo 12 a 15 min. Apagá y no destapes por 5 min.</p></div></article><article><span className="batch-step">03</span><div><h3>Hacé los 4 bowls · 30 min</h3><p>Cociná el kilo de pollo en dos tandas para no llenar la sartén. Salteá 1 kg de verduras congeladas con aceite y un chorrito de agua. Repartí en 4 recipientes: arroz, pollo y verduras.</p></div></article><article><span className="batch-step">04</span><div><h3>Mientras, hacé el guiso · 30 min</h3><p>En otra olla, cociná cebolla y zanahoria 5 min. Sumá los 600 g de pollo, después lentejas, tomate triturado y agua. Cociná a fuego bajo 15 min y dividilo en 3 recipientes.</p></div></article><article><span className="batch-step">05</span><div><h3>Enfriá y guardá · 10 min</h3><p>Dejá los recipientes destapados hasta que dejen de largar vapor, pero no más de 2 horas. Tapalos, escribí qué son y la fecha. Guardá lo de los próximos 3 días en heladera; congelá el resto.</p></div></article></div><div className="batch-storage"><article><span className="eyebrow">Heladera · 3 días</span><h3>Comé primero</h3><p>Lunes, martes y miércoles. Conservá los recipientes bien tapados y fríos.</p></article><article><span className="eyebrow">Freezer · resto semana</span><h3>Descongelá con tiempo</h3><p>Pasá la porción del jueves/viernes a la heladera la noche anterior. No hace falta descongelar a temperatura ambiente.</p></article><article><span className="eyebrow">Al momento</span><h3>Desayunos y cenas</h3><p>Huevos, avena, bife y salmón quedan mejor recién hechos. Las papas se pueden cortar antes y dejar en heladera con agua.</p></article></div><div className="batch-reheat"><Timer size={19} /><p><strong>Para recalentar:</strong> abrí apenas la tapa, agregá una cucharada de agua si el arroz está seco y calentá 2 a 3 minutos en microondas, hasta que salga vapor. Revolvé a mitad del tiempo.</p></div></section>
      <section className="week-plan"><div className="section-title"><div><span className="eyebrow">7 días · 21 comidas</span><h2>Plan semanal completo</h2></div><span className="week-plan__meta">Promedio: 2.477 kcal · 169 g prot.</span></div><div className="week-plan__days">{weeklyPlan.map((plan, index) => <article className={index === dayIndex ? 'week-day week-day--today' : 'week-day'} key={plan.day}><div><strong>{plan.day}</strong><span>{plan.training}</span></div>{plan.meals.map((recipeId) => { const recipe = recipes.find((item) => item.id === recipeId); return recipe ? <p key={recipeId}><small>{recipe.slot.slice(0, 1)}</small>{recipe.title}</p> : null })}</article>)}</div></section>
      <section className="recipe-grid">
        {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} completed={completedMeals.includes(mealStorageKey(recipe.id))} expanded={expandedRecipe === recipe.id} onToggle={() => toggleMeal(recipe.id)} onExpand={() => setExpandedRecipe(expandedRecipe === recipe.id ? null : recipe.id)} />)}
      </section>
      <section className="shopping-callout"><ShoppingBasket size={25} /><div><strong>¿Vas a cocinar esta semana?</strong><p>La lista reúne los ingredientes del plan base para que no tengas que improvisar.</p></div><button className="dark-button" type="button" onClick={() => setView('compras')}>Ver compras <ChevronRight size={17} /></button></section>
    </>
  )

  const renderShopping = () => {
    const totalItems = shoppingList.reduce((total, group) => total + group.items.length, 0)
    return (
      <>
        <section className="page-heading compact-heading"><div><span className="eyebrow">Plan de lunes a domingo</span><h1>Lista de <em>compras.</em></h1><p>Cantidades totales para las 21 comidas del plan semanal. No necesitás recalcular nada cada día.</p></div><div className="shopping-count"><strong>{checkedShopping.length}</strong> / {totalItems}<span>productos</span></div></section>
        <div className="shopping-progress"><span style={{ width: `${(checkedShopping.length / totalItems) * 100}%` }} /></div>
        <section className="shopping-groups">
          {shoppingList.map((group) => <article className="shopping-group" key={group.category}><h2>{group.category}</h2>{group.items.map((item) => <label className={`shopping-item ${checkedShopping.includes(item) ? 'shopping-item--checked' : ''}`} key={item}><input type="checkbox" checked={checkedShopping.includes(item)} onChange={() => toggleShopping(item)} /><span><Check size={14} /></span>{item}</label>)}</article>)}
        </section>
        <p className="tip"><ChefHat size={18} /> Consejo: comprá el domingo y cociná arroz, pollo y verduras en tandas. Ganás tiempo los días de gym.</p>
      </>
    )
  }

  const renderGym = () => (
    <>
      <section className="page-heading compact-heading"><div><span className="eyebrow">Fuerza antes que perfección</span><h1>Tu rutina de <em>máquinas.</em></h1><p>Dos entrenamientos simples. Alterná A y B cada vez que vayas.</p></div><div className="gym-stat"><Dumbbell size={19} /><strong>{completedTodayExercises}</strong> / {exercises.length}<span>completados</span></div></section>
      <section className="workout-selector"><button className={workout === 'A' ? 'active' : ''} type="button" onClick={() => setWorkout('A')}><span>Entrenamiento</span><strong>A</strong><small>Prensa y jalón</small></button><button className={workout === 'B' ? 'active' : ''} type="button" onClick={() => setWorkout('B')}><span>Entrenamiento</span><strong>B</strong><small>Extensión y hombros</small></button><p><Timer size={16} /> Descansá 60-90 s entre series.</p></section>
      <section className="warmup-guide"><div className="warmup-guide__heading"><div><span className="eyebrow">Antes de tocar una carga</span><h2>Calentamiento · 10 minutos</h2><p>Entrá en calor primero. Debés sentir el cuerpo más activo, no llegar cansado ni sin aire.</p></div><Timer size={29} /></div><div className="warmup-steps"><article><span>01</span><div><h3>Caminadora o bicicleta · 5-7 min</h3><p>Elegí una: caminá a paso vivo o pedaleá suave. El ritmo correcto te permite hablar frases completas. No hace falta correr ni usar inclinación al inicio.</p></div></article><article><span>02</span><div><h3>Movilidad · 2 min</h3><p>Hacé 10 círculos de hombros hacia atrás, 10 rotaciones de cadera por lado, 10 balanceos suaves de cada pierna y 10 movimientos de tobillo por lado. Todo sin rebotes ni dolor.</p></div></article><article><span>03</span><div><h3>Series livianas · 1-2 min</h3><p>Antes de prensa/extensión de piernas hacé 10-12 repeticiones con poco peso. Antes del primer ejercicio de torso hacé otra serie liviana de 10-12. Después empezás las series indicadas.</p></div></article></div></section>
      <section className="movement-plan"><div className="movement-plan__intro"><span className="eyebrow">Tu semana realista</span><h2>3 días de gym + caminatas</h2><p>Las máquinas construyen fuerza. Caminar suma movimiento y salud sin necesidad de agregar más ejercicios pesados.</p></div><div className="movement-week"><article><strong>Lun</strong><span>Gym A</span></article><article><strong>Mar</strong><span><Activity size={13} /> 20-30 min</span></article><article><strong>Mié</strong><span>Gym B</span></article><article><strong>Jue</strong><span><Activity size={13} /> 20-30 min</span></article><article><strong>Vie</strong><span>Gym A</span></article><article><strong>Sáb</strong><span><Activity size={13} /> 30-45 min</span></article><article><strong>Dom</strong><span>Descanso</span></article></div><div className="movement-plan__note"><Activity size={18} /><p><strong>Cómo caminar:</strong> elegí un ritmo en el que puedas hablar, pero no cantar cómodamente. Empezá en 20 minutos si hace falta; no necesitás correr ni contar pasos al principio.</p></div></section>
      <section className="no-machine-options"><div className="section-title"><div><span className="eyebrow">No todo es máquina</span><h2>Alternativas simples</h2></div><span>Elegí una alternativa, no las hagas todas.</span></div><div className="no-machine-options__grid"><article><strong>Abdominales en máquina</strong><h3>Dead bug en el piso</h3><p>Boca arriba, rodillas a 90 grados. Bajá brazo y pierna opuestos sin despegar la espalda del piso. Hacé 2 × 6-8 por lado.</p></article><article><strong>Extensión lumbar</strong><h3>Bird-dog en el piso</h3><p>En cuatro apoyos, extendé brazo y pierna opuestos. Pausá 2 segundos y cambiá. Hacé 2 × 6-8 por lado.</p></article><article><strong>Elevación de gemelos</strong><h3>De pie en un escalón</h3><p>Apoyate en una pared, subí a puntas de pie y bajá lento. Hacé 2-3 × 12-15 sin rebotar.</p></article></div><p className="no-machine-options__footer">Si una máquina no existe en tu gym, reemplazala por una alternativa del mismo movimiento. Si aparece dolor agudo, parás ese ejercicio y no lo forzás.</p></section>
      <section className="exercise-list">
        {exercises.map((exercise, index) => <article className={`exercise-card ${completedExercises.includes(exercise.id) ? 'exercise-card--done' : ''}`} key={exercise.id}><span className="exercise-index">{String(index + 1).padStart(2, '0')}</span><div className="exercise-main"><div><h2>{exercise.name}</h2><p>{exercise.focus}</p></div><div className="exercise-tags"><span>{exercise.sets}</span><span>{exercise.rest}</span></div></div><div className="exercise-actions"><button className="text-button" type="button" onClick={() => setSelectedExercise(exercise)}>{exercise.model ? 'Ver 3D' : 'Ver técnica'} <ChevronRight size={16} /></button><button className={`check-button ${completedExercises.includes(exercise.id) ? 'check-button--done' : ''}`} type="button" onClick={() => toggleExercise(exercise.id)}><Check size={16} /> {completedExercises.includes(exercise.id) ? 'Hecho' : 'Marcar'}</button></div></article>)}
      </section>
      <section className="stretching-guide"><div className="stretching-guide__heading"><div><span className="eyebrow">Después de terminar</span><h2>Vuelta a la calma · 5 minutos</h2><p>Estos estiramientos son opcionales, pero útiles si te hacen sentir mejor. Hacelos al final, no antes de levantar peso.</p></div><Moon size={27} /></div><div className="stretching-grid"><article><img src="./stretch-calf.png" alt="Persona estirando los gemelos contra una pared" /><strong>Gemelos</strong><p>Frente a una pared, una pierna atrás con talón apoyado y rodilla recta. Llevá el cuerpo hacia delante hasta sentir la pantorrilla. <b>20-30 s por lado.</b></p></article><article><img src="./stretch-quad.png" alt="Persona estirando el cuádriceps de pie" /><strong>Cuádriceps</strong><p>Apoyate en una pared, agarrá un tobillo y llevá el talón hacia el glúteo. Rodillas juntas y cadera hacia delante. <b>20-30 s por lado.</b></p></article><article><img src="./stretch-shoulder.png" alt="Persona estirando pecho y hombro en una pared" /><strong>Pecho y hombros</strong><p>Apoyá mano y antebrazo en un marco de puerta. Girá el torso suavemente hacia el lado contrario. <b>20-30 s por lado.</b></p></article><article><img src="./stretch-back.png" alt="Persona estirando la espalda en postura del niño" /><strong>Espalda</strong><p>En cuatro apoyos, sentate hacia los talones y estirá los brazos adelante. Respiración lenta. <b>20-30 s, 1-2 veces.</b></p></article></div><p className="stretching-guide__note">No rebotes ni busques dolor. Debés sentir tensión suave. Si un estiramiento pincha, duele o da hormigueo, lo salteás.</p></section>
      <section className="technique-note"><Sparkles size={21} /><p><strong>Primer día en una máquina:</strong> pedí que te ajusten asiento, apoyos y carga. La técnica va antes que el peso.</p></section>
    </>
  )

  const renderProgress = () => (
    <>
      <section className="page-heading compact-heading"><div><span className="eyebrow">Mirá la tendencia</span><h1>Progreso que <em>se sostiene.</em></h1><p>Un valor no define nada: la tendencia de varias semanas sí.</p></div><button className="dark-button" type="button" onClick={() => setWeightFormOpen(true)}><Plus size={17} /> Registrar peso</button></section>
      <section className="progress-overview"><article><span>Peso actual</span><strong>{lastWeight.toLocaleString('es-AR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} <small>kg</small></strong><p><Scale size={15} /> Punto de partida: 122,0 kg</p></article><article><span>Objetivo semanal</span><strong>0,75 <small>kg</small></strong><p><TrendingDown size={15} /> Ritmo orientativo</p></article><article><span>Meta inicial</span><strong>115,9 <small>kg</small></strong><p><Target size={15} /> 5% menos que el inicio</p></article></section>
      <section className="chart-card"><div className="section-title"><div><span className="eyebrow">Peso corporal</span><h2>Tu línea de progreso</h2></div><span className="chart-legend"><i /> Peso registrado</span></div><Suspense fallback={<div className="weight-chart chart-loading">Cargando gráfico...</div>}><WeightChart data={chartWithGoal} /></Suspense><p className="chart-note">La última marca representa una referencia orientativa de 4 semanas. Registrá tu peso 3 a 7 mañanas por semana para ver una tendencia real.</p></section>
      <section className="progress-grid"><article className="surface-card"><span className="eyebrow">Tu sistema</span><h2>Revisá cada 3 semanas</h2><p>Si el promedio baja entre 0,5 y 1 kg por semana y te sentís bien, mantené las calorías. No persigas cambios diarios.</p></article><article className="surface-card"><span className="eyebrow">Recordatorio</span><h2>Lo que importa</h2><p>Comidas planificadas, entrenamiento constante, agua y sueño suficiente. El gráfico es una consecuencia de esos hábitos.</p></article></section>
    </>
  )

  const renderMore = () => (
    <>
      <section className="page-heading compact-heading"><div><span className="eyebrow">Tu espacio personal</span><h1>Ajustes y <em>respaldo.</em></h1><p>Todo se guarda en este iPhone. Exportá un respaldo cada tanto.</p></div></section>
      <section className="settings-card"><div className="profile-line"><CircleUserRound size={42} /><div><strong>Daniel Fendyk</strong><span>Plan personal · 24 años</span></div></div><div className="setting-row"><span><Scale size={19} /> Perfil físico</span><strong>122 kg · 195 cm</strong></div><div className="setting-row"><span><Flame size={19} /> Objetivo de energía</span><strong>{calorieGoal.toLocaleString('es-AR')} kcal/día</strong></div><div className="setting-row"><span><Droplets size={19} /> Objetivo de agua</span><strong>{(waterGoal / 1000).toLocaleString('es-AR')} L/día</strong></div></section>
      <section className="sleep-guide"><div className="sleep-guide__heading"><div><span className="eyebrow">Energía sin romper el descanso</span><h2>Sueño, mate y café</h2><p>Mate amargo y café sin azúcar suman casi cero calorías. El punto importante es la hora: la cafeína puede afectar tu sueño aunque te duermas normalmente.</p></div><Moon size={31} /></div><div className="sleep-schedule"><article><span>07:30</span><div><strong>Despertar + agua</strong><p>Tomá un vaso de agua. Si querés, el primer mate o café puede ir desde este momento.</p></div></article><article><span>08:00–12:00</span><div><strong>Mejor momento para mate o café</strong><p>Mate amargo o café solo/sin azúcar están bien. No hace falta registrarlos como calorías.</p></div></article><article><span>16:30</span><div><strong>Última cafeína recomendada</strong><p>Si tu objetivo es dormir 23:30, cortá mate y café unas 7 horas antes. Después elegí agua, té sin cafeína o mate cocido sin cafeína.</p></div></article><article><span>23:00</span><div><strong>Bajá el ritmo</strong><p>Luces bajas, sin café ni mate, y tratá de dejar el celular. Preparás el sueño de las 23:30.</p></div></article><article><span>23:30–07:30</span><div><strong>Objetivo: 8 horas</strong><p>Para tu edad, apuntá a 7–9 horas. La regularidad vale más que un horario perfecto: mové todo el esquema si te levantás más temprano o tarde.</p></div></article></div><div className="sleep-guide__footer"><Coffee size={18} /><p><strong>Regla adaptable:</strong> elegí tu hora de dormir, restá 7–8 horas para despertar y dejá la última cafeína al menos 6–8 horas antes. Si sentís ansiedad, palpitaciones, acidez o dormís peor, adelantá o reducí mate/café.</p></div></section>
      <section className="action-list"><button type="button" onClick={createCalendar}><CalendarDays size={21} /><span><strong>Recordatorios para Calendario</strong><small>Descarga eventos para pesaje, gym y organización.</small></span><Download size={18} /></button><button type="button" onClick={downloadBackup}><Download size={21} /><span><strong>Exportar respaldo</strong><small>Guardá tus registros en un archivo privado.</small></span><ChevronRight size={18} /></button><button type="button" onClick={() => backupInput.current?.click()}><Upload size={21} /><span><strong>Restaurar respaldo</strong><small>Reemplaza los datos actuales de este iPhone.</small></span><ChevronRight size={18} /></button><input ref={backupInput} type="file" accept="application/json" onChange={restoreBackup} hidden /></section>
      <section className="privacy-note"><Settings size={19} /><p><strong>Privacidad primero.</strong> MI SALUD no tiene cuenta ni servidor: tus datos no salen de este dispositivo, salvo las escenas 3D de Sketchfab al abrirlas.</p></section>
    </>
  )

  const content = view === 'inicio' ? renderHome() : view === 'comidas' ? renderMeals() : view === 'compras' ? renderShopping() : view === 'gym' ? renderGym() : view === 'progreso' ? renderProgress() : renderMore()

  return (
    <div className="app-shell">
      <aside className="sidebar"><div className="brand"><span className="brand-mark"><Activity size={20} /></span><span>MI<br /><strong>SALUD</strong></span></div><nav>{navItems.map((item) => <button className={view === item.id ? 'active' : ''} key={item.id} type="button" onClick={() => setView(item.id)}><item.icon size={19} /><span>{item.label}</span></button>)}<button className={view === 'mas' ? 'active' : ''} type="button" onClick={() => setView('mas')}><Ellipsis size={20} /><span>Más</span></button></nav><div className="sidebar-footer"><span>Meta inicial</span><strong>115,9 kg</strong><div><span style={{ width: '15%' }} /></div><small>Tu primer −5%</small></div></aside>
      <main><header className="topbar"><div><span>{formatDate(todayKey(), { weekday: 'long', day: 'numeric', month: 'long' })}</span><strong>Hola, Daniel</strong></div><button className="profile-button" type="button" onClick={() => setView('mas')} aria-label="Abrir ajustes">DF</button></header><div className="content">{content}</div></main>
      <nav className="mobile-nav">{navItems.map((item) => <button className={view === item.id ? 'active' : ''} key={item.id} type="button" onClick={() => setView(item.id)}><item.icon size={20} /><span>{item.label}</span></button>)}</nav>
      {weightFormOpen && <div className="modal-backdrop" role="presentation" onMouseDown={() => setWeightFormOpen(false)}><section className="weight-modal" role="dialog" aria-modal="true" aria-label="Registrar peso" onMouseDown={(event) => event.stopPropagation()}><button className="icon-button modal-close" type="button" onClick={() => setWeightFormOpen(false)} aria-label="Cerrar"><X size={20} /></button><span className="eyebrow">Registro de hoy</span><h2>¿Cuánto pesás?</h2><div className="weight-input"><input autoFocus inputMode="decimal" value={weightDraft} onChange={(event) => setWeightDraft(event.target.value)} /><span>kg</span></div><p>Idealmente, pesate por la mañana, después de ir al baño y antes de desayunar.</p><button className="dark-button full-button" type="button" onClick={saveWeight}>Guardar peso <Check size={18} /></button></section></div>}
      {selectedExercise && <ExerciseModal exercise={selectedExercise} onClose={() => setSelectedExercise(null)} />}
    </div>
  )
}

export default App
