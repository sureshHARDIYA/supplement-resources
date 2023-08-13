const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.svg$/,
        type: 'asset/inline', // Use asset modules for SVG
        generator: {
          dataUrl: content => {
            content = content.toString();
            return `data:image/svg+xml,${encodeURIComponent(content)}`;
          },
        },
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js',
    library: {
      name: 'Warning',
      type: 'umd',
      export: 'default',
    },
  },
};
