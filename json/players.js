// pgRoaster

let pg_Kefka = {

    AI: () => { console.log('Thinking'); },
    Name: 'Kefka',
    BattleStatus: 'Charging',

    FinalMove: function(callback){
        player.Clock.add(() => { console.log('Imma die...'); });
        player.Clock.add(callback);
    },

    SpriteSource: (x, y, z) => {
        return _DrawSpriteSheet(FFVICAST_SPRITESHEET,
            x, y, z,
            170, 189,
            'kefka');
    },

    Stats: {
        lif: 1059,
        man: 283
    }
};

let pg_Terra = {

        AI: function(){},
        Name: 'Terra',
        BattleStatus: 'Charging',

        FinalMove: function(callback){
            player.Clock.add(() => { console.log('Imma die...'); });
            player.Clock.add(callback);
        },

        SpriteSource: (x, y, z) => {
            return _DrawSpriteSheet(FFVICAST_SPRITESHEET,
                x, y, z,
                170, 189,
                'terra');
        },

        Stats: {
            lif: 1059,
                man: 283
        }
};

let pg_Sabin = {

        AI: function(){},
        Name: 'Sabin',
        BattleStatus: 'Charging',

        FinalMove: function(callback){
            player.Clock.add(() => { console.log('Imma die...'); });
            player.Clock.add(callback);
        },

        SpriteSource: (x, y, z) => {
            return _DrawSpriteSheet(FFVICAST_SPRITESHEET,
                x, y, z,
                170, 189,
                'sabin');
        },

        Stats: {
            lif: 1059,
            man: 283
        }
};

let pg_Edgar = {

        AI: function(){},
        Name: 'Edgar',
        BattleStatus: 'Charging',

        FinalMove: function(callback){
            player.Clock.add(() => { console.log('Imma die...'); });
            player.Clock.add(callback);
        },

        SpriteSource: (x, y, z) => {
            return _DrawSpriteSheet(FFVICAST_SPRITESHEET,
                x, y, z,
                170, 189,
                'edgar');
        },

        Stats: {
            lif: 1059,
            man: 283
        }
};

let pg_Shadow = {

        AI: function(){},
        Name: 'Shadow',
        BattleStatus: 'Charging',

        FinalMove: function(callback){
            player.Clock.add(() => { console.log('Imma die...'); });
            player.Clock.add(callback);
        },

        SpriteSource: (x, y, z) => {
            return _DrawSpriteSheet(FFVICAST_SPRITESHEET,
                x, y, z,
                170, 189,
                'shadow');
        },

        Stats: {
            lif: 1059,
            man: 283
        }
};


let _battle_object_test = {
    
    'players': {
        'Terra': {
            'object': pg_Terra,
            'x': 150,
            'y': 0,
            'z': 0
        },
        'Sabin': {
            'object': pg_Sabin,
            'x': 120,
            'y': 30,
            'z': -1
        },
        'Edgar': {
            'object': pg_Edgar,
            'x': 90,
            'y': 60,
            'z': -2
        },
        'Shadow': {
            'object': pg_Shadow,
            'x': 60,
            'y': 90,
            'z': -3
        }
    },
    
    'enemys': { 
        'Kefka': {
            'object': pg_Kefka,
            'x': -150,
            'y': 60,
            'z': 0
        }
    },
    
    'background': {
        'spritesheet': FFVI_SNOW_BACKGROUND_SPRITESHEET,
        'source':      'default',
        'animation':   'default'
    },
    //'music':
};