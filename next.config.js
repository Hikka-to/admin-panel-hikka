module.exports = (phase, { defaultConfig }) => {
	const config = {
		webpack: (config, options) => {
			config.module.rules.push({
				test: /\.tsx?$/,
				loader: "ts-loader",
				options: {
					compiler: "ts-patch/compiler"
				}
			});

			return config;
		}
	};

	return Object.assign(config, {
		// constants to process.env.
	});
};
