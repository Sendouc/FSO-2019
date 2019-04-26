const path = require('path')
const webpack = require('webpack')

const config = (env, arg) => {
  const backend_url = argv.mode === 'production' ? 'urlhere' : 'anotherurlhere'
  return {
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'main.js',
    },
    devServer: {    
      contentBase: path.resolve(__dirname, 'build'),    
      compress: true,    
      port: 3000,  
    },
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({        
        BACKEND_URL: JSON.stringify(backend_url)      
      })
    ]
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: 'babel-loader',
          query: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
        { test: /\.css$/,      
          loaders: ['style-loader', 'css-loader'],    
        },
      ],
    },
  }
}

module.exports = config