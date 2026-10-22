import { Plugin, ButtonView } from "ckeditor5";

type CalloutType = "key-takeaway" | "note" | "warning" | "definition";

const CALLOUTS: {
  type: CalloutType;
  label: string;
}[] = [
  { type: "key-takeaway", label: "Key takeaway" },
  { type: "note", label: "Important note" },
  { type: "warning", label: "Caution" },
  { type: "definition", label: "Definition" },
];

function isCalloutType(value: unknown): value is CalloutType {
  return CALLOUTS.some((item) => item.type === value);
}

export default class CalloutPlugin extends Plugin {
  static get pluginName() {
    return "CalloutPlugin" as const;
  }

  init() {
    const editor = this.editor;

    // 1. Define the callout model.
    editor.model.schema.register("callout", {
      allowWhere: "$block",
      allowContentOf: "$root",
      allowAttributes: ["calloutType"],
      isLimit: true,
    });

    // 2. Convert saved HTML into the editor model.
    editor.conversion.for("upcast").elementToElement({
      view: {
        name: "div",
        classes: "callout",
      },
      model: (viewElement, { writer }) => {
        const rawType = viewElement.getAttribute("data-callout-type");

        return writer.createElement("callout", {
          calloutType: isCalloutType(rawType) ? rawType : "note",
        });
      },
    });

    // 3. Convert the model into HTML when editor.getData() runs.
    editor.conversion.for("dataDowncast").elementToElement({
      model: {
        name: "callout",
        attributes: ["calloutType"],
      },
      view: (modelElement, { writer }) => {
        const rawType = modelElement.getAttribute("calloutType");
        const type = isCalloutType(rawType) ? rawType : "note";

        return writer.createContainerElement("div", {
          class: `callout callout--${type}`,
          "data-callout-type": type,
        });
      },
    });

    // 4. Render the callout inside the editing area.
    editor.conversion.for("editingDowncast").elementToElement({
      model: {
        name: "callout",
        attributes: ["calloutType"],
      },
      view: (modelElement, { writer }) => {
        const rawType = modelElement.getAttribute("calloutType");
        const type = isCalloutType(rawType) ? rawType : "note";

        return writer.createContainerElement("div", {
          class: `callout callout--${type}`,
          "data-callout-type": type,
        });
      },
    });

    // 5. Register the toolbar buttons.
    for (const callout of CALLOUTS) {
      editor.ui.componentFactory.add(`callout-${callout.type}`, (locale) => {
        const button = new ButtonView(locale);

        button.set({
          label: callout.label,
          tooltip: true,
          withText: true,
        });

        button.on("execute", () => {
          editor.model.change((writer) => {
            const element = writer.createElement("callout", {
              calloutType: callout.type,
            });

            // Insert the callout at the current selection.
            editor.model.insertContent(element);

            // Create an editable paragraph inside the callout.
            const paragraph = writer.createElement("paragraph");

            writer.insert(paragraph, writer.createPositionAt(element, 0));

            // Put the caret inside the new paragraph.
            writer.setSelection(paragraph, "in");
          });
        });

        return button;
      });
    }
  }
}
