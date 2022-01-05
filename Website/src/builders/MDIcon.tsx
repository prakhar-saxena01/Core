import tools from "@Misc/tools";
import native from "@Native";
import * as React from "react";

class MDIcon extends React.Component<{
  icon: string;
  size: "18" | "24" | "36" | "48";
  disabled?: boolean;
  isInList?: boolean;
}> {
  public render() {
    const { icon, size, disabled, isInList } = this.props;
    return (
      <span
        className={
          "material-icons " +
          tools.typeIF(isInList, "list-item__icon", "") +
          " ons-icon " +
          "material-icons md-" +
          size +
          " md-" +
          tools.typeIF(native.getPref("enableDarkmode"), "light", "dark") +
          " " +
          tools.typeIF(disabled, "md-inactive ", "")
        }
        style={{
          textAlign: "center",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </span>
    );
  }
}

export default MDIcon;
