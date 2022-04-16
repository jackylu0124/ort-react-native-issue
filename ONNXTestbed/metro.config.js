/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const defaultAssetExts = require("metro-config/src/defaults/defaults").assetExts;
module.exports = {
  // Jacky added resolver
  resolver: {
    assetExts: [...defaultAssetExts, "ort"],
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
