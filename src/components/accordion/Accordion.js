import React from "react";
import "./accordion.css";

export class Accordion extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAccordion = this.toggleAccordion.bind(this);
    this.state = { active: false };
  }

  toggleAccordion(event) {
    this.setState({ active: !this.state.active });
    var panelElement = this.getPanelElement(event);

    if (!panelElement || !panelElement.style) {
      return;
    }
    if (panelElement.style.maxHeight) {
      panelElement.style.maxHeight = null;
    } else {
      panelElement.style.maxHeight = panelElement.scrollHeight + "px";
    }
  }

  getPanelElement(event) {
    var panelElement;
    if (event.target.className === "panel") {
      panelElement = event.target;
    } else if (event.target.className === "section-paragraph") {
      panelElement = event.target.parentElement;
    } else {
      panelElement = !!event.target.getElementsByTagName("div")[0]
        ? event.target.getElementsByTagName("div")[0]
        : event.target.nextElementSibling;
    }
    return panelElement;
  }

  render() {
    return (
      <div className="accordion-container">
        <button
          className={this.state.active ? "accordion active" : "accordion"}
          onClick={this.toggleAccordion}
          style={this.props.style}
        >
          <h3>{this.props.title}</h3>
          <div className="panel">
            {this.props.renderedParagraphs}
            {!!this.props.source && (
              <div className="panel-section-source">
                Source :{" "}
                <a
                  href={this.props.source}
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {this.props.source}
                </a>
              </div>
            )}
          </div>
        </button>
      </div>
    );
  }
}
