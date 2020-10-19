export const electricTravelModes = [
  "velo-electrique",
  "trottinette-electrique",
  "metro-tramway",
  "train-rer",
  "tgv",
];

export const modeDeplacementOptions = [
  { text: "A pied / en vélo", value: "pied-velo" },
  { text: "En vélo électrique", value: "velo-electrique" },
  {
    text: "En trottinette électrique",
    value: "trottinette-electrique",
  },
  { text: "En bus", value: "bus" },
  { text: "En métro/tramway", value: "metro-tramway" },
  { text: "En train/RER", value: "train-rer" },
  {
    text: "En voiture individuelle (conducteur)",
    value: "voiture-individuelle",
  },
  { text: "En covoiturage", value: "covoiturage" },
  { text: "En moto/scooter", value: "moto-scooter" },
  { text: "En taxi", value: "taxi" },
  { text: "En TGV", value: "tgv" },
];

export const motorisationOptions = [
  { text: "Essence", value: "essence" },
  { text: "Diesel", value: "diesel" },
  { text: "Électrique", value: "electrique" },
  { text: "GPL", value: "gpl" },
  { text: "Hybride essence", value: "hybride-essence" },
  { text: "Hybride diesel", value: "hybride-diesel" },
];

export const actionReductionData = [
  {
    type: "select",
    name: "5f60a09bc059e",
    options: modeDeplacementOptions,
    firstText: "Changer de mode de déplacement pour se rendre au travail",
  },
  {
    type: "input",
    name: "5f60a0ad1f52f",
    firstText: "Travailler à domicile",
    secondText: "jours par mois en plus du télétravail actuel",
  },
];
