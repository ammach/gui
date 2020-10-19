export const optionsClasses = [
  { text: "A = 50", value: "A" },
  { text: "B = 70,5", value: "B" },
  { text: "C = 120,5", value: "C" },
  { text: "D = 190,5", value: "D" },
  { text: "E = 280,5", value: "E" },
  { text: "F = 390,5", value: "F" },
  { text: "G = 450", value: "G" },
];

export const optionsLogement = [
  { text: "Avant 1980", value: "Avant 1980" },
  { text: "Entre 1980 et 2005", value: "Entre 1980 et 2005" },
  { text: "Entre 2005 et 2012", value: "Entre 2005 et 2012" },
  { text: "Après 2012", value: "Après 2012" },
];

const options = [
  { text: "0", value: 0 },
  { text: "20", value: 20 },
  { text: "40", value: 40 },
  { text: "60", value: 60 },
  { text: "80", value: 80 },
];

export const selectDetailLunch = [
  {
    type: "select",
    firstText:
      "Réduire sa consommation annuelle d'Electricité de votre logement (kWh) de ",
    name: "5f60a1229564b",
    options: options,
    secondText: "%",
  },
  {
    type: "select",
    firstText:
      "Réduire sa consommation annuelle de Gaz naturel de votre logement (kWh PCS) de",
    name: "5f7f26f4b6606",
    options: options,
    secondText: "%",
  },
  {
    type: "select",
    firstText:
      "Réduire sa consommation annuelle de Fioul domestique de votre logement (L) de ",
    name: "5f7f271841ce5",
    options: options,
    secondText: "%",
  },
  {
    type: "select",
    firstText:
      "Réduire sa consommation annuelle de bois de chauffage pour votre logement (kg) de",
    name: "5f7f2742cdf84",
    options: options,
    secondText: "%",
  },
  {
    type: "input",
    firstText: "Améliorer la performance énergétique du logement de ",
    name: "5f60a1399f5ab",
    secondText:
      "% grâce à des travaux de rénovation énergétique (isolation, chauffage …)",
  },
];
