import ReactDOM from "react-dom";
import ons from "onsenui";
import eruda from "eruda";
import StyleBuilder from "@Builders/StyleBuilder";
import native from "@Native/index";
import preset from "jss-preset-default";
import erudaDom from "eruda-dom";
import jss from "jss";
import darkMode from "@Styles/dark";
import lightMode from "@Styles/light";
import { ForbiddenActivity, InitActivity } from "@Views";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/theme-nord_dark";
import "onsenui/css/onsenui.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "material-icons/iconfont/material-icons.css";
import "@Styles/default.scss";

class Bootloader {
  private mountNode: any = document.querySelector("app");

  private loadConsole() {
    if (native.getPref("erudaEnabled") === "true") {
      eruda.init();
      eruda.add(erudaDom);
    }
  }

  private loadActivity(node: JSX.Element) {
    let pas,
      customPlugins = null;
    if (native.isAndroid || native.isWindows) {
      if (native.fs.isFileExist("plugins.yaml")) {
        pas = native.fs.readFile("plugins.yaml", { parse: { use: true, mode: "yaml" } });
        customPlugins = pas.map((item: string) => (
          <>
            <StyleBuilder folder={item} />;
          </>
        ));
      }
    }

    ReactDOM.render(
      <>
        {node}
        {customPlugins}
      </>,
      this.mountNode
    );
  }

  private electronInit() {
    native.electron.addEventListener("devtools-opened", () => {
      console.log("DevTools opened");
    });
  }

  /**
   * Loads styles dynamically
   */
  public styleInit() {
    jss.setup(preset());
    if (native.getPref("enableDarkmode") === "true") {
      native.android.setStatusbarColor("#ff1f1f1f");
      jss.createStyleSheet(darkMode).attach();
    } else {
      native.android.setStatusbarColor("#ff4a148c");
      jss.createStyleSheet(lightMode).attach();
    }
  }

  private androidSettingsinit() {
    if (native.getPref("enableKeepScreenOn") === "true") {
      native.android.keepScreenOn();
    }
  }

  private makeExamplePlugin() {
    native.fs.writeFile("plugins/example/plugin.yaml", "run: index.js");
    native.fs.writeFile("plugins/example/index.js", "console.log('Example Plugin')");
    native.fs.writeFile("plugins/example/note.txt", "THIS IS AN EXAMPLE PLUGIN AND CANNOT OVERRIDED");
  }

  private folderInit() {
    if (!native.fs.isFileExist("plugins.yaml")) {
      native.fs.writeFile("plugins.yaml", "- example");
    }
  }

  public init() {
    ons.platform.select("android");
    this.styleInit();
    if (
      native.isIframe ||
      native.isElectron ||
      native.isEmbedded ||
      native.isIE ||
      native.isEdge ||
      native.isMIUI ||
      native.isSamsungBrowser
    ) {
      this.loadActivity(<ForbiddenActivity />);
    } else {
      this.folderInit();
      this.makeExamplePlugin();
      this.loadConsole();
      this.electronInit();
      this.androidSettingsinit();

      if (native.isInstagram || native.isFacebook) {
        native.setPref("disableNSFW", "true");
      }

      this.loadActivity(<InitActivity />);
    }
  }
}

new Bootloader().init();

export default Bootloader;
