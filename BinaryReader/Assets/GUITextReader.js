#pragma strict

import System.Linq;
import System.Collections.Generic;


private var real32input : String = "000080bf";
private var real32output : String = "Val for REAL32 goes here";

private var uint32input : String = "04000000";
private var uint32output : String = "Val for uint32 goes here";

private var uint8input : String = "6c616e69";
private var uint8output : String = "Val for uint8 goes here";


var btnTexture : Texture;
var byte_obj : ByteFunctions;
function OnGUI () {
	
	// This code is taking way to long to get running
	// WHY ARE YOU SO CONFUUUSING C# APIIIII
	
	real32input = GUI.TextField (Rect (10, 10, 200, 20), real32input, 50);
	GUI.Label (Rect (10, 30, 300, 50), real32output);
	if (GUI.Button(Rect(210,10,50,20),btnTexture)){
	  
	  real32output = byte_obj.real32_str_to_float(real32input).ToString();
	}

	uint32input = GUI.TextField (Rect (10, 50, 200, 20), uint32input, 50);
	GUI.Label (Rect (10, 70, 300, 50), uint32output);
	if (GUI.Button(Rect(210,50,50,20),btnTexture)){
	  uint32output = byte_obj.uint32str_to_float(uint32input).ToString();
	}
	
	uint8input = GUI.TextField (Rect (10, 90, 200, 20), uint8input, 50);
	GUI.Label (Rect (10, 110, 300, 50), uint8output);
	if (GUI.Button(Rect(210,90,50,20),btnTexture)){
	  uint8output = byte_obj.uint8str_to_float("6c616e69");
	}
		
}
