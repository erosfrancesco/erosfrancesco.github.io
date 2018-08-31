const LoadAssets = config => {
	
	let {loader, assets} = config;
	let {baseUrl, image, spritesheet, audio} = assets;
	
	baseUrl = baseUrl || './';
	image = image || [];
	spritesheet = spritesheet || [];
	audio = audio || [];
	
	loader.baseURL = baseUrl;

	image.forEach(config => {
		loader.image(config.key, config.src, config.params); 
		console.log('loading ', config.key);
	});

	spritesheet.forEach(config => {
		loader.spritesheet(config.key, config.src, config.params); 
		console.log('loading ', config.key);
	});

	audio.forEach(config => {
		loader.audio(config.key, config.src, config.params); 
		console.log('loading ', config.key);
	});

};

export default LoadAssets;
