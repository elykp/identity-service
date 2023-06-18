const glob = require("glob");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

const getEntries = () => {
  return glob.sync("./src/themes/**/*.js").reduce((res, curr) => {
    res[curr] = path.join(__dirname, curr);
    return res;
  }, {});
};

module.exports = {
  entry: getEntries(),
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./src/themes/**/theme.properties",
          to({ absoluteFilename }) {
            return absoluteFilename.replace("src", path.join("dist", "src"));
          },
        },
      ],
    }),
  ],
};
