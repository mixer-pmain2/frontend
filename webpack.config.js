// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                },
            }, {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }, {
                test: /\.svg$/,
                use: ["@svgr/webpack"]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        plugins: [],
        fallback: {
            fs: false
        },
        alias: {
            'components': path.resolve(__dirname, 'src/components/'),
            'api': path.resolve(__dirname, 'src/api/'),
            'store': path.resolve(__dirname, 'src/store/'),
            'consts': path.resolve(__dirname, 'src/consts/'),
            'utility': path.resolve(__dirname, 'src/utility/'),
            'pages': path.resolve(__dirname, 'src/pages/'),
            'classes': path.resolve(__dirname, 'src/classes/'),
            'assets': path.resolve(__dirname, 'src/assets/'),
            'style': path.resolve(__dirname, 'src/style/')
        }
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    devServer: {
        compress: true,
        port: 3000
    },
    entry: __dirname + "/src/index.js",
    output: {
        path: __dirname + "/public/assets/",
        publicPath: "/assets/",
        filename: "assets/main.js",
        chunkFilename: '[name].js'
    }
};
