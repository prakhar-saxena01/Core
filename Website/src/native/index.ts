import config from "../misc/config";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import { hot } from "react-hot-loader/root";
import tools from "../misc/tools";
import Mousetrap from "mousetrap";

/**
 * Native calls for Windows and Android
 */
class native {
  private static element: HTMLElement | null;
  private static userAgentAndroid = "HENTAI_WEB_AGENT";
  private static userAgentWindows = "HENTAI_WEB_WINDOWS";
  private static agent = window.navigator.userAgent;

  public static checkPlatformForBorderStyle = tools.typeIF(
    native.userAgentEqualWindows(true),
    "windows",
    ""
  );

  public static userAgentEqualAndroid(state: boolean): boolean {
    if (state) {
      return window.navigator.userAgent === config.options.userAgent;
    } else {
      return window.navigator.userAgent != config.options.userAgent;
    }
  }

  public static userAgentEqualWindows(state: boolean): boolean {
    if (state) {
      return window.navigator.userAgent === config.options.userAgentWindows;
    } else {
      return window.navigator.userAgent != config.options.userAgentWindows;
    }
  }

  /**
   * Builds the basic constructor
   */
  public constructor() {
    console.log("Android JS Bridge statred");
  }

  /**
   * Get mobile phones build serial (Is pn every phone different)
   * @returns {String}
   */
  public static getBuildMANUFACTURER(): string | String {
    const appCodeName = window.navigator.appCodeName.toUpperCase();
    if (this.agent === this.userAgentAndroid) {
      return window.Android.BuildMANUFACTURER().toUpperCase();
    } else if (this.agent === this.userAgentWindows) {
      return appCodeName;
    } else {
      return appCodeName;
    }
  }

  /**
   * Get mobile phones build model (Is pn every phone different)
   * @returns {String}
   */
  public static getBuildMODEL(): string | String {
    const platform = window.navigator.platform.toUpperCase();
    if (this.agent === this.userAgentAndroid) {
      return window.Android.BuildMODEL().toUpperCase();
    } else if (this.agent === this.userAgentWindows) {
      return platform;
    } else {
      return platform;
    }
  }

  /**
   * Reloads native the app
   * @returns
   */
  public static reload(): void {
    const reload = window.location.reload();
    if (this.agent === this.userAgentAndroid) {
      window.Android.reload();
    } else if (this.agent === this.userAgentWindows) {
      window.Windows.reload();
    } else {
      return reload;
    }
  }

  /**
   * Copy an string to clipboard on Android
   * @param content
   */
  public static copyClipborad(content: string): void {
    const copy = window.navigator.clipboard.writeText(content);
    if (this.agent === this.userAgentAndroid) {
      window.Android.copyToClipboard(content);
    } else if (this.agent === this.userAgentWindows) {
      copy;
    } else {
      copy;
    }
  }

  /**
   * Download an anime picture
   * @param filename
   * @param downloadUrlOfImage
   * @param id
   */
  public static downloadPicture(filename: string, downloadUrlOfImage: string, id?: any): void {
    const dwnl = () => {
      if ((this.element = document.getElementById(id))) {
        htmlToImage.toBlob(this.element).then((blob: any) => {
          saveAs(blob, id + ".png");
        });
      }
    };
    if (this.agent === this.userAgentAndroid) {
      window.Android.downloadImage(filename, downloadUrlOfImage);
    } else if (this.agent === this.userAgentWindows) {
      return dwnl();
    } else {
      return dwnl();
    }
  }

  /**
   * Set an saved key from localstorage or shared prefs
   * @param key
   * @param content
   */
  public static setPref(key: string, content: string): void {
    if (this.agent === this.userAgentAndroid) {
      window.Android.setPref(key, content.toString());
    } else if (this.agent === this.userAgentWindows) {
      window.Windows.setPref(key, content.toString());
    } else {
      localStorage.setItem(key, content.toString());
    }
  }

  /**
   * Get an saved key from localstorage or shared prefs
   * @param key
   * @returns
   */
  public static getPref(key: string): string | String {
    if (this.agent === this.userAgentAndroid) {
      const get = window.Android.getPref(key);
      if (get === undefined || get === null || get === "") {
        return "false";
      } else {
        return get;
      }
    } else if (this.agent === this.userAgentWindows) {
      const get = window.Windows.getPref(key);
      if (get === undefined || get === null || get === "") {
        return "false";
      } else {
        return get;
      }
    } else {
      const get = localStorage.getItem(key);
      if (get === undefined || get === null || get === "") {
        return "false";
      } else {
        return get;
      }
    }
  }

  /**
   * Remove an saved key from localstorage or shared prefs
   * @param key
   */
  public static removePref(key: string): void {
    if (this.agent === this.userAgentAndroid) {
      window.Android.removePref(key);
    } else if (this.agent === this.userAgentWindows) {
      window.Windows.removePref(key);
    } else {
      localStorage.removeItem(key);
    }
  }

  public static getAppManifest(state: string): string | String {
    if (this.agent === this.userAgentAndroid) {
      return window.Android.getAppManifest(state);
    } else if (this.agent === this.userAgentWindows) {
      return "null";
    } else {
      return "null";
    }
  }

  public static encodeAES(text: string, password?: string): string | String {
    const btoa = window.atob(text);
    if (this.agent === this.userAgentAndroid) {
      return window.Android.encryptAES(password, text);
    } else if (this.agent === this.userAgentWindows) {
      return btoa;
    } else {
      return btoa;
    }
  }

  public static decodeAES(text: string, password?: string): string | String {
    const atob = window.atob(text);
    if (this.agent === this.userAgentAndroid) {
      return window.Android.decryptAES(password, text);
    } else if (this.agent === this.userAgentWindows) {
      return atob;
    } else {
      return atob;
    }
  }

  /**
   * Opens an link with native Android method
   * @param link
   */
  public static open(link: string, target?: string): void {
    if (this.agent === this.userAgentAndroid) {
      window.Android.open(link);
    } else if (this.agent === this.userAgentWindows) {
      window.Windows.open(link);
    } else {
      window.open(link, target);
    }
  }

  public static registerShortcut(shortcut: string, callback?: Function): any | void {
    if (this.agent === this.userAgentAndroid) {
      console.log("globalShortcut are not supported on Android");
    } else if (this.agent === this.userAgentWindows) {
      window.Windows.registerShortcut(shortcut, callback);
    } else {
      Mousetrap.bind(shortcut, (e) => {
        if (typeof callback == "function") {
          callback(e, shortcut);
        } else {
          console.log(shortcut + " pressed Successfully");
        }
      });
    }
  }

  public static electron = {
    userAgentAndroid: "HENTAI_WEB_AGENT",
    userAgentWindows: "HENTAI_WEB_WINDOWS",
    agent: window.navigator.userAgent,

    isRegisteredShortcut(shortcut: string): boolean | Boolean {
      if (this.agent === this.userAgentAndroid) {
        return false;
      } else if (this.agent === this.userAgentWindows) {
        return window.Windows.isRegisteredShortcut(shortcut);
      } else {
        return false;
      }
    },

    unregisterShortcut(shortcut: string): void {
      if (this.agent === this.userAgentAndroid) {
        console.log("globalShortcut are not supported on Android");
      } else if (this.agent === this.userAgentWindows) {
        window.Windows.unregisterShortcut(shortcut);
      } else {
        console.log("globalShortcut are not supported on Browsers");
      }
    },

    addEventListener(event: string, callback: Function) {
      if (this.agent === this.userAgentAndroid) {
        console.log("Shortcut are not supported on Android");
      } else if (this.agent === this.userAgentWindows) {
        window.Windows.webContentsAddEventListener(event, callback);
      } else {
        console.log("Electrons event listener's are not supported on Browsers");
      }
    },

    /**
     * Opens the devtools.
     *
     * When `contents` is a `<webview>` tag, the `mode` would be `detach` by default,
     * explicitly passing an empty `mode` can force using last used dock state.
     */
    openDevTools() {
      if (this.agent === this.userAgentAndroid) {
        console.log("DevTools open event listener are not supported on Android");
      } else if (this.agent === this.userAgentWindows) {
        window.Windows.openDevTools();
      } else {
        console.log("DevTools open event listener are not supported on Browsers");
      }
    },
    /**
     * Closes the devtools.
     */
    closeDevTools() {
      if (this.agent === this.userAgentAndroid) {
        console.log("DevTools close event listener are not supported on Android");
      } else if (this.agent === this.userAgentWindows) {
        window.Windows.closeDevTools();
      } else {
        console.log("DevTools close event listener are not supported on Browsers");
      }
    },
  };
}

export default native;
