#pragma strict
var ray_point : GameObject;
var radial_capture : GameObject;
var layer_height_str : String;
var lineMaterial : Material;
var lineTextures : Texture[];

private var stl_object : GameObject;
private var radial_pos : Vector3;
private var i : int = 0 ; private var j : int = 0;private var k : int = 0;

function OnGUI() {
//	layer_height_str = GUI.TextArea (Rect (10, 10, 200, 30), layer_height_str, 200);
//	
//	if (GUI.Button(Rect(10,50,100,30),"Update Quality")){
//		//ScanCameraView(layer_height);
//		GenerateBoundingCylinder(double.Parse(layer_height_str)/10);
//	}
}

function Start () {	
}

function Update () {

}

function GenerateBoundingCylinder(layer_height : double) {
	var cylinder : GameObject = radial_capture;
	stl_object = GameObject.Find("Cube(Clone)");

	cylinder.transform.position = stl_object.transform.position;
	var scale : Vector3 = stl_object.renderer.bounds.size;
	cylinder.transform.localScale = Vector3(scale.x*4,scale.y*2,scale.z*4);
	destroyAllChildren();
	ScanCameraView(layer_height);
}

function ScanCameraView(height : double) {
	
	// Get the global coordinates of the local 0,0,0 point for the sphere
	radial_pos.x = radial_capture.transform.position.x;
	radial_pos.y = radial_capture.transform.position.y;
	radial_pos.z = radial_capture.transform.position.z;
	
	stl_object = GameObject.Find("Cube(Clone)");
	
	var previous_point = new Vector3();
	var R = radial_capture.renderer.bounds.size.z / 2;
	
	// Get the layer height specified by the user :
	
	var H = radial_capture.renderer.bounds.size.y;
	var object_height : double = stl_object.renderer.bounds.size.y;
	
	// Get how many layers will have to be placed on the object
	var num_of_layers = object_height/height;
	Debug.Log("Number of Layers");
	Debug.Log(num_of_layers);
	Debug.Log("Height");
	Debug.Log(height);
	var N_h : float = num_of_layers*2;
	var N_theta : float = 360;
	
	var step_size_h : float = H/N_h;
	var step_size_theta : float = 360/N_theta;
		
	for ( j = 0 ; j < N_h ; j ++ ) {
	
		var line_points = new Array();
		
		// Get the distance from the top of the cylidner
		var y = radial_pos.y - H/2 + j*step_size_h;
		
			for ( i = 0; i < N_theta; i++) {
				// Get x and y cordinates from the origin
				
				var x = R*Mathf.Cos(i*step_size_theta*Mathf.PI/180);
				var z = R*Mathf.Sin(i*step_size_theta*Mathf.PI/180);
				
				x += radial_pos.x;
				z += radial_pos.z;
								
				var direction = (Vector3(radial_pos.x,y,radial_pos.z)- Vector3(x,y,z)).normalized;
							
				var hit: RaycastHit;
				var ray: Ray = new Ray(Vector3(x,y,z),direction);

				if (Physics.Raycast(ray, hit) && hit.transform.gameObject.name == stl_object.name){
					line_points.Add (hit.point);
					
	
					if ((hit.point - previous_point).magnitude > 10) {
						var last_point = line_points[line_points.length-1];
						generateLine(line_points, line_points.length-1,step_size_h*2);
						line_points.Clear();
						line_points.Add(last_point);
					}
					previous_point = hit.point;		
				} 
			}
			generateLine(line_points, line_points.length,step_size_h*2);
			line_points.Clear();
	}
	
//	stl_object.renderer.material.shader =  Shader.Find("Unlit/Texture");
	
//	GameObject.Find("Cube(Clone)").GetComponent(MeshFilter).mesh.Clear();		
}

function generateLine(line_points : Array, length : int, thickness : float) {
	var lineRenderer : LineRenderer =  new GameObject().AddComponent(LineRenderer);
	lineRenderer.useWorldSpace = false;
	lineRenderer.transform.parent = stl_object.transform;
//	lineRenderer.gameObject.renderer.material.mainTexture = lineTextures[0];
	lineRenderer.material = lineMaterial;//GameObject.Find("Cube(Clone)").renderer.material;
	lineRenderer.SetWidth(thickness,thickness);
	lineRenderer.SetVertexCount(length);
	for(k=0;k<length;k++){
		lineRenderer.SetPosition(k, line_points[k]);
	}
}


function destroyAllChildren() {
	for (var child:Transform in stl_object.transform) {
		GameObject.Destroy(child.gameObject);
	}
}

 