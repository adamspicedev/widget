import ReactDom from "react-dom/client";
import { Widget } from "./components/Widget";

export const normalizeAttribute = (attribute) => {
  console.log(
    "first",
    attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
  );
  return attribute.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
};

class WidgetWebComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const props = this.getPropsFromAttributes();
    console.log("props", props);
    const root = ReactDom.createRoot(this.shadowRoot);
    root.render(<Widget {...props} />);
  }

  getPropsFromAttributes() {
    const props = {};
    for (const { name, value } of this.attributes) {
      props[normalizeAttribute(name)] = value;
    }
    return props;
  }
}

export default WidgetWebComponent;
