import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { Form as ConfiguredForm } from "@components/form/Form";
import { TitleWithHorizontalLine } from "@components/title/TitleWithHorizontalLine";
import { FormItemInputNumberWithUnit } from "@components/form/formItemInputNumberWithUnit/FormItemInputNumberWithUnit";
import { FormItemActionReduction } from "@components/form/action/formItemActionReduction/FormItemActionReduction";
import { FormItemSelect } from "@components/form/formItemSelect/FormItemSelect";
import { FormItemWithTwoInputs } from "@components/form/formItemWithTwoInputs/FormItemWithTwoInputs";
import { FormItemMultipleInputNumber } from "@components/form/formItemMultipleInputNumber/FormItemMultipleInputNumber";
import {
  saveResponsesOfQuestionsStep,
  getResponsesOfQuestionsOfStep,
  saveSettingsStep,
  getSettingsOfStep,
} from "@services/responseService";
import { step6State, step6ActionReductionState } from "./step6State";
import {
  DEPLACEMENTS_QUESTION1,
  DEPLACEMENTS_QUESTION2,
  DEPLACEMENTS_QUESTION3,
  DEPLACEMENTS_QUESTION4,
  DEPLACEMENTS_QUESTION5,
  DEPLACEMENTS_QUESTION6,
  DEPLACEMENTS_QUESTION7,
  DEPLACEMENTS_QUESTION1_ERROR_MSG,
  DEPLACEMENTS_SAVIEZ_VOUS,
} from "@utils/constants";
import { scrollToTopOfThePage } from "@hooks/window";
import {
  question2_options,
  actionReduction1_selectDetail,
  question4_questions,
  question5_questions,
  actionReduction2_selectDetail,
  question6_questions,
  question7_questions,
  actionReduction3_selectDetail,
  question3_questions,
} from "./step6Config";

// Déplacements
export function PersoStep6({ step, setNextStep }) {
  const [form] = Form.useForm();
  const [render, setRender] = useState(0);

  const [, setQuestion1DefaultValue] = useState();
  const [question3IncomingChoice, setQuestion3IncomingChoice] = useState(
    "gasoline"
  );
  const [isReductionAction1Opened, setReductionAction1Opened] = useState(false);
  const [isReductionAction2Opened, setReductionAction2Opened] = useState(false);
  const [isReductionAction3Opened, setReductionAction3Opened] = useState(false);

  const handleSwitchReductionAction1Change = (isChecked) => {
    setReductionAction1Opened(isChecked);
  };

  const handleSwitchReductionAction2Change = (isChecked) => {
    setReductionAction2Opened(isChecked);
  };
  const handleSwitchReductionAction3Change = (isChecked) => {
    setReductionAction3Opened(isChecked);
  };

  const getNewChoice = (value) =>
    value === "Essence" || value === "Diesel" ? "gasoline" : "electric";

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
      setQuestion1DefaultValue(form.getFieldValue("5f5575ba93b32"));
      setQuestion3IncomingChoice(
        getNewChoice(form.getFieldValue("5f5575dc9b4ac"))
      );
    };

    const setSettingsOfStep = (settingsOfStep) => {
      settingsOfStep.forEach(({ question, response }) => {
        form.setFieldsValue({
          [question]: response,
        });
      });

      setReductionAction1Opened(
        form.getFieldValue("action-reduction-switch-1")
      );
      setReductionAction2Opened(
        form.getFieldValue("action-reduction-switch-2")
      );
      setReductionAction3Opened(
        form.getFieldValue("action-reduction-switch-3")
      );
    };

    const settingsOfStep = getSettingsOfStep(step);
    if (settingsOfStep) {
      setSettingsOfStep(settingsOfStep);
    }
    const stepState = getResponsesOfQuestionsOfStep(step);
    if (stepState) {
      setReponsesOfStep(stepState);
    }
  }, [form, step]);

  const onFinish = (values) => {
    saveResponsesOfQuestionsStep(step6State(values), step);
    saveSettingsStep(step6ActionReductionState(values), step);
    const submitButton = document.querySelector('[type="submit"]');
    submitButton.blur();
    setNextStep();
  };

  const onChangeQuestion2 = (value) => {
    setQuestion3IncomingChoice(getNewChoice(value));
  };

  const onChange = () => {
    setRender(Math.random);
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
          <span className="pro-step-title">Déplacements personnels</span>
        </div>

        <TitleWithHorizontalLine title="En voiture" />
        <div className="forms-margin">
          <FormItemInputNumberWithUnit
            form={form}
            name="5f5575ba93b32"
            label={DEPLACEMENTS_QUESTION1}
            unit="Km"
            rules={[
              { required: true, message: DEPLACEMENTS_QUESTION1_ERROR_MSG },
            ]}
            onChange={onChange}
          />
        </div>
        <div className="forms-margin">
          <FormItemSelect
            name="5f5575dc9b4ac"
            label={DEPLACEMENTS_QUESTION2}
            options={question2_options}
            onChange={onChangeQuestion2}
            disabled={false}
          />
        </div>
        <div className="forms-margin">
          <FormItemWithTwoInputs
            form={form}
            label={DEPLACEMENTS_QUESTION3}
            incomingChoice={question3IncomingChoice}
            questions={question3_questions}
          />
        </div>
      </div>
      <div className="forms-margin">
        <FormItemActionReduction
          form={form}
          title="En voiture"
          selectDetail={actionReduction1_selectDetail}
          switchName="action-reduction-switch-1"
          setSwitchValue={handleSwitchReductionAction1Change}
          isOpened={isReductionAction1Opened}
          render={render}
        />
      </div>
      <div className="wizard-content-right-form-parent">
        <div className="forms-margin">
          <TitleWithHorizontalLine title="En train" />
        </div>
        <div className="forms-margin">
          <FormItemMultipleInputNumber
            form={form}
            name="multi1"
            label={DEPLACEMENTS_QUESTION4}
            questions={question4_questions}
          />
        </div>
        <div className="forms-margin">
          <TitleWithHorizontalLine title="En avion" />
        </div>
        <div className="forms-margin">
          <FormItemMultipleInputNumber
            form={form}
            name="multi2"
            label={DEPLACEMENTS_QUESTION5}
            questions={question5_questions}
          />
        </div>
      </div>
      <div className="forms-margin">
        <FormItemActionReduction
          form={form}
          title="Court courrier"
          selectDetail={actionReduction2_selectDetail}
          switchName="action-reduction-switch-2"
          setSwitchValue={handleSwitchReductionAction2Change}
          isOpened={isReductionAction2Opened}
        />
      </div>
      <div className="wizard-content-right-form-parent">
        <div className="forms-margin">
          <FormItemMultipleInputNumber
            form={form}
            name="multi3"
            label={DEPLACEMENTS_QUESTION6}
            questions={question6_questions}
          />
        </div>
        <div className="forms-margin">
          <FormItemMultipleInputNumber
            form={form}
            name="multi4"
            label={DEPLACEMENTS_QUESTION7}
            questions={question7_questions}
          />
        </div>
      </div>
      <div className="forms-margin">
        <FormItemActionReduction
          form={form}
          title="Long courrier"
          savierVous={DEPLACEMENTS_SAVIEZ_VOUS}
          saviezVousPosition={0}
          selectDetail={actionReduction3_selectDetail}
          switchName="action-reduction-switch-3"
          setSwitchValue={handleSwitchReductionAction3Change}
          isOpened={isReductionAction3Opened}
        />
      </div>
    </ConfiguredForm>
  );
}
