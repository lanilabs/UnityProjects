#pragma strict

var stl_location : String = "file:///Users/lucaszw/Documents/Lanilabs/Side Projects/UnityProjects/LoadBinaryStlFile/pyramid.stl";
var bytefcns : ByteFunctions;

private var shape = new Array ();
private var triangle = Vector3(0,0,0);
private var number_of_triangles : int;

function Start () {

  // Read a stl file :
  // Grab the file via a WWW request
  var www_stl : WWW = new WWW (stl_location);

  // pause running until the file has been retrieved
  yield www_stl; 
  
  var txt : String = "";
  
  // Grab the bytes of the file, and then convert it to a String
  var file_content : String = System.BitConverter.ToString(www_stl.bytes).Replace("-","");
  
  // Declare all iteration variables (cannot use vals more then one otherwise)
  var i : int = 0;var j : int = 0; var k : int = 0;
  
  // Get the file header :
  var header : String = bytefcns.hex_uint8_to_ascii(file_content, 0, 160);
  Debug.Log("Header : ");
  Debug.Log(header);
  
  // Get the number of triangles in the file
  var num_triangles : uint = bytefcns.hexstr_to_uint32(file_content, 160, 8);
  Debug.Log("Number of Triangles:");
  Debug.Log(num_triangles);
  
  var offset : int = 168;
  var count : int = 96;
    
  for (i = 0;i<num_triangles;i++){
    Debug.Log("Getting Triangle # : " + i.ToString());
    var triangle = grab_triangle(file_content,offset,count);
    for (j=0;j<4;j++) {
    	Debug.Log (triangle[j]);
    }
    offset += (count +4);
  }
  
  //grab_triangle(data : String, offset : int , count : int )
      
      
//  // Get the header data of the file :  
//  var header : String = bytefcns.uint8_to_ascii(file_content, 0, 160);
//  
//  Debug.Log("Header : ");
//  Debug.Log(header);
//  
//  
//  var triangles_bytes : byte[] = new byte[8];
//  for (i=0;i<8;i++){
//    // Debug.Log(file_content[160+i]);
//    triangles_bytes[i] = file_content[160+i];
//  }
//  
//  Debug.Log(System.BitConverter.ToUInt32(triangles_bytes,0));
//  // Convert to big-endian
//  triangles_bytes = triangles_bytes.Reverse().ToArray();
//  
//  // Convert to uint
//  var triangle_count : uint = System.BitConverter.ToUInt32(triangles_bytes,0);
//  
//  Debug.Log("Number of Triangles:");
//  Debug.Log(triangle_count);
    
//  var line : String = "";
  
  // Read the file header (uint8[80])
  
  
  //header_ascii = bytefcns.uint8str_to_ascii(file_content,0,160);

  //Debug.Log(file_content[160]);
  
//  for (i= 0; i < 160;i+=10){
//    
//    // Read a portion of the header
//    for (j=0;j<9;j++) {
//        // ignore spaces and line breaks (always occur as the 5th character)
//    	// if (j != 4)
//    	line += file_content[i+j]+"";
//    }
//    // convert to ascii
//    header_ascii += line;
//    //bytefcns.uint8str_to_ascii() ;
//    
//    line = "";
//  }
  
  // Print the file header to the console
  
  // Get the number of triangles in the file
//  for (i=200;i<209;i++){
//    // ignore line breaks
//  	if (i != 204)
//  	  line += file_content[i];
//  }
//  
//  number_of_triangles = bytefcns.uint32str_to_float(line);
//  line = "";
//  Debug.Log("Number of Triangles:");
//  Debug.Log(number_of_triangles);
  
  // A new triangle is defined from now on after every four REAL32[3] vectors
  // normal vector, vector A, vector B, and vector C
//  var start_pnt : int = 210;
//  
//  // characters included in file are spaces and line breaks as well
//  var num_tri_chars : int = 87;
//  var num_vec_chars : int = 10;
//  
  // Iterate through triangles
  //for (i=start_pnt;i<start_pnt+(num_tri_chars);i+=95){
 	// Grab the facet normal
   //Debug.Log(grab_vector(file_content.Substring(i,29)));
   // Iterate through each vector
    //for (j=i+29;j<i+(29*3);j+=29){
      //Debug.Log(grab_vector(file_content.Substring(j,29)));
    //}
  //}
    
}
public function grab_triangle(data : String, offset : int , count : int ) {
	var triangle : Vector3[] = new Vector3[4];
	// Split String to grab all data related to the triangle 
	// and the first vectors
	var s_triangle : String = data.Substring(offset, count);
	var count_pnt : int = count/4;
	var s_pnt : String = s_triangle.Substring(0, count_pnt);
	
	// Iterate through the facet normal, and three triangles
	for ( var i=0;i<4;i++) {
		triangle[i] = grab_vector(s_pnt,0,count_pnt);
		// Get the next vector in the triangle
		if (i!=3)
		  s_pnt = s_triangle.Substring((i+1)*count_pnt,count_pnt);
	}
	
	return triangle;
}
public function grab_vector(data : String, offset : int, count : int) : Vector3 {
  
  var tmp_vec = Vector3(0.0,0.0,0.0);
  
  // Iterate through each point in the vector
  for (var i = 0;i<3;i++) {
  	// Convert the string into a vector
 	tmp_vec[i] = bytefcns.str_to_float(data,offset, count/3);
 	// Adjust offset to start at the next point
    offset += count/3;
  }
  return tmp_vec;
}

  // iterate through each triangle
//  for (var m = start_pnt; m < start_pnt+number_of_triangles*num_tri_chars; m+= num_tri_chars) {
////  	// iterate through x y and z of vector
////  	var pnts_norm_chars = 27;
////  	for (i = m; i< m+ 3*pnts_norm_chars;i+= pnts_norm_chars){
////  	  // iterate through the characters in reach REAL32 float for the vector
////  	  for (j=0;j<9;j++){
////  	    if (j!= 4)
////  	      line += file_content[i+j];
////  	  }
////  	  Debug.Log(line);
////  	  line = "";
////  	}
////    
//  }
  

//  Debug.Log(file_content.Length);
//  for (var i=0;i<4;i++){
//  	for (int j=0;j<8;j++){
//  	  var line : string = file_content[j*(i+1)];
//  	  Debug.Log(line);
//  	}  	
//  }
//  var j : int;
//  for (var i=0;i<file_content.Length;i++){
//  	Debug.Log(file_content[i]);
//  }
  
  
  
  // Read the triangle count
  
  
  // Loop through rest of data
  
  
  
  
//  // read each set of 4 bits in a file
//  for (var i=0;i<file_content.Length;i+=4){
//    // look for the word 'vertex', as you know that a vector is soon to follow
//    if (file_content[i] == "vertex"){
//      for (var j=1;j<= 3; j++){
//      	// add item to 3D vector
//      	triangle[j-1] = double.Parse(file_content[i+j]);
//      }
//      shape.push(triangle);
//      Debug.Log(shape[shape.length-1]);
//    }
//  }
//  
//  mesh.Clear();
//  
//  mesh.vertices = shape;
//  Debug.Log("First Mesh Vertices");
//  Debug.Log(mesh.vertices[1]);
//
//  var all_triangles = new int[shape.length];
//  
//  
//  var m = 0;
//  
//  Debug.Log("Number of Triangles : ");
//  Debug.Log(shape.length);
//  
//  for ( var k=0;k<shape.length;k++) {
//      all_triangles[k] = k ;
//  }
//  mesh.triangles = all_triangles;
//  
//   
//  mesh.RecalculateNormals();
//  mesh.RecalculateBounds();
//  mesh.Optimize();
//  
//  var www : WWW = new WWW (url);
//  
//  yield www;
//  this.renderer.material.mainTexture = www.texture;
  
//}

function Update () {

}