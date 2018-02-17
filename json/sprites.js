//pgRoaster

let STND_FFVICAST_SPRITESHEET_WIDTH  = 170, // (680 / 4) = 170
    STND_FFVICAST_SPRITESHEET_HEIGHT = 189, // (756 / 4) = 189
    FFVICAST_SPRITESHEET             = {

    width: 680,
    height: 756,

    sprites: {

        'terra': {
            width:  STND_FFVICAST_SPRITESHEET_WIDTH,
            height: STND_FFVICAST_SPRITESHEET_HEIGHT,

            pool: {
                'default': {offx: 0, offy: 0},
                'morphed': {offx: 170, offy: 0}
            }
        },

        'locke': {
            width:  STND_FFVICAST_SPRITESHEET_WIDTH,
            height: STND_FFVICAST_SPRITESHEET_HEIGHT,

            pool: {
                'default': {offx: 340, offy: 0},
            }
        },

        'edgar': {
            width:  STND_FFVICAST_SPRITESHEET_WIDTH,
            height: STND_FFVICAST_SPRITESHEET_HEIGHT,

            pool: {
                'default': {offx: 510, offy: 0},
            }
        },

        'shadow': {
            width:  STND_FFVICAST_SPRITESHEET_WIDTH,
            height: STND_FFVICAST_SPRITESHEET_HEIGHT,

            pool: {
                'default': {offx: 0, offy: 189},
            }
        },

        'gau': {
            width:  STND_FFVICAST_SPRITESHEET_WIDTH,
            height: STND_FFVICAST_SPRITESHEET_HEIGHT,

            pool: {
                'default': {offx: 170, offy: 189},
            }
        },

        'cyan': {
            width:  STND_FFVICAST_SPRITESHEET_WIDTH,
            height: STND_FFVICAST_SPRITESHEET_HEIGHT,

            pool: {
                'default': {offx: 340, offy: 189},
            }
        },

        'sabin': {
            width:  STND_FFVICAST_SPRITESHEET_WIDTH,
            height: STND_FFVICAST_SPRITESHEET_HEIGHT,

            pool: {
                'default': {offx: 510, offy: 189},
            }
        },

        'kefka': {
            width:  STND_FFVICAST_SPRITESHEET_WIDTH,
            height: STND_FFVICAST_SPRITESHEET_HEIGHT,

            pool: {
                'default': {offx: 510, offy: 567},
            }
        }
    },

    src: pgRoaster
};


let STND_FFVI_SNOW_BACKGROUND_SPRITESHEET_WIDTH  = 800,
    STND_FFVI_SNOW_BACKGROUND_SPRITESHEET_HEIGHT = 432,
    FFVI_SNOW_BACKGROUND_SPRITESHEET             = {

        width:  STND_FFVI_SNOW_BACKGROUND_SPRITESHEET_WIDTH,
        height: STND_FFVI_SNOW_BACKGROUND_SPRITESHEET_HEIGHT,

        sprites: {
            'default': {
                width:  STND_FFVI_SNOW_BACKGROUND_SPRITESHEET_WIDTH,
                height: STND_FFVI_SNOW_BACKGROUND_SPRITESHEET_HEIGHT,

                pool: {
                    'default': {offx: 0, offy: 0},
                }
            }
        },

        src: BACKGROUND_SNOW
    };