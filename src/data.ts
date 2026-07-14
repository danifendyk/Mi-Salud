export type MealSlot = 'Desayuno' | 'Almuerzo' | 'Cena'

export interface Recipe {
  id: string
  slot: MealSlot
  title: string
  description: string
  calories: number
  protein: number
  time: string
  ingredients: string[]
  steps: string[]
  substitutions: string[]
  beginnerTips: string[]
}

export interface ExerciseModel {
  embedUrl: string
  modelName: string
  creator: string
  creatorUrl: string
  modelUrl: string
  license: string
}

export interface Exercise {
  id: string
  name: string
  focus: string
  sets: string
  rest: string
  setup: string
  startPosition: string
  movement: string
  returnPosition: string
  cues: string[]
  caution: string
  referenceUrl: string
  referenceTitle: string
  model?: ExerciseModel
}

export interface WeightEntry {
  date: string
  weight: number
}

export const calorieGoal = 2700
export const proteinGoal = 160
export const waterGoal = 3000

export const recipes: Recipe[] = [
  {
    id: 'avena-proteica',
    slot: 'Desayuno',
    title: 'Avena proteica con banana',
    description: 'Cremosa, dulce y lista en menos de 10 minutos.',
    calories: 738,
    protein: 43,
    time: '10 min',
    ingredients: ['80 g de avena', '250 ml de leche', '250 g de yogur griego natural', '1 banana', '20 g de dulce de leche'],
    steps: ['Poné la avena y la leche en una olla chica. Cociná a fuego bajo 4 a 5 minutos, revolviendo cada tanto con cuchara hasta que quede espesa, como una crema.', 'Apagá el fuego y pasá la avena a un bowl. Esperá 2 minutos para no calentar demasiado el yogur.', 'Agregá el yogur griego encima. Cortá la banana en rodajas y terminá con 1 cucharada colmada de dulce de leche (20 g).'],
    substitutions: ['El dulce de leche reemplaza a la mantequilla de maní: usá 20 g, aproximadamente 1 cucharada colmada.', 'Si no hay yogur griego, usá yogur natural firme alto en proteína.', 'La banana se puede cambiar por manzana cortada o frutos rojos congelados.'],
    beginnerTips: ['No hace falta que hierva fuerte: fuego bajo evita que la leche se pegue.', 'Pesá la avena en seco. Si queda demasiado espesa, agregá un chorrito más de leche.'],
  },
  {
    id: 'huevos-tostadas',
    slot: 'Desayuno',
    title: 'Huevos revueltos y tostadas',
    description: 'Desayuno salado con vegetales y buena saciedad.',
    calories: 720,
    protein: 45,
    time: '15 min',
    ingredients: ['4 huevos', '3 tostadas integrales', '1 tomate', '40 g de queso untable light', '1 fruta'],
    steps: ['Cortá el tomate en rodajas y tostá el pan. Dejá todo listo antes de encender la hornalla.', 'Rompé los 4 huevos en un bowl, agregá una pizca de sal y batí con tenedor durante 20 segundos.', 'Calentá una sartén antiadherente a fuego bajo-medio. Volcá los huevos y revolvé lentamente con espátula hasta que no quede líquido, pero sigan húmedos.', 'Serví con las tostadas, el tomate, queso untable y una fruta.'],
    substitutions: ['Podés usar 3 huevos y 150 g de claras si preferís una opción más liviana.', 'Cambiá tomate por pepino, morrón o espinaca salteada.', 'El pan integral puede ser pan común o tortillas integrales, manteniendo una porción similar.'],
    beginnerTips: ['Si la sartén no es antiadherente, usá 1 cucharadita de aceite.', 'Los huevos siguen cocinándose al apagar el fuego: retiralos antes de que queden secos.'],
  },
  {
    id: 'bowl-pollo',
    slot: 'Almuerzo',
    title: 'Bowl de pollo, arroz y verduras',
    description: 'Un plato completo que se puede dejar preparado.',
    calories: 840,
    protein: 66,
    time: '30 min',
    ingredients: ['250 g de pechuga de pollo', '100 g de arroz en crudo', '250 g de verduras congeladas', '10 ml de aceite de oliva', 'Limón, sal y pimentón'],
    steps: ['Lavá el arroz en un colador. Poné 100 g de arroz con 200 ml de agua y una pizca de sal; cuando hierva, tapá y cociná a fuego mínimo 12 a 15 minutos. Apagá y dejá tapado 5 minutos.', 'Cortá el pollo en cubos del tamaño de un bocado. Condimentá con sal, pimienta, pimentón y jugo de limón.', 'Calentá una sartén grande a fuego medio-alto. Agregá 1 cucharada de aceite, después el pollo. Cociná 4 minutos sin mover demasiado; dalo vuelta y cociná 4 a 6 minutos más, hasta que esté blanco por dentro y sin partes rosadas.', 'Verduras salteadas significa cocinarlas rápido en sartén: usá verduras congeladas o cortadas, agregalas a otra sartén con 1 cucharadita de aceite y 3 cucharadas de agua. Cociná 6 a 8 minutos, revolviendo, hasta que estén calientes y algo tiernas.', 'Armá el bowl con arroz, pollo y verduras. Guardá porciones sobrantes en la heladera hasta 3 días.'],
    substitutions: ['Podés cambiar pollo por pavo, carne magra cortada en tiras o atún al natural.', 'Arroz por papa hervida/al horno o fideos, con una porción similar.', 'Las verduras congeladas son válidas y más simples: brócoli, zanahoria, morrón, cebolla o mezcla para wok.'],
    beginnerTips: ['No llenes demasiado la sartén: si el pollo queda amontonado, larga agua y no se dora.', 'Para saber si el pollo está listo, cortá el cubo más grande: el centro debe verse blanco y opaco.'],
  },
  {
    id: 'lentejas-pollo',
    slot: 'Almuerzo',
    title: 'Guiso rápido de lentejas y pollo',
    description: 'Ideal para cocinar varias porciones de una vez.',
    calories: 815,
    protein: 59,
    time: '35 min',
    ingredients: ['200 g de pechuga de pollo cortada muy chica', '250 g de lentejas cocidas', '1 cebolla', '1 zanahoria', '200 g de tomate triturado', '10 ml de aceite de oliva'],
    steps: ['Pelá y cortá la cebolla y zanahoria en cubitos chicos. No necesitás que queden perfectos. Cortá también la pechuga de pollo en cubos chicos.', 'Calentá una olla mediana con 1 cucharada de aceite a fuego medio. Cociná la cebolla y zanahoria 5 minutos, revolviendo, hasta que la cebolla se vea transparente.', 'Agregá el pollo y revolvelo con cuchara de madera. Cociná 6 a 8 minutos hasta que esté blanco por dentro y no tenga partes rosadas.', 'Enjuagá las lentejas de lata en un colador. Sumalas con el tomate triturado, media taza de agua, sal y pimentón. Tapá apenas y cociná 15 minutos a fuego bajo.', 'Probá y serví cuando el guiso esté espeso. Se puede congelar en porciones.'],
    substitutions: ['Pollo por carne picada magra o pavo picado si alguna vez conseguís.', 'Lentejas de lata por lentejas cocidas caseras o garbanzos cocidos.', 'Si no tenés tomate triturado, usá tomate en cubos de lata.'],
    beginnerTips: ['Si el guiso se seca, agregá agua de a poco. Si queda muy líquido, destapá los últimos 5 minutos.', 'La carne picada está lista cuando ya no se ve rosada.'],
  },
  {
    id: 'ternera-papas',
    slot: 'Cena',
    title: 'Ternera con papas al horno',
    description: 'Cena abundante, sencilla y con ingredientes comunes. Usá un bife magro, no uno muy veteado.',
    calories: 938,
    protein: 66,
    time: '40 min',
    ingredients: ['200 g de bife magro: nalga, cuadrada, peceto o bola de lomo', '400 g de papa', '2 huevos', 'Ensalada grande', '10 ml de aceite de oliva'],
    steps: ['Prendé el horno a 220 C. Lavá las papas, cortalas en cubos o gajos parejos, mezclalas con 1 cucharada de aceite, sal y pimentón. Horneá 30 a 40 minutos en una placa, dándolas vuelta a mitad de cocción.', 'Para la carne, sí: un bife de nalga, cuadrada, peceto o bola de lomo funciona muy bien. Pedí en la carnicería un bife magro, con poca grasa visible. Evitá usar bife de chorizo o cortes muy grasos como opción habitual.', 'Calentá una sartén a fuego alto 2 minutos. Poné el bife sin moverlo 2 a 3 minutos; dalo vuelta y cociná 2 a 3 minutos más. El tiempo varía según el grosor. Dejalo reposar 2 minutos antes de cortar.', 'Herví los huevos 9 minutos desde que el agua rompe hervor. Enfriálos bajo agua y pelalos.', 'Armá un plato con papas, bife, huevos y ensalada.'],
    substitutions: ['Carne magra por pollo, pavo o cerdo magro (carré sin grasa visible).', 'Papas por batata, calabaza o arroz.', 'Los huevos son opcionales si ese día ya comiste mucha proteína; podés sumar más ensalada.'],
    beginnerTips: ['La carne no se lava. Secala con papel si tiene mucho líquido y condimentala justo antes de cocinar.', 'Una papa está lista si un cuchillo entra fácil en el centro.'],
  },
  {
    id: 'salmon-pasta',
    slot: 'Cena',
    title: 'Salmón, pasta y brócoli',
    description: 'Una cena diferente que se hace en una sola tanda.',
    calories: 890,
    protein: 58,
    time: '25 min',
    ingredients: ['200 g de salmón', '100 g de pasta en crudo', '250 g de brócoli', '10 ml de aceite de oliva', 'Limón y ajo'],
    steps: ['Poné una olla grande con agua y sal a hervir. Agregá la pasta y cociná el tiempo indicado en el paquete. Reservá media taza del agua de cocción antes de colar.', 'Cortá el brócoli en arbolitos chicos. Agregalo a la olla de pasta durante los últimos 4 minutos de cocción; después colá ambos juntos.', 'Calentá una sartén a fuego medio con 1 cucharadita de aceite. Cociná el salmón 3 a 4 minutos de cada lado. Está listo cuando se separa fácil en láminas con tenedor y el centro ya no es traslúcido.', 'Mezclá pasta y brócoli con aceite, ajo picado, limón y un poco del agua reservada si hace falta humedad. Serví con el salmón.'],
    substitutions: ['Salmón por merluza, atún al natural o pollo.', 'Brócoli por espinaca, chauchas o verduras congeladas.', 'Pasta común o integral: elegí la que te resulte más fácil de conseguir.'],
    beginnerTips: ['No hace falta agregar aceite al agua de la pasta.', 'Si usás pescado congelado, descongelalo dentro de la heladera desde la noche anterior.'],
  },
]

export const weeklyPlan = [
  { day: 'Lunes', training: 'Gym A', meals: ['avena-proteica', 'bowl-pollo', 'ternera-papas'] },
  { day: 'Martes', training: 'Descanso', meals: ['huevos-tostadas', 'lentejas-pollo', 'salmon-pasta'] },
  { day: 'Miércoles', training: 'Gym B', meals: ['avena-proteica', 'bowl-pollo', 'ternera-papas'] },
  { day: 'Jueves', training: 'Descanso', meals: ['huevos-tostadas', 'lentejas-pollo', 'salmon-pasta'] },
  { day: 'Viernes', training: 'Gym A', meals: ['avena-proteica', 'bowl-pollo', 'ternera-papas'] },
  { day: 'Sábado', training: 'Descanso', meals: ['huevos-tostadas', 'lentejas-pollo', 'salmon-pasta'] },
  { day: 'Domingo', training: 'Organizar', meals: ['avena-proteica', 'bowl-pollo', 'ternera-papas'] },
]

export const shoppingList = [
  { category: 'Proteínas', items: ['Pechuga de pollo · 1,6 kg', 'Carne magra · 800 g', 'Salmón · 600 g', 'Huevos · 20 u', 'Yogur griego · 1 kg'] },
  { category: 'Verduras y frutas', items: ['Bananas · 4 u', 'Papas · 1,6 kg', 'Tomates · 3 u', 'Cebollas · 3 u', 'Zanahorias · 3 u', 'Brócoli · 750 g', 'Verduras congeladas · 1 kg', 'Ensalada verde · 4 bolsas'] },
  { category: 'Almacén', items: ['Avena · 320 g', 'Arroz · 400 g', 'Pasta · 300 g', 'Lentejas cocidas · 750 g', 'Pan integral · 9 rebanadas', 'Tomate triturado · 600 g'] },
  { category: 'Extras', items: ['Leche · 1 L', 'Dulce de leche · 80 g', 'Queso untable light · 120 g', 'Aceite de oliva · 150 ml', 'Limón, ajo, sal y pimentón'] },
]

const legPressModel: ExerciseModel = {
  embedUrl: 'https://sketchfab.com/models/99b9c28dd70d4131918d23f0b58cb14a/embed?autostart=1&preload=1&ui_infos=0',
  modelName: 'Leg Press Machine',
  creator: 'silentsheri',
  creatorUrl: 'https://sketchfab.com/silentsheri',
  modelUrl: 'https://sketchfab.com/models/99b9c28dd70d4131918d23f0b58cb14a',
  license: 'CC BY',
}

const legExtensionModel: ExerciseModel = {
  embedUrl: 'https://sketchfab.com/models/f0e400579ad54b34b9cd06ba0c6e5f78/embed?autostart=1&preload=1&ui_infos=0',
  modelName: 'Leg extension machine',
  creator: 'dragosburian',
  creatorUrl: 'https://sketchfab.com/dragosburian',
  modelUrl: 'https://sketchfab.com/models/f0e400579ad54b34b9cd06ba0c6e5f78',
  license: 'Sketchfab Standard',
}

const shoulderPressModel: ExerciseModel = {
  embedUrl: 'https://sketchfab.com/models/01ece82aae8b478a9bb89eff41f59648/embed?autostart=1&preload=1&ui_infos=0',
  modelName: 'Cable Loaded Seated Shoulder Press Machine',
  creator: 'Mike - 3D Muscle Model',
  creatorUrl: 'https://sketchfab.com/mikeshortall1991',
  modelUrl: 'https://sketchfab.com/models/01ece82aae8b478a9bb89eff41f59648',
  license: 'Sketchfab Standard',
}

const calfRaiseModel: ExerciseModel = {
  embedUrl: 'https://sketchfab.com/models/2751050881754cacadee3f06904f8f29/embed?autostart=1&preload=1&ui_infos=0',
  modelName: 'Calf Raise Machine',
  creator: 'Neske',
  creatorUrl: 'https://sketchfab.com/Neske',
  modelUrl: 'https://sketchfab.com/models/2751050881754cacadee3f06904f8f29',
  license: 'Sketchfab Standard',
}

const backExtensionModel: ExerciseModel = {
  embedUrl: 'https://sketchfab.com/models/c1c72e01eee241ac8fb19f7804d5b4c9/embed?autostart=1&preload=1&ui_infos=0',
  modelName: 'Back Extension Cable Machine',
  creator: 'Mike - 3D Muscle Model',
  creatorUrl: 'https://sketchfab.com/mikeshortall1991',
  modelUrl: 'https://sketchfab.com/models/c1c72e01eee241ac8fb19f7804d5b4c9',
  license: 'Sketchfab Standard',
}

export const workoutA: Exercise[] = [
  {
    id: 'prensa', name: 'Prensa de piernas', focus: 'Cuádriceps y glúteos', sets: '2-3 × 8-12', rest: '90 s',
    setup: 'Ajustá el respaldo para que la zona lumbar quede apoyada y los pies queden al ancho de hombros.',
    startPosition: 'Sentado con espalda y cabeza apoyadas; pies enteros en la plataforma y rodillas flexionadas sin cerrar demasiado el ángulo.',
    movement: 'Empujá la plataforma de forma continua hasta que las piernas estén casi rectas.',
    returnPosition: 'Bajá lento hasta volver al ángulo inicial, sin que la pelvis ni la espalda se despeguen.',
    cues: ['Bajá controlado sin despegar la espalda.', 'Empujá toda la plataforma con el pie completo.', 'Terminá sin bloquear las rodillas.'],
    caution: 'Usá un rango que no redondee la espalda ni cause dolor de rodilla.', model: legPressModel,
    referenceUrl: 'https://exrx.net/Lists/ExList/ThighWt#Quadriceps', referenceTitle: 'Ver demostraciones de prensa en ExRx',
  },
  {
    id: 'pecho', name: 'Press de pecho en máquina', focus: 'Pecho, hombro y tríceps', sets: '2-3 × 8-12', rest: '90 s',
    setup: 'Alineá las manijas con la mitad del pecho y mantené los hombros apoyados.',
    startPosition: 'Sentado con la espalda apoyada, manijas a la altura media del pecho y codos ligeramente por debajo de los hombros.',
    movement: 'Empujá las manijas hacia delante siguiendo una línea recta, sin levantar los hombros.',
    returnPosition: 'Volvé lento hasta sentir una apertura leve de pecho, sin perder el contacto de la espalda con el respaldo.',
    cues: ['Empujá hacia delante sin encoger hombros.', 'Pausá un instante sin bloquear codos.', 'Volvé lento hasta una apertura cómoda.'],
    caution: 'Si sentís dolor de hombro, bajá el asiento o reducí el rango.',
    referenceUrl: 'https://exrx.net/WeightExercises/PectoralSternal/LVChestPress', referenceTitle: 'Ver demostración en ExRx',
  },
  {
    id: 'jalon', name: 'Jalón al pecho', focus: 'Espalda y bíceps', sets: '2-3 × 8-12', rest: '90 s',
    setup: 'Fijá las piernas bajo los apoyos y sujetá la barra algo más ancho que los hombros.',
    startPosition: 'Sentado firme, muslos bajo los apoyos, brazos arriba casi rectos y pecho levemente elevado.',
    movement: 'Llevá la barra hacia el pecho alto tirando los codos hacia abajo y hacia los costados.',
    returnPosition: 'Dejá subir la barra controladamente hasta extender los brazos, sin encoger los hombros hacia las orejas.',
    cues: ['Llevá los codos hacia abajo.', 'Bajá la barra al pecho alto, no detrás de la nuca.', 'Subí despacio sin soltar tensión.'],
    caution: 'No uses impulso ni arquees demasiado la espalda.',
    referenceUrl: 'https://exrx.net/WeightExercises/LatissimusDorsi/CBFrontPulldown', referenceTitle: 'Ver demostración en ExRx',
  },
  {
    id: 'femoral', name: 'Curl femoral sentado', focus: 'Isquiotibiales', sets: '2-3 × 10-12', rest: '75 s',
    setup: 'Alineá la articulación de la máquina con tu rodilla y ajustá el rodillo encima de los tobillos.',
    startPosition: 'Espalda pegada al respaldo, rodillas alineadas con el eje y piernas casi rectas bajo el rodillo.',
    movement: 'Flexioná las rodillas llevando el rodillo hacia abajo y atrás, sin mover la cadera.',
    returnPosition: 'Estirá las piernas de forma lenta hasta casi llegar al inicio, sin que el peso golpee.',
    cues: ['Mantené la espalda pegada.', 'Flexioná las rodillas con control.', 'Volvé lento, sin golpear los pesos.'],
    caution: 'Reducí el rango si hay tirón o molestia detrás de la rodilla.',
    referenceUrl: 'https://exrx.net/WeightExercises/Hamstrings/LVSeatedLegCurl', referenceTitle: 'Ver demostración en ExRx',
  },
  {
    id: 'remo-polea', name: 'Remo en polea baja', focus: 'Espalda media y bíceps', sets: '2-3 × 8-12', rest: '90 s',
    setup: 'Conectá un agarre en V a la polea baja. Sentate con pies en los apoyos y rodillas apenas flexionadas.',
    startPosition: 'Sentado erguido, pies firmes en la plataforma y brazos extendidos hacia el agarre, sin redondear la espalda.',
    movement: 'Tirá el agarre hacia el ombligo llevando los codos hacia atrás y juntando los omóplatos.',
    returnPosition: 'Estirá los brazos de forma controlada hasta que las escápulas se separen, sin inclinar el torso hacia delante.',
    cues: ['Llevá el agarre hacia el ombligo.', 'Juntá los omóplatos al final.', 'Volvé sin redondear la espalda.'],
    caution: 'El torso no debe balancearse para mover el peso. Si no hay apoyo para pies, usá una variante de remo con cable de pie.',
    referenceUrl: 'https://exrx.net/WeightExercises/BackGeneral/CBSeatedRow', referenceTitle: 'Ver demostración de remo en polea baja',
  },
  {
    id: 'abdominales', name: 'Crunch en máquina', focus: 'Abdominales', sets: '2 × 10-15', rest: '60 s',
    setup: 'Ajustá el asiento para apoyar bien pies, espalda y almohadillas.',
    startPosition: 'Sentado con pies firmes, almohadillas cómodas y espalda neutra contra el respaldo.',
    movement: 'Cerrá las costillas hacia la pelvis, como si quisieras acortar el torso desde adelante.',
    returnPosition: 'Volvé despacio hasta la espalda neutra, sin llevar el pecho hacia atrás en exceso.',
    cues: ['Cerrá las costillas hacia la pelvis.', 'Exhalá al contraer.', 'Regresá sin hiperextender la espalda.'],
    caution: 'No tires del cuello ni aumentes la carga si perdés control.',
    referenceUrl: 'https://exrx.net/Lists/ExList/AbWt', referenceTitle: 'Ver demostraciones de abdominales en ExRx',
  },
]

export const workoutB: Exercise[] = [
  {
    id: 'extension', name: 'Extensión de piernas', focus: 'Cuádriceps', sets: '2-3 × 10-12', rest: '75 s',
    setup: 'Alineá la rodilla con el eje y colocá el rodillo justo sobre los tobillos.',
    startPosition: 'Sentado con cadera atrás, rodillas flexionadas y el rodillo apoyado sobre los tobillos.',
    movement: 'Extendé las rodillas levantando el rodillo hasta que las piernas queden casi rectas.',
    returnPosition: 'Bajá el rodillo lento hasta el inicio, manteniendo la espalda contra el respaldo.',
    cues: ['Subí hasta casi extender.', 'Pausá arriba con control.', 'Bajá lento sin golpear las placas.'],
    caution: 'No fuerces la extensión si aparece dolor en la rodilla.',
    referenceUrl: 'https://exrx.net/Lists/ExList/ThighWt#Quadriceps', referenceTitle: 'Ver demostraciones de extensión en ExRx',
    model: legExtensionModel,
  },
  {
    id: 'hombro', name: 'Press de hombros en máquina', focus: 'Hombros y tríceps', sets: '2-3 × 8-12', rest: '90 s',
    setup: 'Ajustá el asiento para que las manijas empiecen cerca de la altura de las orejas.',
    startPosition: 'Espalda apoyada, abdomen firme y manijas a los lados de la cabeza; antebrazos verticales.',
    movement: 'Empujá las manijas hacia arriba siguiendo el recorrido de la máquina.',
    returnPosition: 'Bajá con control hasta el punto inicial cómodo sin adelantar la cabeza.',
    cues: ['Mantené costillas abajo y espalda apoyada.', 'Empujá hacia arriba de forma vertical.', 'Bajá con control hasta un rango cómodo.'],
    caution: 'Reducí carga si el hombro se va hacia delante o duele.',
    referenceUrl: 'https://exrx.net/Lists/ExList/ShouldWt', referenceTitle: 'Ver demostraciones de hombros en ExRx',
    model: shoulderPressModel,
  },
  {
    id: 'pecdeck', name: 'Pec deck', focus: 'Pecho', sets: '2-3 × 10-12', rest: '75 s',
    setup: 'Ajustá el asiento para que los codos queden a la altura media del pecho.',
    startPosition: 'Sentado con espalda apoyada, antebrazos o manos sobre los apoyos y brazos abiertos de forma cómoda.',
    movement: 'Cerrá ambos brazos hacia el centro como si abrazaras un árbol grande.',
    returnPosition: 'Abrí lentamente hasta sentir un estiramiento leve sin que los hombros se vayan hacia delante.',
    cues: ['Pegá la espalda al respaldo.', 'Cerrá los brazos sin chocar los pesos.', 'Abrí despacio hasta sentir estiramiento leve.'],
    caution: 'Evitá abrir más allá de donde el hombro se sienta estable.',
    referenceUrl: 'https://exrx.net/WeightExercises/PectoralSternal/LVPecDeckFly', referenceTitle: 'Ver demostración en ExRx',
  },
  {
    id: 'remo-polea-b', name: 'Remo en polea baja', focus: 'Espalda media y bíceps', sets: '2-3 × 8-12', rest: '90 s',
    setup: 'Conectá un agarre en V a la polea baja. Sentate con pies en los apoyos y rodillas apenas flexionadas.',
    startPosition: 'Sentado erguido, pies firmes en la plataforma y brazos extendidos hacia el agarre, sin redondear la espalda.',
    movement: 'Tirá el agarre hacia el ombligo llevando los codos hacia atrás y juntando los omóplatos.',
    returnPosition: 'Estirá los brazos de forma controlada hasta que las escápulas se separen, sin inclinar el torso hacia delante.',
    cues: ['Pecho alto.', 'Codos hacia atrás.', 'Controlá el regreso.'],
    caution: 'No balancees el torso. Anotá la carga para repetirla en la siguiente sesión.',
    referenceUrl: 'https://exrx.net/WeightExercises/BackGeneral/CBSeatedRow', referenceTitle: 'Ver demostración de remo en polea baja',
  },
  {
    id: 'gemelos', name: 'Elevación de gemelos', focus: 'Pantorrillas', sets: '2-3 × 10-15', rest: '60 s',
    setup: 'Apoyá la punta del pie en la plataforma y mantené las rodillas suaves.',
    startPosition: 'Puntas de los pies sobre la plataforma, talones abajo y rodillas sin bloquear.',
    movement: 'Elevá los talones empujando con la punta de los pies hasta quedar lo más alto que controles.',
    returnPosition: 'Bajá los talones despacio por debajo de la plataforma si la máquina lo permite.',
    cues: ['Bajá el talón lento.', 'Subí lo más alto que controles.', 'Pausá un segundo arriba.'],
    caution: 'No rebotes en la parte baja.',
    referenceUrl: 'https://exrx.net/Lists/ExList/CalfWt', referenceTitle: 'Ver demostraciones de gemelos en ExRx',
    model: calfRaiseModel,
  },
  {
    id: 'lumbar', name: 'Extensión lumbar en máquina', focus: 'Zona lumbar y glúteos', sets: '2 × 10-12', rest: '60 s',
    setup: 'Ajustá el apoyo para que el movimiento venga de la cadera, no del cuello.',
    startPosition: 'Cadera fija en el apoyo, torso levemente inclinado y abdomen firme.',
    movement: 'Extendé la cadera hasta que torso y piernas formen una línea recta.',
    returnPosition: 'Bajá el torso en bloque desde la cadera, sin redondear la zona lumbar.',
    cues: ['Subí hasta quedar recto.', 'Mantené abdomen firme.', 'Bajá lento sin redondear.'],
    caution: 'No hiperextiendas la espalda al final.',
    referenceUrl: 'https://exrx.net/Lists/ExList/BackWt', referenceTitle: 'Ver demostraciones de espalda en ExRx',
    model: backExtensionModel,
  },
]
