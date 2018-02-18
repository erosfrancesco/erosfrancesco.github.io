let DummyJsonSphere = {
	"geometry": {
		"three": THREE.SphereGeometry,
		"parameters": [ 50, 16, 16 ]
	},
	"material": {
		"three": THREE.MeshLambertMaterial,
		"parameters": {
			"color": 0x44ee44
		}
	},
	"mesh": {
		"three": THREE.Mesh,
		"after": {
			"rotation": {
				"x": "Math.PI / 2"
			},
			"position": {
				"x": 100,
				"y": 100,
				"z": -50
			}
		}
	}
};


_buildMesh = (obj) => {
	
	let geometry = _returnThreeJsSubProperty(obj.geometry);
	let material = _returnThreeJsSubProperty(obj.material);
	let mesh = new obj.mesh['three'](geometry, material);

	mesh.position.x = 100;
	mesh.position.y = 100;
	mesh.position.z = -50;

	_Gm.scene.add(mesh);

	return mesh;
};

_returnThreeJsSubProperty = (gen) => {

	newCall = (fun, pars) => { return new (Function.prototype.bind.apply(fun, pars)); };

	let obj_constructor = gen['three'],
	    obj_parameters  = gen['parameters'],
	    obj;

	if (obj_parameters[0]) {
		obj = newCall(obj_constructor, obj_parameters);
	}else{
		obj = new obj_constructor(obj_parameters);
	}

	return obj;
};