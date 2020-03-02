
module.exports = {
    entry: [
        './src/index.js'
    ],
    module: {
        rules: [
            {
                test: [/\.jsx?$/, /\.js?$/],
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/env",
                            "@babel/react"
                        ],
                    }
                }
            }, 
            {
                test: /\.(jpg|png)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx", "*"]
    },
    devServer:{
        contentBase: "./",
        port: 3000
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/dist',
        filename: 'main.js'
    }
}