module.exports = {
  extends: "airbnb",
  rules: {
    "dot-notation": 0,
  },
  "globals": {
      "__DEV__": true,
      "__PROD__": true,
  },
  settings: {
    'import/resolver': {
      webpack: {
          config: 'webpack.config.base.js'
      },
      'import/extensions': ['.js', '.jsx'],
    },
  },
};
