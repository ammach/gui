import React from "react";
import { Select } from "antd";
import { FormItem } from "@components/form/formItem/FormItem";
import { useTabletSize } from "@hooks/window";
import "./formItemActionSelect.css";

export function FormItemActionSelect({ name, options, onChange }) {
  const isTablet = useTabletSize();
  const { Option } = Select;

  return (
    <FormItem
      className="select-action"
      name={name}
      initialValue={options[0].value}
    >
      <Select
        size={isTablet ? "large" : "middle"}
        id={name}
        aria-label="select-action"
        aria-expanded
        style={{ width: "auto" }}
        dropdownClassName="select-action-dropdown"
        onChange={onChange}
      >
        {options.map(({ text, value }, key) => (
          <Option key={key} value={value}>
            {text}
          </Option>
        ))}
      </Select>
    </FormItem>
  );
}
