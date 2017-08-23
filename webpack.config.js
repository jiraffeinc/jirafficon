const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
  {
    context: __dirname + '/',
    entry: {
      'app': './js/src/app.js',
    },
    output: {
      path: __dirname + '/js/dist/',
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          query:{
            presets: ['es2015']
          }
        }
      ]
    }
  },
  {
  entry: {
    style: './sass/style.sass'
  },
  output: {
    path: path.join(__dirname, './css'),
    filename: '[name].css'
  },
  module: {
    loaders: [
      {
        test: /\.(scss|sass|css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader', options: { minimize: true}
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|eot|ttf|woff|woff2)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  }
];
