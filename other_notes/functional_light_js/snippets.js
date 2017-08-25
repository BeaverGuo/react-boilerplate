//1.partial apply
function partial(fn,...presetArgs) {
	return function partiallyApplied(...laterArgs){
		return fn( ...presetArgs, ...laterArgs );
	};
}


function add(x,y) {
	return x + y;
}

[1,2,3,4,5].map( partial( add, 3 ) );

// add(3,1), add(3,2), add(3,3), add(3,4), and add(3,5).

//2. reverse args
function reverseArgs(fn) {
	return function argsReversed(...args){
		return fn( ...args.reverse() );
	};
}

function partialRight( fn, ...presetArgs ) {
	return reverseArgs(
		partial( reverseArgs( fn ), ...presetArgs.reverse() )
	);
}

var cacheResult = partialRight( ajax, function onResult(obj){
	cache[obj.id] = obj;
});

// later:
cacheResult( "http://some.api/person", { user: CURRENT_USER_ID } );

// eg
function foo(x,y,z) {
	var rest = [].slice.call( arguments, 3 );
	console.log( x, y, z, rest );
}

var f = partialRight( foo, "z:last" );

f( 1, 2 );			// 1 2 "z:last" []      partial( reverseArgs( fn ), ...presetArgs.reverse() ) --> foo('z:last', 2,1) 2 reverses, 再外面reverseArgs --> foo(1,2, 'z:last')

f( 1 );				// 1 "z:last" undefined []

f( 1, 2, 3 );		// 1 2 3 ["z:last"]

f( 1, 2, 3, 4 );	// 1 2 3 [4,"z:last"]


// 3. curring
function curry(fn,arity = fn.length) { // function length
	return (function nextCurried(prevArgs){
		return function curried(nextArg){
			var args = prevArgs.concat( [nextArg] );

			if (args.length >= arity) {
				return fn( ...args ); //没有参数的时候也会调用一次
			}
			else {
				return nextCurried( args );
			}
		};
	})( [] );
}


[1,2,3,4,5].map( curry( add )( 3 ) );
// [4,5,6,7,8]

