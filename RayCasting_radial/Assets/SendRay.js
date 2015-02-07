#pragma strict
var ray_point : GameObject;
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
}

function Update () {

}

function ScanCameraView() {
	
	// Get the global coordinates of the local 0,0,0 point for the sphere
	radial_pos.x = radial_capture.transform.position.x;
	radial_pos.y = radial_capture.transform.position.y;
	radial_pos.z = radial_capture.transform.position.z;
	
	
	var R = radial_capture.renderer.bounds.size.z / 2;
	
	var N_h : int = 300;
	var N_theta : int = 360;
	
	var H = radial_capture.renderer.bounds.size.y;
	
	var step_size_h : double = H/N_h;
	var step_size_theta : double = 360/N_theta;
		
	for ( j = 0 ; j < N_h ; j ++ ) {
	
		var line_points = new Array();
		
		// Get the distance from the top of the sphere
		var y = radial_pos.y - H/2 + j*step_size_h;
		
		// Get the radius of the circle at the given height
		//var a = Mathf.Sqrt(h*(2*R - h));
		
//		var z = radial_pos.z - radial_capture.renderer.bounds.size.z/2;
//		for ( k = 0 ; k < 2; k++ ) {
			for ( i = 0; i < N_theta; i++) {
				// Get x and y cordinates from the origin
				
				var x = R*Mathf.Cos(i*step_size_theta*Mathf.PI/180);
				var z = R*Mathf.Sin(i*step_size_theta*Mathf.PI/180);
				
				x += radial_pos.x;
				z += radial_pos.z;
								
				var direction = (Vector3(radial_pos.x,y,radial_pos.z)- Vector3(x,y,z)).normalized;
			
				
				//var norm_pos = Vector3(dir*y/R,0,dir*x/R);
				
				var hit: RaycastHit;
				var ray: Ray = new Ray(Vector3(x,y,z),direction);
//				Debug.DrawLine(Vector3(x,y,z),Vector3(radial_pos.x,y,radial_pos.z),Color.red,100);
//				Debug.DrawRay(Vector3(x,y,z),direction,Color.red,100,true);
				// translate x and y to global positions

//				line_points.Add (Vector3(y,z,x));
//				GameObject.Instantiate(ray_point, Vector3(x,y,z),Quaternion.identity);
				if (Physics.Raycast(ray, hit) && hit.transform.gameObject.name == "Cube(Clone)"){
					line_points.Add (hit.point);
					
//					GameObject.Instantiate(ray_point,Vector3(x,y,z),Quaternion.identity);
				}
			
			}
			
			var go = new GameObject();
			go.transform.parent =  GameObject.Find("Cube(Clone)").transform ;
			var lineRenderer : LineRenderer = go.AddComponent(LineRenderer);
			lineRenderer.material = lineMaterial;
			lineRenderer.SetWidth(5,5);
			lineRenderer.SetVertexCount(line_points.length);
			Debug.Log("Number of Points");
			Debug.Log(line_points.length);
			for(i=0;i<line_points.length;i++){
				lineRenderer.SetPosition(i, line_points[i]);
			}
//			z = radial_pos.z - R + a;
//			dir = 1;
//		}
		
		
		
	}	
	
	GameObject.Find("Cube(Clone)").GetComponent(MeshFilter).mesh.Clear();		
}
 