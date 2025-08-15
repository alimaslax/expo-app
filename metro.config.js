/* eslint-disable @typescript-eslint/no-var-requires */
// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');


const { wrapWithReanimatedMetroConfig } = require('react-native-reanimated/metro-config');

const projectDirectory = __dirname;

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(projectDirectory);

/**
 * @description Our module reassignment object
 *
 * This will be used to return the correct library
 * when building web
 *
 * @type Record<string, string>
 */
const ALIASES = {
  'react-native': 'react-native-web',
  /**
   * 'react-native-maps':
   * @link https://github.com/react-native-maps/react-native-maps
   *
   * 'react-native-web-maps':
   * @link https://github.com/react-native-web-community/react-native-web-maps
   */
  'react-native-maps': 'react-native-web-maps',
  /**
   * PLEASE LEAVE THIS HERE FOR FUTURE USES IF NEEDED
   *
   * @see `build-tailwind.sh` ln 279 & 451 for details on installation
   *
   * @description This was a temporary workaround
   * Resolved an issue where the initializer for reanimated was not being loaded on web in 3.16.x
   *
   * This was fixed with 3.17.0 however, 3.17.0 breaks Android. Will continue to monitor and test
   *
   * Issue: @link (https://github.com/software-mansion/react-native-reanimated/issues/6740)
   * PR: @link (https://github.com/software-mansion/react-native-reanimated/pull/6980)
   */
  // 'react-native-reanimated': 'react-native-reanimated-web',
  'i18n-iso-countries': '@shellscape/i18n-iso-countries',
};

config.transformer = {
  ...config.transformer,
  assetPlugins: ['expo-asset/tools/hashAssetFiles'],
  getTransformOptions: async () => ({
    transform: {
      experimentalImportSupport: false,
      inlineRequires: true,
    },
  }),
};

// config.resolver.unstable_enablePackageExports = true;

// config.resolver.unstable_conditionNames = [
//   'browser',
//   'require',
//   'react-native',
// ];

config.resolver.resolveRequest = (context, moduleName, platform) => {
  /**
   * @description When metro is bundling we can use the `resolveRequest`
   * method from our config to access:
   * - Resolution Context
   * - Module Name
   * - Platform
   *
   * We can use our context to set the module name using the same `resolveRequest`
   * method. Since the platform is passed with the resolver, we can check for a
   * web bundle and assign our alias by index our ALIASES map from above.
   */
  if (platform === 'web') {
    return context.resolveRequest(context, ALIASES[moduleName] ?? moduleName, platform);
  }
  return context.resolveRequest(context, moduleName, platform);
};

module.exports = config;