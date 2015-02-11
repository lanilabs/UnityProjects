#pragma strict

public var bytefcns : ByteFunctions;
public var selTexture : Texture[];

@HideInInspector
var www_stl : WWW;
var file_started : boolean = false;

public var default_scale : float;

private var triangle = Vector3(0,0,0);
private var number_of_triangles : int;
private var selectable : boolean;

private var material_string : String = "2";
private var  quality_string : String = "50";
private var 	size_string : String = "50";
private var stl_location : String
  = "http://www.lanilabs.com/system/user_models/stlfiles/000/000/445/original/Skinny_Jimmy3b516932a11720d49a160763e7e7b3ff-skinnyjimmy_fixed.stl";

private var initial_object : GameObject;

private var average_position = Vector3(0f,0f,0f);

function Start () {
	//loadMesh(stl_location);
}


function SetByteFunctions(bytefunctions : ByteFunctions) {
	bytefcns = bytefunctions;
}
function ChangeColor(msg : String) {
	var meshes =  GameObject.FindGameObjectsWithTag ("model_part");
	for (var mesh_object:GameObject in meshes)
		mesh_object.renderer.material.mainTexture = selTexture[int.Parse(msg)];
}

function ChangeSize(msg : String) {
		
	var msg_prt = msg.Split(","[0]);
	var siz = float.Parse(msg_prt[0]);
	var dim = int.Parse(msg_prt[1]);
	this.transform.localScale.x = siz*default_scale;
	this.transform.localScale.y = siz*default_scale;
	this.transform.localScale.z = siz*default_scale;

}

function SetScale(scale : float) {
	this.transform.localScale = Vector3(scale,scale,scale);
	this.default_scale = this.transform.localScale.x;
}

function SendAMessage(msg : String) {
	
	// Functions sends data back to a javascript function in the html page
	Application.ExternalCall( "ReceivedFromUnity", msg );
}

public function loadMesh(filepath : String){
	file_started = true;
	www_stl = new WWW (filepath);
}

function Update() {
	if (file_started && www_stl.isDone == false){
		Debug.Log(www_stl.progress);
	}else if (www_stl.isDone && file_started) {
		renderMesh();
		file_started = false;
	}
}

function renderMesh() {
  
  // Read a stl file :
  // Grab the file via a WWW request

  var old_scale : Vector3 = this.transform.localScale;
  
  Debug.Log("Old scale is");
  Debug.Log(old_scale);
  
  Debug.Log("Loaded STL from this location : ");
  Debug.Log(www_stl.url);  
  
  // Grab the bytes of the file, and then convert it to a String
  var file_content : String = System.BitConverter.ToString(www_stl.bytes).Replace("-","");
  
  // Declare all iteration variables (cannot use vals more then one otherwise)
  var i : int = 0;var j : int = 0; var k : int = 0; var m : int = 0;
  
  // Get the file header :
  var header : String = bytefcns.hex_uint8_to_ascii(file_content, 0, 160);
  Debug.Log("Header : ");
  Debug.Log(header);
  
  // Get the number of triangles in the file
  var num_triangles : uint = bytefcns.hexstr_to_uint32(file_content, 160, 8);
  var tri_per_mesh = 21666f;
  
  var num_meshes = Mathf.CeilToInt(num_triangles/tri_per_mesh);
  var old_bounds : Bounds = this.renderer.bounds;
  
  Debug.Log("Number of Meshes:");
  Debug.Log(num_meshes);
  
  var offset : int = 168;
  var count : int = 96;
  
  var meshes : Mesh[] = new Mesh[num_meshes];
  

  // Intstantiate Gameobjects to hold each mesh:
  var mesh_objects : GameObject[];
  mesh_objects = new GameObject[num_meshes];
  for (i = 0;i<num_meshes;i++)
  	mesh_objects[i] = new GameObject();
  
  for (m = 0; m< num_meshes; m ++){
  	  k = 0;
  	  var shape = new Array ();
  	  meshes[m] = mesh_objects[m].AddComponent(MeshFilter).mesh;
  	  var n_triangles = tri_per_mesh;
	  
	  if (m == num_meshes-1)
	  	n_triangles = num_triangles - tri_per_mesh*(num_meshes-1);
	  
	  var all_triangles : int[] = new int[n_triangles*3];
	  
	  for (i = 0;i<n_triangles;i++){
	  	
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
	  meshes[m].Clear();

	  meshes[m].vertices = shape;
	  meshes[m].triangles = all_triangles;
	  
	  meshes[m].RecalculateNormals();
	  meshes[m].RecalculateBounds();
	  meshes[m].Optimize();
  }
    
  var lower_bounds : Vector3 = Vector3(100000,100000,100000);
  var higher_bounds : Vector3 = Vector3(-100000,-10000,-10000);
  var lower_center : Vector3 = Vector3(0,0,0);
  //mesh_objects[0].collider.transform.position;
  
  
  
  //mesh_objects[0].collider.transform.position + mesh_objects[0].collider.bounds.size;
	  	
  for (var mesh_object:GameObject in mesh_objects) {
  	mesh_object.name = "model_part";
  	mesh_object.tag = "model_part";
  	mesh_object.AddComponent(MeshRenderer);
  	mesh_object.AddComponent(MeshCollider);
  	mesh_object.renderer.material = this.renderer.material;
  	mesh_object.transform.parent = this.transform;
  	var siz : Vector3 = mesh_object.collider.bounds.size;
  	var pos : Vector3 = mesh_object.collider.bounds.center - siz/2;
  	
	for (i = 0; i< 3; i++){
 		if (pos[i] < lower_bounds[i]){
 			lower_bounds[i] = pos[i];
 			lower_center[i]= pos[i] + siz[i]/2;
 		}
 		if (pos[i]+siz[i] > higher_bounds[i])
 			higher_bounds[i] = pos[i] + siz[i];
  	}	
  }
	var new_size  = higher_bounds - lower_bounds;
	var new_position = lower_center;

  
//  var new_bound_max :float = get_maximum(meshes[0].bounds.extents);
	var new_bound_max : float = get_maximum(new_size);
	
  	var scale_factor : float = new_bound_max/old_bounds.extents[0];
  	
	// Update the scale to be the size of the parent box
    for (var mesh_object:GameObject in mesh_objects) {
    	var mesh_filter  = mesh_object.GetComponent(MeshFilter);
	  	  
		mesh_object.renderer.transform.localScale *= 2/scale_factor;
		mesh_object.renderer.transform.position -= 
		  	(average_position-Vector3(new_bound_max,new_bound_max,new_bound_max)/2)*2/scale_factor;
	}

//  // Once the stl file is finished loading, fill it with comments
  this.GetComponent(MeshFilter).mesh.Clear();
//  GameObject.Find("Camera").GetComponent(CommentHandler).FillWithComments(header);
  //GameObject.Find("Camera").GetComponent(SendRay).ScanCameraView(0.3);
//  ChangeSize("1,1");
//  ReceivedMessage('2,1');

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