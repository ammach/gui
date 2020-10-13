import React, { useState, useEffect } from "react";
import { Form } from "antd";
import { Form as ConfiguredForm } from "@components/form/Form";
import { FormCounter } from "@components/form/formCounter/FormCounter";
import {
  EQUIPMENT_QUESTION1,
  EQUIPMENT_QUESTION2,
  EQUIPMENT_QUESTION3,
  EQUIPMENT_QUESTION4,
  EQUIPMENT_QUESTION5,
  EQUIPMENT_QUESTION6,
  EQUIPMENT_QUESTION7,
  EQUIPMENT_QUESTION8,
  EQUIPMENT_QUESTION9,
  EQUIPMENT_QUESTION10,
  EQUIPMENT_QUESTION11,
  EQUIPMENT_QUESTION12,
  EQUIPMENT_ERROR_MSG,
  EQUIPMENT_SAVIEZ_VOUS,
} from "@utils/constants";
import { optionsFibre, selectDetailEquipment } from "./step2Config";
import {
  saveResponsesOfQuestionsStep,
  getResponsesOfQuestionsOfStep,
  saveSettingsStep,
  getSettingsOfStep,
} from "@services/responseService";
import { FormItemActionReduction } from "@components/form/action/formItemActionReduction/FormItemActionReduction";
import { FormItemSelect } from "@components/form/formItemSelect/FormItemSelect";
import { FormItemInputNumberWithUnit } from "@components/form/formItemInputNumberWithUnit/FormItemInputNumberWithUnit";
import {
  equipmentstep2State,
  equipment2ActionReductionState,
} from "./step2State";
// Équipement du logement
export function PersoStep2({ step, setNextStep }) {
  const [form] = Form.useForm();
  const [render, setRender] = useState(0);
  const [isReductionActionOpened, setReductionActionOpened] = useState(false);
  const [question1Count, setQuestion1Count] = useState(0);
  const [question2Count, setQuestion2Count] = useState(0);
  const [question3Count, setQuestion3Count] = useState(0);
  const [question4Count, setQuestion4Count] = useState(0);
  const [question5Count, setQuestion5Count] = useState(0);
  const [question6Count, setQuestion6Count] = useState(0);
  const [question7Input, setQuestion7Input] = useState(0);
  const [question8Count, setQuestion8Count] = useState(0);
  const [question9Input, setQuestion9Input] = useState(0);
  const [question10Select, setQuestion10Select] = useState("Oui");
  const [question11Count, setQuestion11Count] = useState(0);
  const [question12Input, setQuestion12Input] = useState(0);

  const handleSwitchReductionActionChange = (isChecked) => {
    setReductionActionOpened(isChecked);
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
      setQuestion1Count(form.getFieldValue("5f556168dab39"));
      setQuestion2Count(form.getFieldValue("5f5561e5eb854"));
      setQuestion3Count(form.getFieldValue("5f55664839d67"));
      setQuestion4Count(form.getFieldValue("5f55667459f85"));
      setQuestion5Count(form.getFieldValue("5f55669ad8400"));
      setQuestion6Count(form.getFieldValue("5f5566c7a6e7c"));
      setQuestion7Input(form.getFieldValue("5f5566d80117c"));
      setQuestion8Count(form.getFieldValue("5f5566f657df4"));
      setQuestion9Input(form.getFieldValue("5f5566f868949"));
      setQuestion10Select(form.getFieldValue("5f556711c1671"));
      setQuestion11Count(form.getFieldValue("5f55674380953"));
      setQuestion12Input(form.getFieldValue("5f5567451cb10"));
    };

    const setSettingsOfStep = (settingsOfStep) => {
      settingsOfStep.forEach(({ question, response }) => {
        form.setFieldsValue({
          [question]: response,
        });
      });

      setReductionActionOpened(form.getFieldValue("equipment-switch-1"));
      console.log(form.getFieldValue("equipment"));
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
    saveResponsesOfQuestionsStep(equipmentstep2State(values), step);
    saveSettingsStep(equipment2ActionReductionState(values), step);
    const submitButton = document.querySelector('[type="submit"]');
    submitButton.blur();
    setNextStep();
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
          <span className="pro-step-title">Équipement du logement</span>
        </div>
        <div className="forms-margin">
          <FormCounter
            form={form}
            iconCounter={false}
            name="5f556168dab39"
            textCounter={EQUIPMENT_QUESTION1}
            value={question1Count}
          />
        </div>
        <div className="forms-margin">
          <FormCounter
            form={form}
            iconCounter={false}
            name="5f5561e5eb854"
            textCounter={EQUIPMENT_QUESTION2}
            value={question2Count}
          />
        </div>
        <div className="forms-margin">
          <FormCounter
            form={form}
            iconCounter={false}
            name="5f55664839d67"
            textCounter={EQUIPMENT_QUESTION3}
            value={question3Count}
          />
        </div>
        <div className="forms-margin">
          <FormCounter
            form={form}
            iconCounter={false}
            name="5f55667459f85"
            textCounter={EQUIPMENT_QUESTION4}
            value={question4Count}
          />
        </div>
        <div className="forms-margin">
          <FormCounter
            form={form}
            iconCounter={false}
            name="5f55669ad8400"
            textCounter={EQUIPMENT_QUESTION5}
            value={question5Count}
          />
        </div>
        <div className="forms-margin">
          <FormCounter
            form={form}
            iconCounter={false}
            name="5f5566c7a6e7c"
            textCounter={EQUIPMENT_QUESTION6}
            value={question6Count}
          />
        </div>
        <div className="forms-margin">
          <FormItemInputNumberWithUnit
            form={form}
            name="5f5566d80117c"
            tooltipTitle={false}
            label={EQUIPMENT_QUESTION7}
            rules={[{ required: false, message: EQUIPMENT_ERROR_MSG }]}
            value={question7Input}
            unit={"ans"}
            onChange={onChange}
          />
        </div>
        <div className="forms-margin">
          <FormCounter
            form={form}
            iconCounter={false}
            name="5f5566f657df4"
            textCounter={EQUIPMENT_QUESTION8}
            value={question8Count}
          />
        </div>
        <div className="forms-margin">
          <FormItemInputNumberWithUnit
            form={form}
            name="5f5566f868949"
            tooltipTitle={false}
            label={EQUIPMENT_QUESTION9}
            rules={[{ required: false, message: EQUIPMENT_ERROR_MSG }]}
            value={question9Input}
            unit={"ans"}
            onChange={onChange}
          />
        </div>
        <div className="forms-margin">
          <FormItemSelect
            form={form}
            name="5f556711c1671"
            label={EQUIPMENT_QUESTION10}
            tooltipTitle={false}
            options={optionsFibre}
            value={question10Select}
          />
        </div>
        <div className="forms-margin">
          <FormCounter
            form={form}
            iconCounter={false}
            name="5f55674380953"
            textCounter={EQUIPMENT_QUESTION11}
            value={question11Count}
          />
        </div>
        <FormItemInputNumberWithUnit
          form={form}
          name="5f5567451cb10"
          tooltipTitle={false}
          label={EQUIPMENT_QUESTION12}
          rules={[{ required: false, message: EQUIPMENT_ERROR_MSG }]}
          value={question12Input}
          unit={"ans"}
          onChange={onChange}
        />
      </div>
      <div className="forms-margin">
        <FormItemActionReduction
          form={form}
          title="Appareils et électroménager"
          savierVous={EQUIPMENT_SAVIEZ_VOUS}
          saviezVousPosition={1}
          selectDetail={selectDetailEquipment}
          switchName="equipment-switch-1"
          setSwitchValue={handleSwitchReductionActionChange}
          isOpened={isReductionActionOpened}
          render={render}
        />
      </div>
    </ConfiguredForm>
  );
}
