import React, { useEffect, useState } from "react";
import { Form } from "antd";
import { Form as ConfiguredForm } from "@components/form/Form";
import { Overlay } from "@components/overlay/Overlay";
import { FormSlider } from "@components/form/formSlider/FormSlider";
import { FormItemInputNumber } from "@components/form/formItemInputNumber/FormItemInputNumber";
import { FormItemActionReduction } from "@components/form/action/formItemActionReduction/FormItemActionReduction";
import { proStep2State, proStep2ActionReductionState } from "./ProStep2State";
import {
  TAILLE_BOITE,
  TAILLE_BOITE_INFO,
  TAILLE_BOITE_ERROR_MSG,
  EMPREINTE_OVERLAY_TITLE,
  TAILLE_STOCKAGE,
  NBR_RECHERCHE,
  NBR_CONFERENCE,
  NBR_STREAMING,
  SAVIER_VOUS_EMPREINTE,
} from "@utils/constants";
import {
  saveResponsesOfQuestionsStep,
  getResponsesOfQuestionsOfStep,
  saveSettingsStep,
  getSettingsOfStep,
} from "@services/responseService";
import {
  QUESTION2_DEFAULT_VALUE,
  overlayItems,
  curseurQuestions,
  actionReductionData,
} from "./ProStep2Config";

// Empreinte numérique
export function ProStep2({ step, setNextStep }) {
  const [form] = Form.useForm();

  const [switchValue, setSwitchValue] = useState(false);
  const [nbrRecherche, setNbrRecherche] = useState(0);
  const [nbrConference, setNbrConference] = useState(0);
  const [nbrStreaming, setNbrStreaming] = useState(0);

  const handleSwitchChange = (isChecked) => {
    setSwitchValue(isChecked);
  };

  useEffect(() => {
    form.setFieldsValue({
      taille_stockage: QUESTION2_DEFAULT_VALUE,
    });
  }, [form]);

  useEffect(() => {
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
      setNbrRecherche(form.getFieldValue("nbr_recherche"));
      setNbrConference(form.getFieldValue("nbr_conference"));
      setNbrStreaming(form.getFieldValue("nbr_streaming"));
    };

    const setSettingsOfStep = (settingsOfStep) => {
      settingsOfStep.forEach(({ question, response }) =>
        form.setFieldsValue({
          [question]: response,
        })
      );
      setSwitchValue(form.getFieldValue("empreinte-switch-1"));
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
    saveResponsesOfQuestionsStep(proStep2State(values), step);
    saveSettingsStep(proStep2ActionReductionState(values), step);
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
          <span className="pro-step-title">Empreinte numérique</span>
        </div>

        <FormItemInputNumber
          name="taille_boite"
          label={TAILLE_BOITE}
          tooltipTitle={TAILLE_BOITE_INFO}
          rules={[{ required: true, message: TAILLE_BOITE_ERROR_MSG }]}
        />

        <div className="forms-margin">
          <Overlay title={EMPREINTE_OVERLAY_TITLE} items={overlayItems} />
        </div>

        <div className="forms-margin">
          <FormItemInputNumber
            name="taille_stockage"
            label={TAILLE_STOCKAGE}
            rules={[{ required: true, message: TAILLE_BOITE_ERROR_MSG }]}
          />
        </div>

        <div className="forms-margin">
          <FormSlider
            form={form}
            labels={NBR_RECHERCHE}
            questions={curseurQuestions(
              "",
              "nbr_recherche",
              nbrRecherche,
              setNbrRecherche
            )}
          />
        </div>

        <div className="forms-margin">
          <FormSlider
            form={form}
            labels={NBR_CONFERENCE}
            questions={curseurQuestions(
              "",
              "nbr_conference",
              nbrConference,
              setNbrConference
            )}
          />
        </div>

        <div className="forms-margin">
          <FormSlider
            form={form}
            labels={NBR_STREAMING}
            questions={curseurQuestions(
              "",
              "nbr_streaming",
              nbrStreaming,
              setNbrStreaming
            )}
          />
        </div>
      </div>

      <div className="forms-margin">
        <FormItemActionReduction
          form={form}
          title="Réduction numérique"
          savierVous={SAVIER_VOUS_EMPREINTE}
          saviezVousPosition={0}
          selectDetail={actionReductionData}
          switchName="empreinte-switch-1"
          setSwitchValue={handleSwitchChange}
          isOpened={switchValue}
        />
      </div>
    </ConfiguredForm>
  );
}
