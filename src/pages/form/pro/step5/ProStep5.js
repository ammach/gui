import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { Form as ConfiguredForm } from "@components/form/Form";
import { FormItemInputNumber } from "@components/form/formItemInputNumber/FormItemInputNumber";
import { FormItemMultipleInputNumber } from "@components/form/formItemMultipleInputNumber/FormItemMultipleInputNumber";
import { FormItemActionReduction } from "@components/form/action/formItemActionReduction/FormItemActionReduction";
import { TitleWithHorizontalLine } from "@components/title/TitleWithHorizontalLine";
import { proStep5State, proStep5ActionReductionState } from "./ProStep5State";
import {
  NBR_KM_VOITURE,
  QUESTION2_NBR_TRAJETS_AR,
  QUESTION3_NBR_TRAJETS_AR,
  QUESTION4_NBR_TRAJETS_AR,
  QUESTION5_NBR_TRAJETS_AR,
  QUESTION6_NBR_TRAJETS_AR,
  QUESTION7_NBR_TRAJETS_AR,
  QUESTION8_NBR_VOLS_AR,
  QUESTION9_NBR_VOLS_AR,
  QUESTION10_NBR_VOLS_AR,
  QUESTION11_NBR_VOLS_AR,
  SAVIER_VOUS_DEPLACEMENT,
  DEPLACEMENT_MSG_ERROR,
} from "@utils/constants";
import {
  saveResponsesOfQuestionsStep,
  getResponsesOfQuestionsOfStep,
  saveSettingsStep,
  getSettingsOfStep,
} from "@services/responseService";
import {
  question8options,
  question9options,
  question10options,
  question11options,
  actionReductionData,
} from "./ProStep5Config";

// Déplacements
export function ProStep5({ step, setNextStep }) {
  const [form] = Form.useForm();

  const [switchValue, setSwitchValue] = useState(false);
  const [question5trajetsAr, setQuestion5trajetsAr] = useState(0);

  const handleSwitchChange = (isChecked) => {
    setSwitchValue(isChecked);
  };

  const handleQuestion5trajetsArChange = (value) => {
    setQuestion5trajetsAr(value);
  };

  // tarjets AR data pour les champs de saisies
  const trajetsARIndex = [2, 3, 4, 5, 6];
  const trajetsARDynamicProps = [
    {
      label: QUESTION2_NBR_TRAJETS_AR,
      name: "5f5557c81d9d6",
    },
    {
      label: QUESTION3_NBR_TRAJETS_AR,
      name: "5f5557ec74a11",
    },
    {
      label: QUESTION4_NBR_TRAJETS_AR,
      name: "5f555809e50b5",
    },
    {
      label: QUESTION5_NBR_TRAJETS_AR,
      name: "5f5558209ce59",
      onChange: handleQuestion5trajetsArChange,
    },
    {
      label: QUESTION6_NBR_TRAJETS_AR,
      name: "5f55582edaeda",
    },
  ];

  // vols AR data pour les champs multiples
  const volsARIndex = [8, 9, 10, 11];
  const volsARDynamicProps = [
    {
      label: QUESTION8_NBR_VOLS_AR,
      questions: question8options,
    },
    {
      label: QUESTION9_NBR_VOLS_AR,
      questions: question9options,
    },
    {
      label: QUESTION10_NBR_VOLS_AR,
      questions: question10options,
    },
    {
      label: QUESTION11_NBR_VOLS_AR,
      questions: question11options,
    },
  ];

  useEffect(() => {
    if (question5trajetsAr === 0) {
      setSwitchValue(true);
    }
  }, [question5trajetsAr]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const setReponsesOfStep = (stepState) => {
      stepState.forEach(({ question, response, actions }) => {
        form.setFieldsValue({
          [question]: response,
        });
        if (actions) {
          actions.forEach(({ id, response }) => {
            form.setFieldsValue({
              [id]: response,
            });
          });
        }
      });
      setQuestion5trajetsAr(form.getFieldValue("question5_NbrTrajetsAr"));
    };

    const setSettingsOfStep = (settingsOfStep) => {
      settingsOfStep.forEach(({ question, response }) =>
        form.setFieldsValue({
          [question]: response,
        })
      );
      setSwitchValue(form.getFieldValue("deplacement-switch-1"));
    };

    const stepState = getResponsesOfQuestionsOfStep(step);
    if (stepState) {
      setReponsesOfStep(stepState);
    }

    const settingsOfStep = getSettingsOfStep(step);
    if (settingsOfStep) {
      setSettingsOfStep(settingsOfStep);
    }
  }, [form, step]);

  const onFinish = (values) => {
    saveResponsesOfQuestionsStep(proStep5State(values), step);
    saveSettingsStep(proStep5ActionReductionState(values), step);
    const submitButton = document.querySelector('[type="submit"]');
    submitButton.blur();
    setNextStep();
  };

  return (
    <ConfiguredForm
      id={step}
      form={form}
      onFinish={onFinish}
      onFinishFailed={() => console.log("onFinishFailed")}
    >
      <div className="wizard-content-right-form-parent">
        <div className="pro-step-title-container">
          <span className="pro-step-title">Déplacements professionnels</span>
        </div>

        <TitleWithHorizontalLine title="En voiture" />
        <div className="forms-margin">
          <FormItemInputNumber
            name="5f5557936a4cd"
            label={NBR_KM_VOITURE}
            rules={[{ required: true, message: DEPLACEMENT_MSG_ERROR }]}
          />
        </div>
        <div className="forms-margin">
          <TitleWithHorizontalLine title="En train" />
        </div>
        {trajetsARIndex.map((index, key) => (
          <div className="forms-margin" key={key}>
            <FormItemInputNumber
              rules={[{ required: true, message: DEPLACEMENT_MSG_ERROR }]}
              {...trajetsARDynamicProps[key]}
            />
          </div>
        ))}
        <div className="forms-margin">
          <TitleWithHorizontalLine title="En avion" />
        </div>
        <div className="forms-margin">
          <FormItemInputNumber
            rules={[{ required: true, message: DEPLACEMENT_MSG_ERROR }]}
            label={QUESTION7_NBR_TRAJETS_AR}
            name="5f55584be6d5b"
          />
        </div>
        {volsARIndex.map((index, key) => (
          <div className="forms-margin" key={key}>
            <FormItemMultipleInputNumber
              form={form}
              name={`deplacement-multi-${index}`}
              {...volsARDynamicProps[key]}
            />
          </div>
        ))}
      </div>

      <div className="forms-margin">
        <FormItemActionReduction
          form={form}
          title="Mode de déplacement"
          savierVous={SAVIER_VOUS_DEPLACEMENT}
          saviezVousPosition={1}
          selectDetail={actionReductionData}
          switchName="deplacement-switch-1"
          setSwitchValue={handleSwitchChange}
          isOpened={switchValue}
        />
      </div>
    </ConfiguredForm>
  );
}
