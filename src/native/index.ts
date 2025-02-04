import config from "../misc/config";
import yaml from "js-yaml";
import ons from "onsenui";
import { BrowserWindowConstructorOptions } from "@Types/newWindow";
import evil from "./hwplugin/eval";
import {
  browserName,
  browserVersion,
  deviceType,
  engineName,
  engineVersion,
  isBrowser,
  isChrome,
  isChromium,
  isConsole,
  isDesktop,
  isEdge,
  isEdgeChromium,
  isElectron,
  isEmbedded,
  isFirefox,
  isIE,
  isIOS,
  isIOS13,
  isIPad13,
  isIPhone13,
  isIPod13,
  isMacOs,
  isMIUI,
  isMobile,
  isMobileOnly,
  isMobileSafari,
  isOpera,
  isSafari,
  isSamsungBrowser,
  isSmartTV,
  isTablet,
  isWearable,
  isWinPhone,
  isYandex,
  mobileModel,
  mobileVendor,
} from "react-device-detect";

/**
 * Native calls for Windows and Android
 */
class native {
  private static readonly userAgentAndroid = "HENTAI_WEB_AGENT";
  private static readonly userAgentWindows = "HENTAI_WEB_WINDOWS";
  public static readonly userAgent = window.navigator.userAgent;
  public static readonly isWindows = this.userAgentWindows === this.userAgent ? true : false;
  public static readonly isAndroid = this.userAgentAndroid === this.userAgent ? true : false;
  public static readonly isInstagram = /Instagram/i.test(this.userAgent);
  public static readonly isFacebook = /Facebook/i.test(this.userAgent);
  public static readonly isIframe = window.self !== window.top;
  public static readonly isSmartTV = isSmartTV;
  public static readonly isConsole = isConsole;
  public static readonly isWearable = isWearable;
  public static readonly isEmbedded = isEmbedded;
  public static readonly isMobileSafari = isMobileSafari;
  public static readonly isChromium = isChromium;
  public static readonly isMobile = isMobile;
  public static readonly isMobileOnly = isMobileOnly;
  public static readonly isTablet = isTablet;
  public static readonly isBrowser = isBrowser;
  public static readonly isDesktop = isDesktop;
  public static readonly isWinPhone = isWinPhone;
  public static readonly isIOS = isIOS;
  public static readonly isChrome = isChrome;
  public static readonly isFirefox = isFirefox;
  public static readonly isSafari = isSafari;
  public static readonly isOpera = isOpera;
  public static readonly isIE = isIE;
  public static readonly browserVersion = browserVersion;
  public static readonly browserName = browserName;
  public static readonly mobileVendor = mobileVendor;
  public static readonly mobileModel = mobileModel;
  public static readonly engineName = engineName;
  public static readonly engineVersion = engineVersion;
  public static readonly isEdge = isEdge;
  public static readonly isYandex = isYandex;
  public static readonly deviceType = deviceType;
  public static readonly isIOS13 = isIOS13;
  public static readonly isIPad13 = isIPad13;
  public static readonly isIPhone13 = isIPhone13;
  public static readonly isIPod13 = isIPod13;
  public static readonly isElectron = isElectron;
  public static readonly isEdgeChromium = isEdgeChromium;
  public static readonly isMacOs = isMacOs;
  public static readonly isMIUI = isMIUI;
  public static readonly isSamsungBrowser = isSamsungBrowser;

  public static readonly checkPlatformForBorderStyle = this.isWindows ? "windows" : "";

  /**
   * Get the Android userAgent
   * @deprecated Use `native.isAndroid`
   */
  public static userAgentEqualAndroid(state: boolean): boolean {
    if (state) {
      return window.navigator.userAgent === config.options.userAgent;
    } else {
      return window.navigator.userAgent != config.options.userAgent;
    }
  }

  /**
   * Get the Windows userAgent
   * @deprecated Use `native.isWindows`
   */
  public static userAgentEqualWindows(state: boolean): boolean {
    if (state) {
      return window.navigator.userAgent === config.options.userAgentWindows;
    } else {
      return window.navigator.userAgent != config.options.userAgentWindows;
    }
  }

  /**
   * Get mobile phones build serial (Is pn every phone different)
   * @returns {String}
   */
  public static get getBuildMANUFACTURER(): string {
    const appCodeName = window.navigator.appCodeName.toUpperCase();
    if (this.userAgent === this.userAgentAndroid) {
      return window.Android.BuildMANUFACTURER().toUpperCase();
    } else if (this.userAgent === this.userAgentWindows) {
      return appCodeName;
    } else {
      return appCodeName;
    }
  }

  /**
   * Get mobile phones emei number
   * @returns {String}
   */
  public static get getMODEL(): string {
    const platform = window.navigator.platform.toUpperCase();
    if (this.userAgent === this.userAgentAndroid) {
      return window.Android.BuildMODEL().toUpperCase();
    } else if (this.userAgent === this.userAgentWindows) {
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
    if (this.userAgent === this.userAgentAndroid) {
      window.Android.reload();
    } else if (this.userAgent === this.userAgentWindows) {
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
    if (this.userAgent === this.userAgentAndroid) {
      window.Android.copyToClipboard(content);
    } else if (this.userAgent === this.userAgentWindows) {
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
  public static downloadPicture(downloadUrlOfImage: string, filename?: string, id?: any): void {
    const a = () => ons.notification.alert("Make an right click on the picture you want an save it.");

    if (native.isAndroid) {
      window.Android.downloadImage(downloadUrlOfImage);
    } else if (native.isWindows) {
      a(); // window.Windows.downloadImage(downloadUrlOfImage);
    } else {
      a();
    }
  }

  /**
   * Set an saved key from localstorage or shared prefs
   * @param key
   * @param content
   */
  public static setPref(key: string, content: string): void {
    if (native.isAndroid) {
      window.Android.setPref(key, content.toString());
    } else if (native.isWindows) {
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
  public static getPref(key: string): string {
    if (native.isAndroid) {
      const get = window.Android.getPref(key);
      if (get === undefined || get === null || get === "") {
        return "false";
      } else {
        return get;
      }
    } else if (native.isWindows) {
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
    if (this.userAgent === this.userAgentAndroid) {
      window.Android.removePref(key);
    } else if (this.userAgent === this.userAgentWindows) {
      window.Windows.removePref(key);
    } else {
      localStorage.removeItem(key);
    }
  }

  public static readonly version = {
    get get(): string {
      if (native.isAndroid) {
        return window.Android.getVersion();
      } else if (native.isWindows) {
        return window.Windows.getVersion();
      } else {
        return "";
      }
    },
    require(version: number): boolean {
      return +Number(this.get.replace(/\./gm, "")) >= +version;
    },
  };

  /**
   * Opens an link with native Android method
   * @param link
   */
  public static open(link: string, target?: string): void {
    if (this.userAgent === this.userAgentAndroid) {
      window.Android.open(link);
    } else if (this.userAgent === this.userAgentWindows) {
      window.Windows.open(link);
    } else {
      window.open(link, target);
    }
  }

  /**
   * Closes the app
   */
  public static close(): void {
    function clo(method: any) {
      ons.notification.confirm({
        message: "Do you want to close this app?",
        title: "Close app?",
        buttonLabels: ["Yes", "No"],
        modifier: native.checkPlatformForBorderStyle,
        animation: "default",
        primaryButtonIndex: 1,
        cancelable: true,
        callback: (index: number) => {
          switch (index) {
            case 0:
              method();
              break;

            default:
              break;
          }
        },
      });
    }

    if (this.userAgent === this.userAgentAndroid) {
      clo(() => window.Android.close());
    } else if (this.userAgent === this.userAgentWindows) {
      clo(() => window.Windows.close());
    } else {
      clo(() => window.close());
    }
  }

  /**
   * Evaluates JavaScript code and executes it.
   * @param javascriptString A String value that contains valid JavaScript code.
   */
  public static eval(javascriptString: string, extras: any) {
    evil(javascriptString, extras);
  }

  /**
   * Methods that are here can only used on Windows
   */
  public static readonly electron = {
    userAgentAndroid: "HENTAI_WEB_AGENT",
    userAgentWindows: "HENTAI_WEB_WINDOWS",
    agent: window.navigator.userAgent,

    newWindow: (url: string, options: BrowserWindowConstructorOptions) => {
      if (native.isWindows) {
        window.Windows.newWindow(url, options);
      }
    },

    /**
     *
     * @param state
     */
    discordRPC(state: string): void {
      if (this.agent === this.userAgentWindows) {
        if (native.getPref("electron.disableDiscordRPC") === "true") {
          window.Windows.discordRPCdisconnect();
        } else {
          window.Windows.discordRPC(state);
        }
      }
    },

    addEventListener(event: string, callback: Function): void {
      if (this.agent === this.userAgentWindows) {
        window.Windows.webContentsAddEventListener(event, callback);
      }
    },

    /**
     * Opens the devtools.
     *
     * When `contents` is a `<webview>` tag, the `mode` would be `detach` by default,
     * explicitly passing an empty `mode` can force using last used dock state.
     */
    openDevTools(): void {
      if (this.agent === this.userAgentWindows) {
        window.Windows.openDevTools();
      }
    },
    /**
     * Closes the devtools.
     */
    closeDevTools(): void {
      if (this.agent === this.userAgentWindows) {
        window.Windows.closeDevTools();
      }
    },

    notification(title: string, body: string): void {
      if (this.agent === this.userAgentWindows) {
        window.Windows.notification(title, body);
      }
    },
  };

  /**
   * Methods that are here can only used on Android
   */
  public static readonly android = {
    userAgentAndroid: "HENTAI_WEB_AGENT",
    userAgentWindows: "HENTAI_WEB_WINDOWS",
    agent: window.navigator.userAgent,

    setStatusbarColor(color: string): void {
      if (this.agent === this.userAgentAndroid) {
        window.Android.setStatusbarColor(color);
      }
    },

    setStatusbarBackgroundWhite(): void {
      if (this.agent === this.userAgentAndroid) {
        window.Android.setStatusbarBackgroundWhite();
      }
    },

    keepScreenOn(): void {
      if (this.agent === this.userAgentAndroid) {
        window.Android.keepScreenOn();
      }
    },

    hasBiometricEnrolled(): boolean {
      if (this.agent === this.userAgentAndroid) {
        return window.Android.hasBiometricEnrolled();
      } else {
        return false;
      }
    },

    isHardwareAvailable(): boolean {
      if (this.agent === this.userAgentAndroid) {
        return window.Android.isHardwareAvailable();
      } else {
        return false;
      }
    },

    /**
     * Check if has write permission
     * @returns {boolean}
     */
    hasStoragePermission(): boolean {
      if (native.isAndroid) {
        return window.Android.hasStoragePermission();
      } else {
        return false;
      }
    },

    /**
     * request permission
     */
    requestPermission(): void {
      if (native.isAndroid) {
        window.Android.requestStoargePermission();
      }
    },
  };

  /**
   * This class is for the file access on both platforms, Android and Windows.
   */
  public static readonly fs = {
    userAgentAndroid: "HENTAI_WEB_AGENT",
    userAgentWindows: "HENTAI_WEB_WINDOWS",
    agent: window.navigator.userAgent,

    readFile(path: string, options?: { parse: { use: boolean; mode: "json" | "yaml" } }): string | any {
      if (this.agent === this.userAgentAndroid) {
        if (options?.parse.use) {
          switch (options?.parse.mode) {
            case "json":
              try {
                return JSON.parse(window.Android.readFile(path));
              } catch (error) {
                console.log(error);
              }
            case "yaml":
              try {
                // @ts-ignore
                return yaml.load(window.Android.readFile(path), { json: options?.parse.use });
              } catch (error) {
                console.log(error);
              }
            default:
              return window.Android.readFile(path);
          }
        } else {
          return window.Android.readFile(path);
        }
      } else if (this.agent === this.userAgentWindows) {
        if (options?.parse.use) {
          switch (options?.parse.mode) {
            case "json":
              try {
                return JSON.parse(window.Windows.readFile(path));
              } catch (error) {
                console.log(error);
              }
            case "yaml":
              try {
                // @ts-ignore
                return yaml.load(window.Windows.readFile(path), { json: options?.parse.use });
              } catch (error) {
                console.log(error);
              }
            default:
              return window.Windows.readFile(path);
          }
        } else {
          return window.Windows.readFile(path);
        }
      } else {
        return "";
      }
    },

    mkDir(path: string): void {
      if (this.agent === this.userAgentAndroid) {
        window.Android.mkDir(path);
      } else if (this.agent === this.userAgentWindows) {
        window.Windows.mkDir(path);
      } else {
        return;
      }
    },

    writeFile(path: string, content: string): void {
      if (this.agent === this.userAgentAndroid) {
        window.Android.writeFile(path, content);
      } else if (this.agent === this.userAgentWindows) {
        window.Windows.writeFile(path, content);
      } else {
        return;
      }
    },

    isFileExist(path: string): boolean {
      if (this.agent === this.userAgentAndroid) {
        return window.Android.isFileExist(path);
      } else if (this.agent === this.userAgentWindows) {
        return window.Windows.isFileExist(path);
      } else {
        return false;
      }
    },
  };
}

export default native;
