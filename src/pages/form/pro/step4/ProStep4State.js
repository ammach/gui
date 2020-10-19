export const proStep4ActionReductionState = (values) => {
  return [
    {
      question: "trajets-switch-1",
      response: values["trajets-switch-1"] || true,
    },
  ];
};

export const proStep4State = (values) => {
  const stepState = [
    {
      question: "5f55554022dc3",
      response: values["5f55554022dc3"],
      actions: [
        {
          id: "5f60a09bc059e",
          response: values["5f60a09bc059e"],
        },
        {
          id: "5f60a0ad1f52f",
          response: values["5f60a0ad1f52f"] || 0,
        },
      ],
    },
    {
      question: "5f55561b34276",
      response: values["5f55561b34276"],
      actions: [
        {
          id: "5f60a09bc059e",
          response: values["5f60a09bc059e"],
        },
        {
          id: "5f60a0ad1f52f",
          response: values["5f60a0ad1f52f"] || 0,
        },
      ],
    },
  ];

  if (values["5f55561b34276"] !== "pied-velo") {
    stepState.push({
      question: "5f555681b8e00",
      response: values["5f555681b8e00"],
      actions: [
        {
          id: "5f60a09bc059e",
          response: values["5f60a09bc059e"],
        },
        {
          id: "5f60a0ad1f52f",
          response: values["5f60a0ad1f52f"] || 0,
        },
      ],
    });
  }
  return stepState;
};
