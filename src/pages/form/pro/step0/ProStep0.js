import React, { useEffect } from "react";
import { Form } from "antd";
import { Form as ConfiguredForm } from "@components/form/Form";
import { FormItemInputNumber } from "@components/form/formItemInputNumber/FormItemInputNumber";
import {
  saveResponsesOfQuestionsStep,
  getResponsesOfQuestionsOfStep,
} from "@services/responseService";
import {
  INTRODUCTION_QUESTION1,
  INTRODUCTION_QUESTION1_INFOS,
  INTRODUCTION_QUESTION1_ERROR_MSG,
  INTRODUCTION_QUESTION2,
  INTRODUCTION_QUESTION2_ERROR_MSG,
  INTRODUCTION_QUESTION3,
  INTRODUCTION_QUESTION3_ERROR_MSG,
} from "@utils/constants";

// introduction
export function ProStep0({ step, setNextStep }) {
  const [form] = Form.useForm();

  useEffect(() => {
    window.scrollTo(0, 0);
    const setReponsesOfStep = (stepState) => {
      stepState.forEach(({ question, response }) => {
        form.setFieldsValue({
          [question]: response,
        });
      });
    };

    const stepState = getResponsesOfQuestionsOfStep(step);
    if (stepState) {
      setReponsesOfStep(stepState);
    }
  }, [form, step]);

  const onFinish = (values) => {
    const stepState = [
      {
        question: "5f554172a13c7",
        response: values["5f554172a13c7"],
      },
      {
        question: "5f5541a7845e0",
        response: values["5f5541a7845e0"],
      },
      {
        question: "5f5541ba9b096",
        response: values["5f5541ba9b096"],
      },
    ];
    saveResponsesOfQuestionsStep(stepState, step);
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
        <FormItemInputNumber
          name="5f554172a13c7"
          tooltipTitle={INTRODUCTION_QUESTION1_INFOS}
          label={INTRODUCTION_QUESTION1}
          rules={[
            { required: true, message: INTRODUCTION_QUESTION1_ERROR_MSG },
          ]}
        />

        <div className="forms-margin">
          <FormItemInputNumber
            name="5f5541a7845e0"
            label={INTRODUCTION_QUESTION2}
            rules={[
              { required: true, message: INTRODUCTION_QUESTION2_ERROR_MSG },
            ]}
          />
        </div>

        <div className="forms-margin">
          <FormItemInputNumber
            name="5f5541ba9b096"
            label={INTRODUCTION_QUESTION3}
            rules={[
              { required: true, message: INTRODUCTION_QUESTION3_ERROR_MSG },
            ]}
          />
        </div>
      </div>
    </ConfiguredForm>
  );
}
