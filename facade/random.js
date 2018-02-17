/*Some functions for randomness*/
	_return_result_of_probability = (percentage) => { return (_dice_roll(100) < percentage) ? false : true };

	_dice_roll = (d) => { return _return_random_number(0, d); };

	_return_random_number= (x, y) => { return Math.floor(Math.random() * (y - x + 1) + x); };
/*-----------------------------*/


/*Copying an object in javascript is not easy! See deep cloning for more info.
  This function simply return a copy of an object.*/
deepClone = (o) => {
	let _out, v, _key;
	
	_out = ( Array.isArray(o) ) ? [] : {}
	Object.keys(o).forEach( _key => { _out[_key] = ( typeof v === "object" ) ? deepClone( o[_key] ) : o[_key] });
	return _out;
}
/*---------------------------------------------------------------------------*/


/*Oscillators!*/

