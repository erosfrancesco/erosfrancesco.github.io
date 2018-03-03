_applySpriteToCube = (geometry, facesSprite) => {
	
	matrix = (nestedArray) => {	
		let res = [];
		nestedArray.forEach(el => { res.push(new THREE.Vector2(el[0], el[1])); });
		return res;
	};
	/**************************
		   
		  __0__0.3__0.6_
		0|    |    |    |
		 |____|____|____|
		1|    |    |    |
		 |____|____|____|

	***************************/

	// assign different parts of image to different parts of cube
	// facesSprite: [ [x,y], [x,y], [x,y], [x,y], [x,y], [x,y] ]

	let s1 = matrix([ [0,   0.5], [0,   1  ], [1/3, 1  ], [1/3, 0.5] ]),
	    s2 = matrix([ [1/3, 0.5], [1/3, 1  ], [2/3, 1  ], [2/3, 0.5] ]),
	    s3 = matrix([ [2/3, 0.5], [2/3, 1  ], [1,   1  ], [1,   0.5] ]),
	    s4 = matrix([ [2/3, 0  ], [2/3, 0.5], [1,   0.5], [1,   0  ] ]),
	    s5 = matrix([ [1/3, 0  ], [1/3, 0.5], [2/3, 0.5], [2/3, 0  ] ]),
	    s6 = matrix([ [0,   0  ], [0,   0.5], [1/3, 0.5], [1/3, 0  ] ]);
		
	//clears UV mapping that already existed
	geometry.faceVertexUvs[0] = [];
	
	geometry.faceVertexUvs[0][10] = [ s1[0], s1[1], s1[3] ];
	geometry.faceVertexUvs[0][11] = [ s1[1], s1[2], s1[3] ];

	geometry.faceVertexUvs[0][6]  = [ s2[0], s2[1], s2[3] ];
	geometry.faceVertexUvs[0][7]  = [ s2[1], s2[2], s2[3] ];

	geometry.faceVertexUvs[0][2]  = [ s3[0], s3[1], s3[3] ];
	geometry.faceVertexUvs[0][3]  = [ s3[1], s3[2], s3[3] ];
			
	geometry.faceVertexUvs[0][0]  = [ s4[0], s4[1], s4[3] ];
	geometry.faceVertexUvs[0][1]  = [ s4[1], s4[2], s4[3] ];

	geometry.faceVertexUvs[0][4]  = [ s5[0], s5[1], s5[3] ];
	geometry.faceVertexUvs[0][5]  = [ s5[1], s5[2], s5[3] ];
			  
	geometry.faceVertexUvs[0][8]  = [ s6[0], s6[1], s6[3] ];
	geometry.faceVertexUvs[0][9]  = [ s6[1], s6[2], s6[3] ];


	return geometry;
};

/*
	// must be defined in a counter clockwise direction
	// facesSprite
	geometry.faceVertexUvs[0][10] = [ s1[0], s1[1], s1[3] ];
	geometry.faceVertexUvs[0][11] = [ s1[1], s1[2], s1[3] ];

	geometry.faceVertexUvs[0][6]  = [ s2[0], s2[1], s2[3] ];
	geometry.faceVertexUvs[0][7]  = [ s2[1], s2[2], s2[3] ];

	geometry.faceVertexUvs[0][2]  = [ s3[0], s3[1], s3[3] ];
	geometry.faceVertexUvs[0][3]  = [ s3[1], s3[2], s3[3] ];
			
	geometry.faceVertexUvs[0][0]  = [ s4[0], s4[1], s4[3] ];
	geometry.faceVertexUvs[0][1]  = [ s4[1], s4[2], s4[3] ];

	geometry.faceVertexUvs[0][4]  = [ s5[0], s5[1], s5[3] ];
	geometry.faceVertexUvs[0][5]  = [ s5[1], s5[2], s5[3] ];
			  
	geometry.faceVertexUvs[0][8]  = [ s6[0], s6[1], s6[3] ];
	geometry.faceVertexUvs[0][9]  = [ s6[1], s6[2], s6[3] ];
	/**/