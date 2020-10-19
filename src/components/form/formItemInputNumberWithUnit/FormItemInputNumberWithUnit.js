import React, { useState, useRef } from "react";
import { findDOMNode } from "react-dom";
import { InputNumber } from "antd";
import { getColor } from "@utils/cssUtil";
import { FormItem } from "@components/form/formItem/FormItem";
import "./formItemInputNumberWithUnit.css";

export function FormItemInputNumberWithUnit({
  form,
  label,
  name,
  rules,
  tooltipTitle,
  unit,
  onChange,
}) {
  const mainColor = getColor("--main-color");
  const inputRef = useRef();
  const inputUnitRef = useRef();
  const [color, setColor] = useState(mainColor);

  const onFocus = () => {
    const focusColor = "white";
    setColor(focusColor);
    changeColorElementTo(focusColor);
  };

  const onBlur = () => {
    const blurColor = mainColor;
    setColor(blurColor);
    changeColorElementTo(blurColor);
  };

  const changeColorElementTo = (color) => {
    const element = findDOMNode(inputRef.current);
    const unitElement = findDOMNode(inputUnitRef.current);
    element.style.borderColor = color;
    element.style.color = color;
    unitElement.style.color = color;
  };

  const onDefaultChange = (newValue) => {
    form.setFieldsValue({
      [name]: newValue,
    });
    if (onChange) {
      onChange();
    }
  };

  return (
    <FormItem
      label={label}
      labelStyle={{ color: color }}
      name={name}
      rules={rules}
      tooltipTitle={tooltipTitle}
    >
      <InputNumber
        ref={inputRef}
        className="input-number-with-unit"
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onDefaultChange}
        value={form.getFieldValue(name)}
        min={0}
        id={name}
      />
      <span ref={inputUnitRef} className="input-unit">
        {unit}
      </span>
    </FormItem>
  );
}
