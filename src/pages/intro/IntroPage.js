import React, { Fragment, useState, useEffect } from "react";
import { Header } from "@components/header/Header";
import { BoxSides } from "@components/box/BoxSides";
import { FooterWithNavigation } from "@components/footer/FooterWithNavigation";
import { getUserProgess } from "@services/userService";
import { StyledTitle } from "@components/title/StyledTitle";
import { Summary } from "@components/summary/Summary";
import { Modal } from "@components/modal/Modal";
import { useTabletOrMobileSize } from "@hooks/window";
import {
  INTRO_TITLE1,
  INTRO_TITLE2,
  MENU_DESCRIPTION,
  ABOUT_TITLE,
  ABOUT_CONTENT1,
  ABOUT_CONTENT2,
  ABOUT_CONTENT3,
  NAVIGATION_HOME,
} from "@utils/constants";
import { Button as ButtonAntd } from "antd";
import "./introPage.css";
import { useHistory } from "react-router-dom";

export function IntroPage() {
  let content;
  const history = useHistory();
  const [isVisible, setVisible] = useState(false);
  const [userProgress, setUserProgress] = useState("");
  const [path, setPath] = useState("");
  const isMobileOrTablet = useTabletOrMobileSize();

  useEffect(() => {
    getUserProgess()
      .then((response) => {
        setUserProgress(response.progress);
        if (response.progress === "VIE_PROFESIONAL") {
          setPath("Vie professionnelle");
        } else if (response.progress === "RESULTATS") {
          setPath("Résultats");
        }
      })
      .catch(() => {
        setUserProgress("error");
      });
  }, []);

  const getRoute = () => {
    if (userProgress === "VIE_PROFESIONAL") {
      return "/form";
    } else if (userProgress === "RESULTATS") {
      return "/results";
    } else if (userProgress === "error") {
      return "/intro";
    }
  };

  if (isMobileOrTablet) {
    content = (
      <Fragment>
        <StyledTitle title1={INTRO_TITLE1} title2={INTRO_TITLE2} />
        <div className="description-container">
          <p className="description">{MENU_DESCRIPTION}</p>
          <div style={{ margin: "0px auto" }}>
            <Summary />
          </div>
        </div>
      </Fragment>
    );
  } else {
    const left = <div className="left-side-menu" />;
    const right = (
      <div className="right-side-menu">
        <StyledTitle
          className="intro-page-title"
          title1={INTRO_TITLE1}
          title2={INTRO_TITLE2}
        />
        <p className="intro-menu-description">{MENU_DESCRIPTION}</p>
        <div style={{ margin: "0px auto" }}>
          <Summary />
        </div>
      </div>
    );
    content = <BoxSides left={left} right={right} height="55vh" />;
  }
  return (
    <Fragment>
      <Header>
        <img
          className="logo"
          src="/images/paris-2024.png"
          alt="paris-2024"
          width="260px"
          height="132px"
        />
        <ButtonAntd
          className="show-modal-btn"
          type="primary"
          shape="circle"
          onClick={() => setVisible(true)}
        >
          <span>i</span>
        </ButtonAntd>
      </Header>
      <Modal
        title={ABOUT_TITLE}
        content={[ABOUT_CONTENT1, ABOUT_CONTENT2, ABOUT_CONTENT3]}
        isVisible={isVisible}
        hideOverlay={() => setVisible(false)}
      />
      {content}
      <FooterWithNavigation
        previous={{
          category: NAVIGATION_HOME,
          onClick: () => history.push("/"),
        }}
        next={{
          category: path,
          onClick: () => history.push(getRoute()),
        }}
      />
    </Fragment>
  );
}
