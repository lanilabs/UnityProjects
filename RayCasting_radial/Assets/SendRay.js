#pragma strict
public var normailzed_direction : Vector3;
var ray_point : GameObject;
var view_right : GameObject;
var radial_capture : GameObject;

var pos : Vector3;
var radial_pos : Vector3;

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
	
	
	//Radial Stuff
	
	// Get the global coordinates of the local 0,0,0 point for the sphere
	radial_pos.x = radial_capture.transform.position.x;
	radial_pos.y = radial_capture.transform.position.y;
	radial_pos.z = radial_capture.transform.position.z;
	
	
	var R = radial_capture.renderer.bounds.size.x / 2;
	var h = R / 2 ;
	var a = Mathf.Sqrt(h*(2*R - h));
	
	// Object Drawn from center
	GameObject.Instantiate(ray_point,radial_pos, Quaternion.identity);
	Debug.DrawLine (radial_pos, Vector3(radial_pos.x- R,radial_pos.y,radial_pos.z),Color.green, 100, false);
	
	// Object Drawn between center and edge
	GameObject.Instantiate(ray_point,Vector3(radial_pos.x,radial_pos.y+ h,radial_pos.z), Quaternion.identity);
	Debug.DrawLine (Vector3(radial_pos.x,radial_pos.y+ h,radial_pos.z), 
		Vector3(radial_pos.x- a,radial_pos.y+ h,radial_pos.z),Color.green, 100, false);
	
	
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
//		var line_points = new Array();
		
//		// GameObject.Instantiate(go);
		
		
//		//var lineRenderer : LineRenderer = GameObject.Instantiate(LineRenderer);

		
		
//		lineRenderer.SetVertexCount(N_x-27);
		
		for (i = 0; i < N_x ;i++) {
			
//			var hit: RaycastHit;
//			var ray: Ray = new Ray(Vector3(pos.x,pos.y + j*step_size_y,
//									pos.z + i*step_size_x),normailzed_direction);
//			//camera.ScreenPointToRay(Vector3(i*step_size_x,j*step_size_y,0));
//			if (Physics.Raycast(ray, hit)) {
//			
//				if (hit.transform.gameObject.name == "Cube(Clone)"){
//					//Debug.Log(hit.point);
////					lineRenderer.SetPosition(i, hit.point);
////					line_points.Add (hit.point);
//					
//				 	Debug.DrawLine (ray.origin, hit.point);
//				 	//GameObject.Instantiate(ray_point,hit.point, Quaternion.identity);
//				 }
//				  
////			    var objectHit: Transform = hit.transform;
//		    
//			}	
		}
		
//		var go = new GameObject();
//		go.transform.parent =  GameObject.Find("Cube(Clone)").transform ;
//		var lineRenderer : LineRenderer = go.AddComponent(LineRenderer);
//		lineRenderer.material = lineMaterial;
//		lineRenderer.SetWidth(4.05,4.05);
//		lineRenderer.SetVertexCount(line_points.length);
//		Debug.Log("Number of Points");
//		Debug.Log(line_points.length);
//		for(i=0;i<line_points.length;i++){
//			//lineRenderer.SetPosition(i, line_points[i]);
//		}
					 
	}
	
	//Radial Stuff
	
	// Get the global coordinates of the local 0,0,0 point for the sphere
	radial_pos.x = radial_capture.transform.position.x;
	radial_pos.y = radial_capture.transform.position.y;
	radial_pos.z = radial_capture.transform.position.z;
	
	
	var R = radial_capture.renderer.bounds.size.x / 2;

	var N_h : int = 100;
	var N_theta : int = 80;
	
	var step_size_h : double = R/N_h;
	var step_size_theta : double = 360/N_theta;
		
	for ( j = 0 ; j < N_h ; j ++ ) {
	
		var line_points = new Array();
		
		// Get the distance from the top of the sphere
		var h = j*step_size_h;
		
		// Get the radius of the circle at the given height
		var a = Mathf.Sqrt(h*(2*R - h));
		var z = radial_pos.z + R - a;
		for ( k = 0 ; k < 2; k++ ) {
			for ( i = 0; i < N_theta; i++) {
				// Get x and y cordinates from the origin
				var x = a*Mathf.Cos(i*step_size_theta*Mathf.PI/180);
				var y = a*Mathf.Sin(i*step_size_theta*Mathf.PI/180);
				var norm_pos = Vector3(x/a,y/a,0);
				Debug.Log("Normal Direction");
				Debug.Log(norm_pos);
				var hit: RaycastHit;
				var ray: Ray = new Ray(Vector3(x,y,z),norm_pos);
				
				// translate x and y to global positions
				x += radial_pos.x;
				y += radial_pos.y;
				
				if (Physics.Raycast(ray, hit)) {
			
					if (hit.transform.gameObject.name == "Cube(Clone)"){
						//Debug.Log(hit.point);
	//					lineRenderer.SetPosition(i, hit.point);
	//					line_points.Add (hit.point);
						
					 	//Debug.DrawLine (ray.origin, hit.point);
					 	Debug.DrawLine (ray.origin, hit.point,Color.green, 100, false);
					 	GameObject.Instantiate(ray_point,hit.point, Quaternion.identity);
					 }
					  
//			    var objectHit: Transform = hit.transform;
		    
				}	
			
				// Draw a dot at this position
				//line_points.Add (Vector3(x,y,z));
//				GameObject.Instantiate(ray_point,Vector3(x,y,z), Quaternion.identity);
//				Debug.DrawLine (Vector3(x,y,z), radial_pos,Color.green, 100, false);
//				Debug.DrawLine (Vector3(x,y,z), radial_pos);
			}
//			var go = new GameObject();
//			go.transform.parent =  GameObject.Find("Cube(Clone)").transform ;
//			var lineRenderer : LineRenderer = go.AddComponent(LineRenderer);
//			lineRenderer.material = lineMaterial;
//			lineRenderer.SetWidth(4.05,4.05);
//			lineRenderer.SetVertexCount(line_points.length);
//			Debug.Log("Number of Points");
//			Debug.Log(line_points.length);
//			for(i=0;i<line_points.length;i++){
//				lineRenderer.SetPosition(i, line_points[i]);
//			}
			z = radial_pos.z - R + a;
		}
		
		
		
	}	
	
	//GameObject.Find("Cube(Clone)").GetComponent(MeshFilter).mesh.Clear();		
}

function CartesianToPolar(point:Vector3):Vector2 {
	var polar:Vector2;

	//calc longitude
	polar.y = Mathf.Atan2(point.x,point.z);

	//this is easier to write and read than sqrt(pow(x,2), pow(y,2))!
	var xzLen = Vector2(point.x,point.z).magnitude; 
	//atan2 does the magic
	polar.x = Mathf.Atan2(-point.y,xzLen);

	//convert to deg
	polar *= Mathf.Rad2Deg;

	return polar;
}

function PolarToCartesian(polar:Vector2):Vector3 {

	//an origin vector, representing lat,lon of 0,0. 

	var origin=Vector3(0,0,1);
	//build a quaternion using euler angles for lat,lon
	var rotation = Quaternion.Euler(polar.x,polar.y,0);
	//transform our reference vector by the rotation. Easy-peasy!
	var point:Vector3=rotation*origin;

	return point;
}
 