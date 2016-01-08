var webpackConfig = {
    output: {
        path: './dist',
        filename: 'examples.js'
    },

    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
        ]
    },

    entry: {
        examples: './examples/examples.js'
    }
};

module.exports = webpackConfig;