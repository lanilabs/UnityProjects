#pragma strict
import System.Linq;
import System.Collections.Generic;
    
private var real32input : String = "Enter REAL32 bit here";
private var real32output : String = "Val for REAL32 goes here";

private var uint32input : String = "Enter uint32 bit here";
private var uint32output : String = "Val for uint32 goes here";

var btnTexture : Texture;


function OnGUI () {
	
	// This code is taking way to long to get running
	// WHY ARE YOU SO CONFUUUSING C# APIIIII
	
	real32input = GUI.TextField (Rect (10, 10, 200, 20), real32input, 50);
	GUI.Label (Rect (10, 30, 300, 50), real32output);
	if (GUI.Button(Rect(210,10,50,20),btnTexture)){
	  real32output = real32_str_to_float("000080bf").ToString();
	}

	uint32input = GUI.TextField (Rect (10, 50, 200, 20), uint32input, 50);
	GUI.Label (Rect (10, 70, 300, 50), uint32output);
	if (GUI.Button(Rect(210,50,50,20),btnTexture)){
	  uint32output = real32_str_to_float("000080bf").ToString();
	}
	
	
}

function real32_str_to_float (s : String) : float {
    // Convert the string into a hexidecimal : ex '000080bf' to 0x000080bf
	var hex = System.Int32.Parse(s,System.Globalization.NumberStyles.HexNumber);
	// Convert the hex to byte[]
	var bytes : byte[] = System.BitConverter.GetBytes(hex);
	// Check if little endian, and if it is reverse the byte order:
	if (System.BitConverter.IsLittleEndian){
	  bytes = bytes.Reverse().ToArray();
	}
	// convert byte[] to float
	return System.BitConverter.ToSingle(bytes,0);
}

function Start () {

}

function Update () {

}