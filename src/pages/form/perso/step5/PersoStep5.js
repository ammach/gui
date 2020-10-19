import React, { useEffect, useState } from "react";
import { Form } from "antd";
import {
  CoffeeIcon,
  SodaIcon,
  WaterIcon,
  WineIcon,
  BeerIcon,
  WhiskyIcon,
} from "@components/icons/Icons";
import { Form as ConfiguredForm } from "@components/form/Form";
import {
  ALIMENTATION_QUESTION1,
  ALIMENTATION_QUESTION2,
  ALIMENTATION_QUESTION3,
  ALIMENTATION_QUESTION4,
  ALIMENTATION_QUESTION5,
  ALIMENTATION_QUESTION6,
  ALIMENTATION_QUESTION7,
  ALIMENTATION_QUESTION8,
  ALIMENTATION_QUESTION9,
  POPIN_INFOS,
  OVERLAY_TITLE,
  ALIMENATTION_ERROR_MSG,
  ALIMENTATION_QUESTION3_TOOTLTIP,
  ALIMENTATION_QUESTION4_TOOTLTIP,
  ALIMENTATION_SAVIEZ_VOUS,
} from "@utils/constants";
import { FormCounter } from "@components/form/formCounter/FormCounter";
import { MealsOfWeek } from "@components/form/mealsOfWeek/MealsOfWeek";
import { Overlay } from "@components/overlay/Overlay";
import { FormItemActionReduction } from "@components/form/action/formItemActionReduction/FormItemActionReduction";
import {
  saveResponsesOfQuestionsStep,
  getResponsesOfQuestionsOfStep,
  saveSettingsStep,
  getSettingsOfStep,
} from "@services/responseService";
import { scrollToTopOfThePage } from "@hooks/window";
import { step5State, step5ActionReductionState } from "./step5State";
import {
  question2_subQuestions,
  question3_subQuestions,
  question4_subQuestions,
  selectDetail,
  selectDetail2,
} from "./step5Config";

// Alimentation
export function PersoStep5({ step, setNextStep }) {
  const [form] = Form.useForm();
  const [question1Count, setQuestion1Count] = useState(0);
  const [question5Count, setQuestion5Count] = useState(0);
  const [question6Count, setQuestion6Count] = useState(0);
  const [question7Count, setQuestion7Count] = useState(0);
  const [question8Count, setQuestion8Count] = useState(0);
  const [question9Count, setQuestion9Count] = useState(0);
  const [question2State, setQuestion2State] = useState({
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
  });
  const [question3State, setQuestion3State] = useState({
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
  });
  const [question4State, setQuestion4State] = useState({
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
  });
  const [isReductionAction1Opened, setReductionAction1Opened] = useState(false);
  const [isReductionAction2Opened, setReductionAction2Opened] = useState(false);

  const handleSwitchReductionAction1Change = (isChecked) => {
    setReductionAction1Opened(isChecked);
  };

  const handleSwitchReductionAction2Change = (isChecked) => {
    setReductionAction2Opened(isChecked);
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

      setQuestion1Count(form.getFieldValue("5f5570e5d882c"));
      setQuestion5Count(form.getFieldValue("5f557459e6c45"));
      setQuestion6Count(form.getFieldValue("5f5574ead218e"));
      setQuestion7Count(form.getFieldValue("5f557508ea4c5"));
      setQuestion8Count(form.getFieldValue("5f557531751f2"));
      setQuestion9Count(form.getFieldValue("5f55754725a12"));

      setQuestion2State(form.getFieldValue("alimentation_question2"));
      setQuestion3State(form.getFieldValue("alimentation_question3"));
      setQuestion4State(form.getFieldValue("alimentation_question4"));
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
    saveResponsesOfQuestionsStep(step5State(values), step);
    saveSettingsStep(step5ActionReductionState(values), step);
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
          <span className="pro-step-title">Repas à la maison</span>
        </div>

        <FormCounter
          form={form}
          name="5f5570e5d882c"
          iconCounter={CoffeeIcon}
          textCounter={ALIMENTATION_QUESTION1}
          value={question1Count}
        />
        <Overlay
          title={OVERLAY_TITLE}
          items={[
            {
              text: POPIN_INFOS,
            },
          ]}
        />
        <div className="forms-margin">
          <MealsOfWeek
            form={form}
            name="alimentation_question2"
            questions={question2_subQuestions}
            label={ALIMENTATION_QUESTION2}
            errorMsg={ALIMENATTION_ERROR_MSG}
            state={question2State}
          />
        </div>
        <div className="forms-margin">
          <MealsOfWeek
            form={form}
            name="alimentation_question3"
            questions={question3_subQuestions}
            label={ALIMENTATION_QUESTION3}
            tooltipTitle={ALIMENTATION_QUESTION3_TOOTLTIP}
            errorMsg={ALIMENATTION_ERROR_MSG}
            state={question3State}
          />
        </div>
        <div className="forms-margin">
          <MealsOfWeek
            form={form}
            name="alimentation_question4"
            questions={question4_subQuestions}
            label={ALIMENTATION_QUESTION4}
            tooltipTitle={ALIMENTATION_QUESTION4_TOOTLTIP}
            errorMsg={ALIMENATTION_ERROR_MSG}
            state={question4State}
          />
        </div>
      </div>
      <div className="forms-margin">
        <FormItemActionReduction
          form={form}
          title="Déjeuners et dîners"
          savierVous={ALIMENTATION_SAVIEZ_VOUS}
          saviezVousPosition={2}
          selectDetail={selectDetail}
          switchName="action-reduction-switch-1"
          setSwitchValue={handleSwitchReductionAction1Change}
          isOpened={isReductionAction1Opened}
        />
      </div>
      <div className="wizard-content-right-form-parent">
        <div className="forms-margin">
          <FormCounter
            form={form}
            name="5f557459e6c45"
            iconCounter={SodaIcon}
            textCounter={ALIMENTATION_QUESTION5}
            value={question5Count}
          />
        </div>
        <FormCounter
          form={form}
          name="5f5574ead218e"
          iconCounter={WaterIcon}
          textCounter={ALIMENTATION_QUESTION6}
          value={question6Count}
        />
        <FormCounter
          form={form}
          name="5f557508ea4c5"
          iconCounter={WineIcon}
          textCounter={ALIMENTATION_QUESTION7}
          value={question7Count}
        />
        <FormCounter
          form={form}
          name="5f557531751f2"
          iconCounter={BeerIcon}
          textCounter={ALIMENTATION_QUESTION8}
          value={question8Count}
        />
        <FormCounter
          form={form}
          name="5f55754725a12"
          iconCounter={WhiskyIcon}
          textCounter={ALIMENTATION_QUESTION9}
          value={question9Count}
        />
      </div>
      <div className="forms-margin">
        <FormItemActionReduction
          form={form}
          title="Boissons"
          selectDetail={selectDetail2}
          switchName="action-reduction-switch-2"
          setSwitchValue={handleSwitchReductionAction2Change}
          isOpened={isReductionAction2Opened}
        />
      </div>
    </ConfiguredForm>
  );
}
