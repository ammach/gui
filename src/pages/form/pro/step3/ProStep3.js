import { Form } from "antd";
import React, { useEffect, useState } from "react";
import { Form as ConfiguredForm } from "@components/form/Form";
import { ReactComponent as TeaSvg } from "@components/form/formSlider/tea.svg";
import { ReactComponent as CapsuleSvg } from "@components/form/formSlider/capsule.svg";
import { ReactComponent as CoffeeSvg } from "@components/form/formSlider/coffee.svg";
import { FormSlider } from "@components/form/formSlider/FormSlider";
import { MealsOfWeek } from "@components/form/mealsOfWeek/MealsOfWeek";
import { proStep3State, proStep3ActionReductionState } from "./ProStep3State";
import { FormItemActionReduction } from "@components/form/action/formItemActionReduction/FormItemActionReduction";
import {
  REPAS_QUESTION1,
  REPAS_QUESTION1_ERROR_MSG,
  SAVIER_VOUS_RESTAU,
  REPAS_QUESTION1_INFO,
  CURSEUR_BOISSONS,
} from "@utils/constants";
import {
  saveResponsesOfQuestionsStep,
  getResponsesOfQuestionsOfStep,
  saveSettingsStep,
  getSettingsOfStep,
} from "@services/responseService";
import {
  question1_subQuestions,
  actionReductionDataDejeuners,
  curseurQuestion,
  actionReductionDataCafe,
} from "./ProStep3Config";

// Restauration
export function ProStep3({ step, setNextStep }) {
  const [form] = Form.useForm();
  const [render, setRender] = useState(0);
  const [switch1Value, setSwitch1Value] = useState(false);
  const [switch2Value, setSwitch2Value] = useState(false);

  const [slider1Value, setSlider1Value] = useState(0);
  const [slider2Value, setSlider2Value] = useState(0);
  const [slider3Value, setSlider3Value] = useState(0);

  const [question1State, setQuestion1State] = useState({
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
  });

  const handleSwitch1Change = (isChecked) => {
    setSwitch1Value(isChecked);
  };

  const handleSwitch2Change = (isChecked) => {
    setSwitch2Value(isChecked);
  };

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
      setQuestion1State(form.getFieldValue("repas_question1"));
      setSlider1Value(form.getFieldValue("5f5550724626b"));
      setSlider2Value(form.getFieldValue("5f55508b92e6c"));
      setSlider3Value(form.getFieldValue("5f5550b00730d"));
    };

    const setSettingsOfStep = (settingsOfStep) => {
      settingsOfStep.forEach(({ question, response }) => {
        form.setFieldsValue({
          [question]: response,
        });
      });
      setSwitch1Value(form.getFieldValue("restauration-switch-1"));
      setSwitch2Value(form.getFieldValue("restauration-switch-2"));
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
    saveResponsesOfQuestionsStep(proStep3State(values), step);
    saveSettingsStep(proStep3ActionReductionState(values), step);
    const submitButton = document.querySelector('[type="submit"]');
    submitButton.blur();
    setNextStep();
  };

  const onFieldsChange = () => {
    setRender(Math.random);
  };

  return (
    <ConfiguredForm
      id={step}
      form={form}
      onFinish={onFinish}
      onFinishFailed={() => console.log("onFinishFailed")}
      onFieldsChange={onFieldsChange}
    >
      <div className="wizard-content-right-form-parent">
        <div className="pro-step-title-container">
          <span className="pro-step-title">
            Restauration aux heures de bureaux
          </span>
        </div>

        <MealsOfWeek
          form={form}
          name="repas_question1"
          questions={question1_subQuestions}
          label={REPAS_QUESTION1}
          tooltipTitle={REPAS_QUESTION1_INFO}
          errorMsg={REPAS_QUESTION1_ERROR_MSG}
          state={question1State}
        />
      </div>

      <div className="forms-margin">
        <FormItemActionReduction
          form={form}
          title="Déjeuners"
          savierVous={SAVIER_VOUS_RESTAU}
          saviezVousPosition={-1}
          selectDetail={actionReductionDataDejeuners}
          switchName="restauration-switch-1"
          setSwitchValue={handleSwitch1Change}
          isOpened={switch1Value}
        />
      </div>

      <div className="wizard-content-right-form-parent">
        <div className="forms-margin boissons-chaudes">
          <FormSlider
            form={form}
            labels={CURSEUR_BOISSONS}
            questions={[
              curseurQuestion(
                "Café en capsule",
                "5f5550724626b",
                <CapsuleSvg />,
                slider1Value,
                setSlider1Value
              ),
              curseurQuestion(
                "Café en vrac",
                "5f55508b92e6c",
                <CoffeeSvg />,
                slider2Value,
                setSlider2Value
              ),
              curseurQuestion(
                "Thé",
                "5f5550b00730d",
                <TeaSvg />,
                slider3Value,
                setSlider3Value
              ),
            ]}
          />
        </div>
      </div>

      <div className="forms-margin">
        <FormItemActionReduction
          form={form}
          title="Thé et café"
          savierVous={SAVIER_VOUS_RESTAU}
          saviezVousPosition={0}
          selectDetail={actionReductionDataCafe}
          switchName="restauration-switch-2"
          setSwitchValue={handleSwitch2Change}
          isOpened={switch2Value}
          render={render}
        />
      </div>
    </ConfiguredForm>
  );
}
