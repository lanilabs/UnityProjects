#pragma strict
var ray_point : GameObject;
var radial_capture : GameObject;

var pos : Vector3;
var radial_pos : Vector3;

var lineMaterial : Material;
var lineMaterial2 : Material;

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
	
	var previous_point = new Vector3();
	var R = radial_capture.renderer.bounds.size.z / 2;
	
	var N_h : int = 200;
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
					
//					GameObject.Instantiate(ray_point,hit.point,Quaternion.identity);
//					Debug.Log("Magnitude");
//					Debug.Log((hit.point - previous_point).magnitude);
					if ((hit.point - previous_point).magnitude > 10) {
						
						var go = new GameObject();
						go.transform.parent =  GameObject.Find("Cube(Clone)").transform ;
						var lineRenderer : LineRenderer = go.AddComponent(LineRenderer);
						lineRenderer.material = lineMaterial;
						lineRenderer.SetWidth(5,5);
						var last_point = line_points[line_points.length -1];
						lineRenderer.SetVertexCount(line_points.length-1);
						for(k=0;k<line_points.length-1;k++){
							lineRenderer.SetPosition(k, line_points[k]);
						}
						line_points.Clear();
						line_points.Add(last_point);
					}
					previous_point = hit.point;
				} 
				if ( i == N_theta -1) {
					var go2 = new GameObject();
					go2.transform.parent =  GameObject.Find("Cube(Clone)").transform ;
					var lineRenderer2 : LineRenderer = go2.AddComponent(LineRenderer);
					lineRenderer2.material = lineMaterial;
					lineRenderer2.SetWidth(5,5);
					lineRenderer2.SetVertexCount(line_points.length);
					for(k=0;k<line_points.length;k++){
						lineRenderer2.SetPosition(k, line_points[k]);
					}
				}
			
			}
			

//			z = radial_pos.z - R + a;
//			dir = 1;
//		}
		
		
		
	}	
	
	GameObject.Find("Cube(Clone)").GetComponent(MeshFilter).mesh.Clear();		
}
 