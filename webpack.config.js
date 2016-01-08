var webpackConfig = {
    output: {
        path: './examples',
        filename: 'examples-dist.js'
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