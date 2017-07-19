const webpack = require('webpack')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const path = require('path')
const rootPath = path.resolve(__dirname, '')
module.exports = {
    entry: "./src/app.tsx",
    output: {
        filename: "bundle.js",
        publicPath: "dist",
        path: __dirname + "/dist"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"],
        alias: {
            COMPONENTS: path.resolve(rootPath, 'src/components')
        }
    },

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            {test: /\.styl?$/, loader: "style-loader!css-loader!stylus-loader"},
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },

    // When importing a module whose path matches one of the following, just
    // assume a corresponding global variable exists and use that instead.
    // This is important because it allows us to avoid bundling all of our
    // dependencies, which allows browsers to cache those libraries between builds.
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },

    plugins: [
        new OpenBrowserPlugin({ url: 'http://localhost:8033' }),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false
          }
        })
    ]

};