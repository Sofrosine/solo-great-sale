module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          assets: './src/assets',
          components: './src/components',
          constants: './src/constants',
          data: './src/data',
          pages: './src/pages',
          queries: './src/queries',
          recoil: './src/recoil',
          routes: './src/routes',
          styles: './src/styles',
          types: './src/types',
          utils: './src/utils',
        },
      },
    ],
  ],
};
