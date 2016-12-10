module.exports = {
  entry: './main',
  output: {
    filename: 'app.js',
  },
  module: {
    loaders: [
      {
        test: /.ts$/,
        exclude: 'node_modules',
        loader: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
  },
};
