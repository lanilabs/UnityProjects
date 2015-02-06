#pragma strict
public var normailzed_direction : Vector3;
var ray_point : GameObject;
var view_right : GameObject;

var pos : Vector3;
var lineMaterial : Material;

private var i : int = 0 ; private var j : int = 0;private var k : int = 0;

function OnGUI() {
	if (GUI.Button(Rect(10,70,50,30),"Update Quality"))
		ScanCameraView();
}

function Start () {
	normailzed_direction = Vector3(-1,0,0);
	pos.x = view_right.transform.position.x ;//+ view_right.renderer.bounds.size.x/2 ;
	pos.y = view_right.transform.position.y-view_right.renderer.bounds.size.y/2 ;//+ view_right.renderer.bounds.size.y/2 ;
	pos.z = view_right.transform.position.z-view_right.renderer.bounds.size.z/2;//+ view_right.renderer.bounds.size.z/2 ;
	GameObject.Instantiate(ray_point,pos, Quaternion.identity);
	Debug.DrawLine (pos, Vector3(pos.x- 100,pos.y,pos.z),Color.green, 100, false);
}

function Update () {
//	var hit: RaycastHit;
//	var ray: Ray = new Ray(Vector3(pos.x,pos.y,pos.z),Vector3(-1,0,0));
//	
//	
//	if (Physics.Raycast(ray, hit)) {
////		Debug.DrawLine (ray.origin, hit.point);
//		if (hit.transform.gameObject.name == "Cube(Clone)"){
//			Debug.Log(hit.point);
//			
////		 	Debug.DrawLine (ray.origin, hit.point);
//		 	GameObject.Instantiate(ray_point,hit.point, Quaternion.identity);
//		 }
//		  
//	    var objectHit: Transform = hit.transform;
//	    
//	}

}

function ScanCameraView() {
	// Initiate Raycast variables
	//var hit: RaycastHit;
	//var ray: Ray;
	// = camera.ScreenPointToRay(Input.mousePosition);
	
	// Get the number of steps
	var N_x : int = 250;
	var N_y : int = 80;
	
	var plane_width = view_right.renderer.bounds.size.z;
	var plane_height = view_right.renderer.bounds.size.y;

	var step_size_x : double = plane_width/N_x;
	var step_size_y : double = plane_height/N_y;
	
	for ( j = 0; j < N_y;j++){
		
//		// var extrusion_line = new Array();
		var line_points = new Array();
		
//		// GameObject.Instantiate(go);
		
		
//		//var lineRenderer : LineRenderer = GameObject.Instantiate(LineRenderer);

		
		
//		lineRenderer.SetVertexCount(N_x-27);
		
		for (i = 0; i < N_x ;i++) {
			
			var hit: RaycastHit;
			var ray: Ray = new Ray(Vector3(pos.x,pos.y + j*step_size_y,
									pos.z + i*step_size_x),normailzed_direction);
			//camera.ScreenPointToRay(Vector3(i*step_size_x,j*step_size_y,0));
			if (Physics.Raycast(ray, hit)) {
			
				if (hit.transform.gameObject.name == "Cube(Clone)"){
					//Debug.Log(hit.point);
//					lineRenderer.SetPosition(i, hit.point);
					line_points.Add (hit.point);
					
				 	Debug.DrawLine (ray.origin, hit.point);
				 	GameObject.Instantiate(ray_point,hit.point, Quaternion.identity);
				 }
				  
//			    var objectHit: Transform = hit.transform;
		    
			}	
		}
		
		var go = new GameObject();
		go.transform.parent =  GameObject.Find("Cube(Clone)").transform ;
		var lineRenderer : LineRenderer = go.AddComponent(LineRenderer);
		lineRenderer.material = lineMaterial;
		lineRenderer.SetWidth(4.05,4.05);
		lineRenderer.SetVertexCount(line_points.length);
		Debug.Log("Number of Points");
		Debug.Log(line_points.length);
		for(i=0;i<line_points.length;i++){
			lineRenderer.SetPosition(i, line_points[i]);
		}
		
				 
	}
	GameObject.Find("Cube(Clone)").GetComponent(MeshFilter).mesh.Clear();
		
			
}