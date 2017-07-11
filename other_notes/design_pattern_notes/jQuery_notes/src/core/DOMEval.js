define( [
	"../var/document"
], function( document ) {
	"use strict";

	function DOMEval( code, doc ) {//添加一个script在head下
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;//脚本内容写入
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}

	return DOMEval;
} );
