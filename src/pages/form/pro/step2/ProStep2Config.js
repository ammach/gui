import { EMPREINTE_OVERLAY_TITLE } from "@utils/constants";

export const QUESTION2_DEFAULT_VALUE = 16.5;

export const overlayItems = [
  {
    image: "/images/empreinte-pop-conseils.jpg",
    title: EMPREINTE_OVERLAY_TITLE,
  },
];

export const curseurQuestions = (label, name, value, setValue) => {
  return [
    {
      label: label,
      name: name,
      min: 0,
      max: 10,
      value: value,
      setValue: setValue,
    },
  ];
};

export const actionReductionData = [
  {
    type: "select",
    name: "5f60a00c2ead6",
    options: [{ text: "0", value: 0 }],
    firstText: "Réduction du volume de la boîte mail de",
    questionName: "5f554eb63be47",
    secondText: "Go",
  },
  {
    type: "select",
    name: "5f60a01a6dc3a",
    options: [
      { text: "0", value: 0 },
      { text: "1", value: 1 },
      { text: "2", value: 2 },
      { text: "3", value: 3 },
      { text: "4", value: 4 },
      { text: "5", value: 5 },
      { text: "6", value: 6 },
      { text: "7", value: 7 },
      { text: "8", value: 8 },
      { text: "9", value: 9 },
      { text: "10", value: 10 },
      { text: "11", value: 11 },
      { text: "12", value: 12 },
      { text: "13", value: 13 },
      { text: "14", value: 14 },
      { text: "15", value: 15 },
      { text: "16", value: 16 },
    ],
    firstText: "Réduction du volume de stockage en ligne de",
    questionName: "5f554eddc68dd",
    secondText: "Mo",
  },
];
