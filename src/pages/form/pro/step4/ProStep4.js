import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { Form as ConfiguredForm } from "@components/form/Form";
import { FormItemInputNumber } from "@components/form/formItemInputNumber/FormItemInputNumber";
import { FormItemSelect } from "@components/form/formItemSelect/FormItemSelect";
import { FormItemActionReduction } from "@components/form/action/formItemActionReduction/FormItemActionReduction";
import { proStep4State, proStep4ActionReductionState } from "./ProStep4State";
import {
  DISTANCE_DOMICILE_TRAVAIL,
  DISTANCE_DOMICILE_TRAVAIL_ERROR_MSG,
  MODE_DEPLACEMENT,
  MOTORISATION,
  MOTORISATION_INFOS,
  SAVIER_VOUS_TRAJETS,
} from "@utils/constants";
import {
  saveResponsesOfQuestionsStep,
  getResponsesOfQuestionsOfStep,
  saveSettingsStep,
  getSettingsOfStep,
} from "@services/responseService";
import {
  modeDeplacementOptions,
  motorisationOptions,
  actionReductionData,
} from "./ProStep4Config";

// Trajets
export function ProStep4({ step, setNextStep }) {
  const [form] = Form.useForm();

  const [switchValue, setSwitchValue] = useState(true);
  const [modeDeplacement, setModeDeplacement] = useState(
    modeDeplacementOptions[0].value
  );

  const handleSwitchChange = (isChecked) => {
    setSwitchValue(isChecked);
  };

  const handleModeDeplacementChange = (mode) => {
    setModeDeplacement(mode);
  };

  useEffect(() => {
    if (modeDeplacement === "pied-velo") {
      setSwitchValue(true);
    }
  }, [modeDeplacement]);

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
      setModeDeplacement(form.getFieldValue("5f55561b34276"));
    };

    const setSettingsOfStep = (settingsOfStep) => {
      settingsOfStep.forEach(({ question, response }) =>
        form.setFieldsValue({
          [question]: response,
        })
      );
      setSwitchValue(form.getFieldValue("trajets-switch-1"));
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
    saveResponsesOfQuestionsStep(proStep4State(values), step);
    saveSettingsStep(proStep4ActionReductionState(values), step);
    const submitButton = document.querySelector('[type="submit"]');
    submitButton.blur();
    setNextStep();
  };

  return (
    <ConfiguredForm
      id={step}
      form={form}
      onFinish={onFinish}
      basicInputs={["without"]}
    >
      <div className="wizard-content-right-form-parent">
        <div className="pro-step-title-container">
          <span className="pro-step-title">Trajets domicile - travail</span>
        </div>

        <FormItemInputNumber
          name="5f55554022dc3"
          label={DISTANCE_DOMICILE_TRAVAIL}
          rules={[
            { required: true, message: DISTANCE_DOMICILE_TRAVAIL_ERROR_MSG },
          ]}
        />

        <div className="forms-margin">
          <FormItemSelect
            name="5f55561b34276"
            label={MODE_DEPLACEMENT}
            options={modeDeplacementOptions}
            onChange={handleModeDeplacementChange}
            disabled={false}
          />
        </div>

        <div className="forms-margin">
          <FormItemSelect
            name="5f555681b8e00"
            label={MOTORISATION}
            tooltipTitle={MOTORISATION_INFOS}
            options={motorisationOptions}
            disabled={
              modeDeplacement === "metro-tramway" ||
              modeDeplacement === "train-rer" ||
              modeDeplacement === "tgv"
            }
          />
        </div>
      </div>

      <div className="forms-margin">
        <FormItemActionReduction
          form={form}
          title="Mode de déplacement"
          savierVous={SAVIER_VOUS_TRAJETS}
          saviezVousPosition={0}
          selectDetail={actionReductionData}
          switchName="trajets-switch-1"
          setSwitchValue={handleSwitchChange}
          isOpened={switchValue}
        />
      </div>
    </ConfiguredForm>
  );
}
