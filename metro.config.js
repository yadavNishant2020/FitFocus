const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */

const additionalConfig = {
  // Define additional configurations here if needed
};

module.exports = mergeConfig(getDefaultConfig(__dirname), additionalConfig);