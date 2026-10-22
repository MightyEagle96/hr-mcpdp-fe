// import {
//   Command,
//   Collection,
//   UIModel,
//   Plugin,
//   createDropdown,
//   addListToDropdown,
// } from "ckeditor5";

// interface IconDropdownItem {
//   label: string;
//   withText: boolean;
//   iconName: InlineIconName;
// }
// type InlineIconName =
//   | "lightbulb"
//   | "info"
//   | "circle-alert"
//   | "check-circle"
//   | "book-open"
//   | "stethoscope"
//   | "heart-pulse"
//   | "shield-check"
//   | "clipboard-check"
//   | "graduation-cap"
//   | "clock"
//   | "file-text"
//   | "target"
//   | "star"
//   | "calendar"
//   | "activity";

// const ICONS: { name: InlineIconName; label: string }[] = [
//   { name: "lightbulb", label: "Lightbulb — Key idea" },
//   { name: "info", label: "Info — Additional information" },
//   { name: "circle-alert", label: "Alert — Warning" },
//   { name: "check-circle", label: "Check — Completed" },
//   { name: "book-open", label: "Book — Learning" },
//   { name: "stethoscope", label: "Stethoscope — Clinical practice" },
//   { name: "heart-pulse", label: "Heart pulse — Health" },
//   { name: "shield-check", label: "Shield — Safety and compliance" },
//   { name: "clipboard-check", label: "Clipboard — Assessment" },
//   { name: "graduation-cap", label: "Graduation — Learning outcomes" },
//   { name: "clock", label: "Clock — Time" },
//   { name: "file-text", label: "Document — Reference" },
//   { name: "target", label: "Target — Objective" },
//   { name: "star", label: "Star — Highlight" },
//   { name: "calendar", label: "Calendar — Schedule" },
//   { name: "activity", label: "Activity — Clinical activity" },
// ];

// function isInlineIconName(value: unknown): value is InlineIconName {
//   return ICONS.some((icon) => icon.name === value);
// }

// class InsertInlineIconCommand extends Command {
//   refresh() {
//     this.isEnabled = true;
//   }

//   execute(options: { iconName: InlineIconName }) {
//     const editor = this.editor;

//     if (!isInlineIconName(options.iconName)) {
//       return;
//     }

//     editor.model.change((writer) => {
//       const icon = writer.createElement("inlineIcon", {
//         iconName: options.iconName,
//       });

//       editor.model.insertContent(icon);
//     });
//   }
// }

// export default class InlineIconPlugin extends Plugin {
//   static get pluginName() {
//     return "InlineIconPlugin" as const;
//   }

//   init() {
//     const editor = this.editor;

//     // Register the inline icon in CKEditor's document model.
//     editor.model.schema.register("inlineIcon", {
//       allowWhere: "$text",
//       allowAttributes: ["iconName"],
//       isInline: true,
//       isObject: true,
//     });

//     editor.commands.add(
//       "insertInlineIcon",
//       new InsertInlineIconCommand(editor),
//     );

//     // Load previously saved icon placeholders.
//     editor.conversion.for("upcast").elementToElement({
//       view: {
//         name: "span",
//         attributes: ["data-lucide-icon"],
//       },
//       model: (viewElement, { writer }) => {
//         const name = viewElement.getAttribute("data-lucide-icon");

//         if (!isInlineIconName(name)) {
//           return null;
//         }

//         return writer.createElement("inlineIcon", {
//           iconName: name,
//         });
//       },
//     });

//     // HTML stored by editor.getData().
//     editor.conversion.for("dataDowncast").elementToElement({
//       model: {
//         name: "inlineIcon",
//         attributes: ["iconName"],
//       },
//       view: (modelElement, { writer }) => {
//         const name = modelElement.getAttribute("iconName");

//         if (!isInlineIconName(name)) {
//           return writer.createEmptyElement("span");
//         }

//         return writer.createEmptyElement("span", {
//           class: "rich-inline-icon",
//           "data-lucide-icon": name,
//           "aria-hidden": "true",
//         });
//       },
//     });

//     // Visible placeholder in the CKEditor editing area.
//     editor.conversion.for("editingDowncast").elementToElement({
//       model: {
//         name: "inlineIcon",
//         attributes: ["iconName"],
//       },
//       view: (modelElement, { writer }) => {
//         const name = modelElement.getAttribute("iconName");
//         const label = isInlineIconName(name) ? name : "icon";

//         return writer.createEmptyElement("span", {
//           class: "ck-inline-icon",
//           "data-lucide-icon": label,
//           "aria-label": `${label} icon`,
//         });
//       },
//     });

//     function getIconName(value: unknown): InlineIconName | null {
//       if (
//         typeof value === "string" &&
//         ICONS.some((icon) => icon.name === value)
//       ) {
//         return value as InlineIconName;
//       }

//       return null;
//     }

//     // Add the icon dropdown to the toolbar.

//     editor.ui.componentFactory.add("insertInlineIcon", (locale) => {
//       const dropdown = createDropdown(locale);

//       dropdown.buttonView.set({
//         label: "Insert icon",
//         tooltip: true,
//         withText: true,
//       });

//       const items = new Collection<{
//         type: "button";
//         model: UIModel;
//       }>();

//       for (const icon of ICONS) {
//         const itemModel = new UIModel({
//           label: icon.label,
//           withText: true,
//         });

//         // Store the icon identifier on the UI model.
//         itemModel.set("iconName", icon.name);

//         items.add({
//           type: "button",
//           model: itemModel,
//         });
//       }

//       addListToDropdown(dropdown, items);

//       dropdown.on("execute", (event) => {
//         const source = event.source as UIModel;
//         const iconName = getIconName(source.get("iconName"));

//         if (!iconName) return;

//         editor.execute("insertInlineIcon", { iconName });
//         editor.editing.view.focus();
//       });

//       return dropdown;
//     });
//   }
// }
