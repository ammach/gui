import React, { useState, useEffect } from "react";
import { Collapse, InputNumber } from "antd";
import { FormItemSwitch } from "@components/form/action/formItemSwitch/FormItemSwitch";
import { FormItemActionSelect } from "@components/form/action/formItemActionSelect/FormItemActionSelect";
import { ReactComponent as ActionReductionIcon } from "@theme/icons/action-reduction-icon.svg";
import { ReactComponent as SavierVousIcon } from "@theme/icons/savier-vous-icon.svg";
import { FormItem } from "@components/form/formItem/FormItem";
import "./formItemActionReduction.css";
import {
  ACTIONS_REDUCTION,
  FIRST_DETAIL,
  LIRE_MOINS,
  LIRE_PLUS,
} from "@utils/constants";

export function FormItemActionReduction({
  form,
  title,
  switchName,
  isOpened,
  setSwitchValue,
  selectDetail,
  savierVous,
  saviezVousPosition,
  render,
}) {
  const { Panel } = Collapse;
  const [showAllDetail, setShowAllDetail] = useState(false);
  const [detail, setDetail] = useState(savierVous);

  useEffect(() => {
    if (!isOpened) {
      selectDetail.forEach((data) => {
        if (data.type === "input") {
          const fieldValue = form.getFieldValue(data.name);
          form.setFieldsValue({
            [data.name]: fieldValue,
          });
        }
      });
    }
  }, [form, isOpened, selectDetail]);

  const resizeDetailHandler = () => {
    setShowAllDetail((prev) => !prev);
  };

  useEffect(() => {
    if (savierVous) {
      if (showAllDetail) {
        setDetail(savierVous);
      } else {
        setDetail(detail.substring(0, 55));
      }
    }
  }, [detail, savierVous, showAllDetail]);

  const panelHeader = (
    <div className="panel-header">
      <div className="panel-header-content">
        <ActionReductionIcon />
        <div className="panel-header-span">
          <span className="panel-header-span-first-title">
            {ACTIONS_REDUCTION}
          </span>
          <span className="panel-header-span-second-title">{title}</span>
        </div>
      </div>
      <FormItemSwitch
        switchValue={isOpened}
        setSwitchValue={setSwitchValue}
        name={switchName}
      />
    </div>
  );

  const input = (className, key, data) => (
    <div className={className} key={key}>
      <span className="input-detail">{data.firstText}&nbsp;</span>
      <FormItem className="input-action" name={data.name}>
        <InputNumber
          size="large"
          min={0}
          max={form.getFieldValue(data.questionName)}
        />
      </FormItem>
      {data.secondText &&
        data.secondText.split(" ").map((mot, key) => (
          <span className="input-detail" key={key}>
            &nbsp;{mot}
          </span>
        ))}
    </div>
  );

  const select = (className, key, data) => {
    const options = data.questionName ? getOptions(data) : data.options;
    return (
      <div className={className} key={key}>
        <span>{data.firstText}&nbsp;</span>
        <FormItemActionSelect name={data.name} options={options} />
        {data.secondText &&
          data.secondText
            .split(" ")
            .map((mot, key) => <span key={key}>&nbsp;{mot}</span>)}
      </div>
    );
  };

  const getOptions = (data) => {
    const getValueLessThanQuestionValue = (options, questionValue) => {
      return options.reverse().find(({ value }) => value <= questionValue)
        .value;
    };

    let options = [];
    if (!form.getFieldValue(data.questionName)) {
      options = [data.options[0]];
    } else {
      options = data.options.filter(
        (option) => option["value"] <= form.getFieldValue(data.questionName)
      );
      if (
        form.getFieldValue(data.questionName) < form.getFieldValue(data.name)
      ) {
        const value = getValueLessThanQuestionValue(
          data.options,
          form.getFieldValue(data.questionName)
        );
        form.setFieldsValue({
          [data.name]: value,
        });
      }
    }
    return options;
  };

  return (
    <Collapse
      className="collapse-custom"
      activeKey={isOpened ? 1 : 0}
      bordered={false}
    >
      <Panel
        disabled={!isOpened}
        showArrow={false}
        header={panelHeader}
        key="1"
      >
        {isOpened && (
          <div className="action-reduction-container">
            <div className="first-para">{FIRST_DETAIL}</div>
            {selectDetail.map(
              (data, key) =>
                (key === saviezVousPosition && (
                  <div key={key}>
                    <div className="detail">
                      {(data.type === "select" &&
                        select("select-content", key, data)) ||
                        (data.type === "input" &&
                          input("select-content", key, data))}
                    </div>
                    {savierVous && (
                      <div className="info-container">
                        <div className="info-container-icon">
                          <SavierVousIcon />
                        </div>

                        <div className="info-container-content">
                          <h2 className="info-saviez-vous">Le saviez-vous ?</h2>
                          <span className="savier-vous-detail">{detail}</span>
                          {showAllDetail && (
                            <div>
                              <br />
                              <span
                                className="showDetail"
                                onClick={resizeDetailHandler}
                              >
                                {LIRE_MOINS}
                              </span>
                            </div>
                          )}
                          {!showAllDetail && (
                            <span
                              className="showDetail"
                              onClick={resizeDetailHandler}
                            >
                              {LIRE_PLUS}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                )) || (
                  <div className="detail">
                    {(data.type === "select" &&
                      select("select-content", key, data)) ||
                      (data.type === "input" &&
                        input("select-content", key, data))}
                  </div>
                )
            )}
          </div>
        )}
      </Panel>
    </Collapse>
  );
}
