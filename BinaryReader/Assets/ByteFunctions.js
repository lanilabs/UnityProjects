#pragma strict

import System.Linq;
import System.Collections.Generic;

public function uint8str_to_float(uint8_string : String) : String {
	var ascii : String = String.Empty;
	
	for (var i : int = 0; i < uint8_string.Length; i += 2) {
	  
	  // each 2 bits directly converts to a character, thus :
	  var s : String = String.Empty;
	  
	  // grab the next two characters
	  s = uint8_string.Substring(i,2);
	  
	  // Find the uint32 bit version of those characters
	  var decval: uint = System.Convert.ToUInt32(s,16);
	  
	  // Convert the uint32 to a ascii character
	  var c : char = System.Convert.ToChar(decval);
	  
	  // append character to the output ascii string
	  ascii += c;
	}
	return ascii;
}

public function uint32str_to_float (s : String) : uint {
    
    // Convert the string into uint 32
	var uint_big_endian : uint = System.Convert.ToUInt32(s,16);
	
	// Convert to bytes
	var bytes : byte[] = System.BitConverter.GetBytes(uint_big_endian);
	
	// assume the bytes are little-endian:
	bytes = bytes.Reverse().ToArray();
	
	// Return the bits converted back to a uint
    return System.BitConverter.ToUInt32(bytes,0);
}

public function real32_str_to_float (s : String) : float {
    
    // Convert the string into a hexidecimal : ex '000080bf' to 0x000080bf
	var hex = System.Int32.Parse(s,System.Globalization.NumberStyles.HexNumber);
	
	// Convert the hex to byte[]
	var bytes : byte[] = System.BitConverter.GetBytes(hex);
	
	// Assume bytes are little-endian
	bytes = bytes.Reverse().ToArray();
	
	// convert byte[] to float
	return System.BitConverter.ToSingle(bytes,0);
}