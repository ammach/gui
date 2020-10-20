import React, { useState } from "react";
import { Modal, Button, Carousel } from "antd";
import {
  BulbOutlined,
  LeftOutlined,
  RightOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useTabletOrMobileSize } from "@hooks/window";
import "./overlay.css";

export function Overlay(props) {
  const isMobileOrTablet = useTabletOrMobileSize();
  const [visible, SetVisible] = useState({
    modalVisible: false,
    closeButton: "none",
  });
  const { modalVisible, closeButton } = visible;
  let { items, title } = props;

  const titleModal = (
    <div className="container-flex-title-modal">
      <BulbOutlined className="icon-modal" />
      <p className="title-modal">{title}</p>
    </div>
  );

  const tiles = items.map((value) => (
    <div key={value}>
      {value.text && (
        <h3
          className="content-style"
          dangerouslySetInnerHTML={{ __html: value.text }}
        />
      )}
      <div className="content-style">
        {value.image && (
          <img className="div-image" src={value.image} alt={value.text} />
        )}
        {value.sousText && <h4 className="text-modal">{value.sousText}</h4>}
      </div>
    </div>
  ));

  return (
    <div className="container-flex-overlay">
      <Button
        className="custom-btn-modal"
        type="primary"
        onClick={() =>
          SetVisible({ modalVisible: true, closeButton: "inline-block" })
        }
      >
        <div className="container-text-button">
          <BulbOutlined className="icon-modal" />
          <span className="title-button">{title}</span>
        </div>
      </Button>
      <Button
        className="modal-close-btn-modal"
        type="primary"
        shape="circle"
        icon={<CloseOutlined />}
        onClick={() => SetVisible({ modalVisible: false, closeButton: "none" })}
        style={{ display: closeButton }}
      />
      <Modal
        title={titleModal}
        visible={modalVisible}
        onOk={() => SetVisible({ modalVisible: false, closeButton: "none" })}
        onCancel={() =>
          SetVisible({ modalVisible: false, closeButton: "none" })
        }
        className="custom-modal"
        width={isMobileOrTablet ? 650 : 550}
        footer={null}
        centered
        closable={false}
      >
        <Carousel
          draggable={true}
          arrows={true}
          prevArrow={<LeftOutlined />}
          nextArrow={<RightOutlined />}
        >
          {tiles}
        </Carousel>
      </Modal>
    </div>
  );
}
