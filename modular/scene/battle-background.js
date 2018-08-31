const BuildBattleBackground = options => {
    
    let {background, scene} = options;
    let {key, config, type} = background;
    config = config || {};

    let img = scene.make[type]({key});
    Object.keys(config).forEach(p => { img[p] = config[p]; });

    let {displayWidth, displayHeight} = img;
    img.x = displayWidth / 2;
    img.y = displayHeight / 2;
    img.z = -10000;

    return img;  
}

export default BuildBattleBackground;