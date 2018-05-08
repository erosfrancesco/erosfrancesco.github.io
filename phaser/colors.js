(function() {
    var colors = {
        aqua:    '#7fdbff',
        blue:    '#0074d9',
        lime:    '#01ff70',
        navy:    '#001f3f',
        teal:    '#39cccc',
        olive:   '#3d9970',
        green:   '#2ecc40',
        red:     '#ff4136',
        maroon:  '#85144b',
        orange:  '#ff851b',
        purple:  '#b10dc9',
        yellow:  '#ffdc00',
        fuchsia: '#f012be',
        gray:    '#aaaaaa',
        white:   '#ffffff',
        black:   '#111111',
        silver:  '#dddddd'
    };

    if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = colors;
    } else {
        window.colors = colors;
    }
})();


/* //Filters

        // dotWawe

        var fragmentSrc = [

        "precision mediump float;",

        "uniform vec2      resolution;",
        "uniform float     time;",

        "#define PI 90",

        "void main( void ) {",

        "vec2 p = ( gl_FragCoord.xy / resolution.xy ) - 0.0;",

        "float sx = 0.5 + 0.5 * sin( 100.0 * p.x - 1. * pow(time, 0.5)*5.) * sin( 5.0 * p.x - 1. * pow(time, 0.9)*5.);",

        "float dy = 1.0/ ( 1000. * abs(p.y - sx));",

        "dy += 1./ (25. * length(p - vec2(p.x, 0.)));",

        "gl_FragColor = vec4( (p.x + 0.3) * dy, 0.3 * dy, dy, 1.1 );",

    "}"];

    filter = new Phaser.Filter(game, null, fragmentSrc);
    filter.setResolution(800, 600);

    var sprite = game.add.sprite();
    sprite.width = 800;
    sprite.height = 600;

    sprite.filters = [ filter ];




        // dotBeam

        let fragmentSrc = [
            "precision mediump float;",
            "uniform vec2      resolution;",
            "uniform float     time;",
            "#define PI 90",
            "void main( void ) {",
            "vec2 p = ( gl_FragCoord.xy / resolution.xy ) - 0.5;",
            "float sx = 0.2 * (p.x + 0.8) * sin( 900.0 * p.x - 1. * pow(time, 0.55)*5.);",
            "float dy = 4./ ( 500.0 * abs(p.y - sx));",
            "dy += 1./ (38. * length(p - vec2(p.x, 0.)));",
            "gl_FragColor = vec4( (p.x + 0.2) * dy, 0.1 * dy, dy, 1.6 );",
            "}"
        ];

        GAME.filter = new Phaser.Filter(GAME.game, null, fragmentSrc);
        GAME.filter.setResolution(900, 500);

        GAME.sprite = GAME.add.sprite();
        GAME.sprite.width = 900;
        GAME.sprite.height = 500;

        GAME.sprite.filters = [ GAME.filter ];


    // mouseRay

    //  From http://glslsandbox.com/e#20326.0

    var fragmentSrc = [
        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        "float rand(int seed, float ray) {",
            "return mod(sin(float(seed)*1.0+ray*1.0)*1.0, 1.0);",
        "}",

        "void main( void ) {",
            "float pi = 3.14159265359;",
            "vec2 position = ( gl_FragCoord.xy / resolution.xy ) - mouse;",
            "position.y *= resolution.y/resolution.x;",
            "float ang = atan(position.y, position.x);",
            "float dist = length(position);",
            "gl_FragColor.rgb = vec3(0.5, 0.5, 0.5) * (pow(dist, -1.0) * 0.05);",
            "for (float ray = 0.0; ray < 18.0; ray += 1.0) {",
                "//float rayang = rand(5234, ray)*6.2+time*5.0*(rand(2534, ray)-rand(3545, ray));",
                "//float rayang = time + ray * (1.0 * (1.0 - (1.0 / 1.0)));",
                "float rayang = (((ray) / 9.0) * 3.14) + (time * 0.1            );",
                "rayang = mod(rayang, pi*2.0);",
                "if (rayang < ang - pi) {rayang += pi*2.0;}",
                "if (rayang > ang + pi) {rayang -= pi*2.0;}",
                "float brite = 0.3 - abs(ang - rayang);",
                "brite -= dist * 0.2;",
                "if (brite > 0.0) {",
                    "gl_FragColor.rgb += vec3(sin(ray*mouse.y+0.0)+1.0, sin(ray*mouse.y+2.0)+1.0, sin(ray*mouse.y+4.0)+1.0) * brite;",
                "}",
            "}",
            "gl_FragColor.a = 1.0;",
        "}"
    ];

    filter = new Phaser.Filter(game, null, fragmentSrc);
    filter.setResolution(800, 600);

    sprite = game.add.sprite();
    sprite.width = 800;
    sprite.height = 600;

    sprite.filters = [ filter ];


    // sineWave


    //  Shader by Kali (https://www.shadertoy.com/view/4dfGDM)
    //  Image patched by Richard Davey

    var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform sampler2D iChannel0;",

        "void main( void ) {",

            "vec2 uv = gl_FragCoord.xy / resolution.xy;",

            "// Flip-a-roo.",
            "uv.y *= -1.0;",

            "// Represents the v/y coord(0 to 1) that will not sway.",
            "float fixedBasePosY = 0.0;",

            "// Configs for you to get the sway just right.",
            "float speed = 3.0;",
            "float verticleDensity = 6.0;",
            "float swayIntensity = 0.2;",

            "// Putting it all together.",
            "float offsetX = sin(uv.y * verticleDensity + time * speed) * swayIntensity;",

            "// Offsettin the u/x coord.",
            "uv.x += offsetX * (uv.y - fixedBasePosY);",

            "gl_FragColor = texture2D(iChannel0, uv);",

        "}"
    ];

    //  Texture must be power-of-two sized or the filter will break
    sprite = game.add.sprite(0, 0, 'texture');
    sprite.width = 800;
    sprite.height = 600;

    var customUniforms = {
        iChannel0: { type: 'sampler2D', value: sprite.texture, textureData: { repeat: true } }
    };

    filter = new Phaser.Filter(game, customUniforms, fragmentSrc);
    filter.setResolution(800, 600);

    sprite.filters = [ filter ];

    // FIREBALL

    
    //  From http://glslsandbox.com/e#20112.1

    var fragmentSrc = [
        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2      resolution;",
        "uniform vec2      mouse;",

        "// Yuldashev Mahmud Effect took from shaderToy mahmud9935@gmail.com",

        "float snoise(vec3 uv, float res)",
        "{",
            "const vec3 s = vec3(1e0, 1e2, 1e3);",

            "uv *= res;",

            "vec3 uv0 = floor(mod(uv, res))*s;",
            "vec3 uv1 = floor(mod(uv+vec3(1.), res))*s;",

            "vec3 f = fract(uv); f = f*f*(3.0-2.0*f);",

            "vec4 v = vec4(uv0.x+uv0.y+uv0.z, uv1.x+uv0.y+uv0.z,",
            "uv0.x+uv1.y+uv0.z, uv1.x+uv1.y+uv0.z);",

            "vec4 r = fract(sin(v*1e-1)*1e3);",
            "float r0 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);",

            "r = fract(sin((v + uv1.z - uv0.z)*1e-1)*1e3);",
            "float r1 = mix(mix(r.x, r.y, f.x), mix(r.z, r.w, f.x), f.y);",

            "return mix(r0, r1, f.z)*2.-1.;",
        "}",

        "void main( void ) {",

            "vec2 p = -.5 + gl_FragCoord.xy / resolution.xy;",
            "p.x *= resolution.x/resolution.y;",

            "float color = 3.0 - (3.*length(2.*p));",

            "vec3 coord = vec3(atan(p.x,p.y)/6.2832+.5, length(p)*.4, .5);",

            "for(int i = 1; i <= 7; i++)",
            "{",
                "float power = pow(2.0, float(i));",
                "color += (1.5 / power) * snoise(coord + vec3(0.,-time*.05, time*.01), power*16.);",
            "}",

            "gl_FragColor = vec4( color, pow(max(color,0.),2.)*0.4, pow(max(color,0.),3.)*0.15 , 1.0);",

        "}"
    ];

    filter = new Phaser.Filter(game, null, fragmentSrc);
    filter.setResolution(800, 600);

    sprite = game.add.sprite();
    sprite.width = 800;
    sprite.height = 600;

    sprite.filters = [ filter ];

/**/