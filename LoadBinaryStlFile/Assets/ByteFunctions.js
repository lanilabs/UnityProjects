#pragma strict

import System.Linq;
import System.Collections.Generic;

public function hex_uint8_to_ascii(data :String, offset : int, count : int) : String {
	// Loop through from start to end, 2 bits per ascii character
	var ascii : String = String.Empty;
	var j : int;
	for (var i : int = 0; i < count; i += 2) {
	  j = i+ offset;
	  // each 2 bits directly converts to a character, thus :
	  var s : String = String.Empty;
	  
	  // grab the next two characters
	  s = data[j]+""+data[j+1];
	  
	  // Find the uint32 bit version of those characters
	  var decval: uint = System.Convert.ToUInt32(s,16);
	  
	  // Convert the uint32 to a ascii character
	  var c : char = System.Convert.ToChar(decval);
	  
	  // append character to the output ascii string
	  ascii += c;
	}
	
	return ascii;
}
public function uint8_to_ascii(data : byte[], offset : int, count : int) : String {
  
  // Get the header data of the file only:  
  var bytes : byte[] = new byte[160];
  for (var i=0;i<count;i++)
  	bytes[i] = data[offset+i];
  
  // Convert data to ascii
  var ascii : String = System.Text.Encoding.ASCII.GetString(bytes);
  
  return ascii;
}

public function hexstr_to_uint32 (data : String, offset : int, count : int) : uint {
    
    // Convert the string into uint 32
    var s : String = data.Substring(offset,count);
    
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
public function str_to_float (data : String, offset : int, count : int) :float {
    // Grab the hex data as a string
    var s = data.Substring(offset, count);

    // Convert the string into a hexidecimal : ex '000080bf' to 0x000080bf
	var hex = System.Int32.Parse(s,System.Globalization.NumberStyles.HexNumber);
	
	// Convert the hex to byte[]
	var bytes : byte[] = System.BitConverter.GetBytes(hex);
	
	// Assume bytes are little-endian
	bytes = bytes.Reverse().ToArray();

	// convert byte[] to float
	return System.BitConverter.ToSingle(bytes,0);
  
}