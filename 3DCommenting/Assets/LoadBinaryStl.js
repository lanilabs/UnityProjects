#pragma strict

public var bytefcns : ByteFunctions;
public var selTexture : Texture[];

@HideInInspector
public var default_scale : float;

private var shape = new Array ();
private var triangle = Vector3(0,0,0);
private var number_of_triangles : int;
private var selectable : boolean;

private var material_string : String = "2";
private var  quality_string : String = "50";
private var 	size_string : String = "50";
private var stl_location : String
  = "http://www.lanilabs.com/system/user_models/stlfiles/000/000/445/original/Skinny_Jimmy3b516932a11720d49a160763e7e7b3ff-skinnyjimmy_fixed.stl";

private var initial_object : GameObject;

private var average_position = Vector3(0,0,0);

function Start () {
	//loadMesh(stl_location);
}

function SetByteFunctions(bytefunctions : ByteFunctions) {
	bytefcns = bytefunctions;
}

function ReceivedMessage(msg : String) {
	var msg_data = msg.Split(","[0]);
	
	// Function is called when a message is received from javascript
	material_string =  msg_data[0];
	size_string = msg_data[1];
	
	Debug.Log("Current Scale");
	Debug.Log(default_scale);
	
	// Update Material
	this.gameObject.renderer.material.mainTexture = selTexture[int.Parse(material_string)];
	
	// Update Scale
	this.gameObject.transform.localScale.x = default_scale * float.Parse(size_string);
	this.gameObject.transform.localScale.y = default_scale * float.Parse(size_string);
	this.gameObject.transform.localScale.z = default_scale * float.Parse(size_string);
	
	// SendAMessage(msg);
}
function SetScale(scale : float) {
	this.transform.localScale = Vector3(scale,scale,scale);
	this.default_scale = this.transform.localScale.x;
	Debug.Log("Set scale to : ");
	Debug.Log(this.transform.localScale);
	Debug.Log(default_scale);	
}

function SendAMessage(msg : String) {
	
	// Functions sends data back to a javascript function in the html page
	Application.ExternalCall( "ReceivedFromUnity", msg );
}

public function loadMesh(filepath : String) {
  
  // Read a stl file :
  // Grab the file via a WWW request
  var mesh : Mesh = GetComponent(MeshFilter).mesh;
  var old_bounds : Bounds = mesh.bounds;
  var old_scale : Vector3 = this.transform.localScale;
  
  Debug.Log("Old scale is");
  Debug.Log(old_scale);
  
//  var old_box : Bounds = this.transform.localScale;
  var www_stl : WWW = new WWW (filepath);
  
  Debug.Log("Loading STL form this location : ");
  Debug.Log(filepath);
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
  
  var all_triangles = new int[num_triangles*3];
  
  var offset : int = 168;
  var count : int = 96;
  
  for (i = 0;i<num_triangles;i++){
  	
    //Debug.Log("Getting Triangle # : " + i.ToString());
    var triangle = grab_triangle(file_content,offset,count);
    for (j=0;j<3;j++){
      all_triangles[k] = k ;
      // Update the average position (used for moving the object later
      average_position.x += triangle[j].x/(num_triangles * 3);
      average_position.y += triangle[j].y/( num_triangles * 3);
      average_position.z += triangle[j].z/(num_triangles * 3);
       
      k+= 1;
      shape.push(triangle[j]);
	}
    offset += (count +4);
  }  
  
  // Update the mesh
  mesh.Clear();
  
  mesh.vertices = shape;
  mesh.triangles = all_triangles;
  
  mesh.RecalculateNormals();
  mesh.RecalculateBounds();
  mesh.Optimize();
  
  
  var new_bound_max :float = get_maximum(mesh.bounds.extents);
  var scale_factor : float = old_bounds.extents[0]/new_bound_max;
  

  // Update the scale to be the size of the parent box
  this.renderer.transform.localScale.x = this.renderer.transform.localScale.x*scale_factor;
  this.renderer.transform.localScale.y = this.renderer.transform.localScale.y*scale_factor;
  this.renderer.transform.localScale.z = this.renderer.transform.localScale.z*scale_factor;

  // Move the mesh until its position is the same of its parent box
  // Current position - average* scale * box size - box position
  this.renderer.transform.position.x = this.renderer.transform.position.x - average_position.x*scale_factor*100 ;
  this.renderer.transform.position.y = this.renderer.transform.position.y - average_position.y*scale_factor*100 ;
  this.renderer.transform.position.z = this.renderer.transform.position.z - average_position.z*scale_factor*100 ;
  
  // Get the colider and resize it to match that of the new object
//  var box : BoxCollider = this.GetComponent(BoxCollider);
//  box.center = renderer.bounds.center;
  var new_size = this.renderer.transform.localScale.x;
  
//  box.size = this.renderer.transform.localScale; 
  
  // Updating Pivot for better rotation:
  var p : Vector3 = Vector3(0,0,0);
  
  var b : Bounds = mesh.bounds;
  var offset2 : Vector3 = -1 * b.center;
  
  // Get the current pivot position/ rotation point of the object
  var last_p : Vector3= new Vector3(offset2.x / b.extents.x, offset2.y / b.extents.y, offset2.z / b.extents.z);
  
  // Find the difference between this point and the center of the box
  var diff : Vector3 = Vector3.Scale(mesh.bounds.extents, last_p - p);
  
  // Move the object to be centered at the new pivot point
  this.transform.position -= Vector3.Scale(diff, this.transform.localScale); 
  
  // Update the vertices of the object to match new scale
  var verts = mesh.vertices; 
  for( i=0; i< verts.Length; i++) {
		verts[i] += diff;
  }
  
  // Update the bounds of the object
  mesh.vertices = verts;
  mesh.RecalculateBounds();
  
//  box.center += diff;
  selectable = true;
  
  // Attatch a mesh collider around the object
  this.gameObject.AddComponent(MeshCollider);
  
  // Set Defaults
  default_scale = this.transform.localScale.x;
  ReceivedMessage('1,1');
  

  
}

public function grab_triangle(data : String, offset : int , count : int) {
	var triangle : Vector3[] = new Vector3[3];
	// Split String to grab all data related to the triangle 
	// and the first vectors
	var s_triangle : String = data.Substring(offset, count);
	var count_pnt : int = count/4;
	var s_pnt : String = s_triangle.Substring(0, count_pnt);
	
	// Iterate through the facet normal, and three triangles
	for ( var i=0;i<4;i++) {
		
		if (i!= 0)
		  triangle[i-1] = grab_vector(s_pnt,0,count_pnt);
		
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

function get_maximum(array : Vector3) : float {
  var max : float = array[0];
  for (var i = 1; i < 3; i++) {
   if (array[i] > max) {
       max = array[i];
   }
  }
  return max;
}

function Update () {

}