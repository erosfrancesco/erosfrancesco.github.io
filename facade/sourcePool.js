/* Assets Pool. Load' em here! */

let ASSETS_POOL = {
	
	pool:         [],
	assNumber:    0,
	takeCount:    0,
	
	load:         (Resources, callback) => {

					if( !(typeof Resources == 'array') ){ Resources = [Resources]; }

					ASSETS_POOL.allLoaded = false;
					Resources.forEach( HTML5tag => {
						ASSETS_POOL.assNumber++;
						ASSETS_POOL.pool.push(HTML5tag);

						HTML5tag.onload = function(){
							ASSETS_POOL.takeCount++;
							ASSETS_POOL.loadingDummy.appendChild(HTML5tag);
							
							//HTML5tag.crossOrigin = "Anonymous"; // when using firefox, comment this line

								if( ASSETS_POOL.takeCount == ASSETS_POOL.assNumber ){
									ASSETS_POOL.refresh();
									callback(Resources);
								}
							}
		
						});
		
					},

	refresh:      () => { ASSETS_POOL.takeCount = 0; ASSETS_POOL.assNumber = 0; },

	loadingDummy: Bridge.DOM.Div('0%', '0%', '0%', '0%', { visibility: 'hidden' }),
};

