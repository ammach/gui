import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { Form as ConfiguredForm } from "@components/form/Form";
import { FormItemMultipleInputNumber } from "@components/form/formItemMultipleInputNumber/FormItemMultipleInputNumber";
import { Overlay } from "@components/overlay/Overlay";
import { FormItemActionReduction } from "@components/form/action/formItemActionReduction/FormItemActionReduction";
import {
  saveResponsesOfQuestionsStep,
  saveSettingsStep,
  getResponsesOfQuestionsOfStep,
  getSettingsOfStep,
} from "@services/responseService";
import { scrollToTopOfThePage } from "@hooks/window";
import {
  overlay_items,
  question1_questions,
  question2_questions,
  selectDetail,
} from "./step4Config";
import {
  NUMERIC_QUESTION1_LABEL,
  NUMERIC_QUESTION1_TOOLTIP,
  NUMERIC_QUESTION2_LABEL,
  NUMERIC_SAVIEZ_VOUS,
} from "@utils/constants";
import { step4ActionReductionState, step4State } from "./step4State";

// Numérique
export function PersoStep4({ step, setNextStep }) {
  const [form] = Form.useForm();
  const [isReductionAction1Opened, setReductionAction1Opened] = useState(false);

  const handleSwitchReductionAction1Change = (isChecked) => {
    setReductionAction1Opened(isChecked);
  };

  useEffect(() => {
    scrollToTopOfThePage();
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
    };

    const setSettingsOfStep = (settingsOfStep) => {
      settingsOfStep.forEach(({ question, response }) =>
        form.setFieldsValue({
          [question]: response,
        })
      );
      setReductionAction1Opened(
        form.getFieldValue("action-reduction-switch-1")
      );
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
    saveResponsesOfQuestionsStep(step4State(values), step);
    saveSettingsStep(step4ActionReductionState(values), step);
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
          <span className="pro-step-title">Temps passé sur internet</span>
        </div>
        <div className="forms-margin">
          <FormItemMultipleInputNumber
            form={form}
            name="question_1"
            label={NUMERIC_QUESTION1_LABEL}
            questions={question1_questions}
            tooltipTitle={NUMERIC_QUESTION1_TOOLTIP}
          />
        </div>
        <Overlay
          title="Consommation électrique en fonction de la connectique"
          items={overlay_items}
        />
        <div className="forms-margin">
          <FormItemMultipleInputNumber
            form={form}
            name="question_2"
            label={NUMERIC_QUESTION2_LABEL}
            questions={question2_questions}
          />
        </div>
      </div>
      <div className="forms-margin">
        <FormItemActionReduction
          form={form}
          title="Internet"
          savierVous={NUMERIC_SAVIEZ_VOUS}
          saviezVousPosition={0}
          selectDetail={selectDetail}
          switchName="action-reduction-switch-1"
          setSwitchValue={handleSwitchReductionAction1Change}
          isOpened={isReductionAction1Opened}
        />
      </div>
    </ConfiguredForm>
  );
}
