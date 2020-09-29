export const proItems = [
  {
    title: "Au bureau",
    description: "4 questions",
  },
  {
    title: "Empreinte numérique",
    description: "5 questions",
  },
  {
    title: "Restauration",
    description: "2 questions",
  },
  {
    title: "Trajets",
    description: "3 questions",
  },
  {
    title: "Déplacements",
    description: "11 questions",
  },
];

export const persoItems = [
  {
    title: "A la maison",
    description: "12 questions",
  },
  {
    title: "Equipement du logement",
    description: "12 questions",
  },
  {
    title: "Biens matériels",
    description: "15 questions",
  },
  {
    title: "Numérique",
    description: "2 questions",
  },
  {
    title: "Alimentation",
    description: "9 questions",
  },
  {
    title: "Déplacements",
    description: "7 questions",
  },
  {
    title: "Services publics",
    description: "1 questions",
  },
];

export const CATEGORY = {
  PRO: "vie professionnelle",
  PERSO: "vie personnelle",
  RESULTS: "résultats",
};

const config = {
  [CATEGORY.PRO]: proItems,
  [CATEGORY.PERSO]: persoItems,
};

export const getCategoryItems = (category) => {
  return config[category];
};
