#pragma strict
var ray_point : GameObject;
private var i : int = 0 ; private var j : int = 0;

function OnGUI() {
	if (GUI.Button(Rect(10,70,50,30),"Update Quality"))
		ScanCameraView();
}

function Start () {
	
}

function Update () {
//	var hit: RaycastHit;
//	var ray: Ray = camera.ScreenPointToRay(Input.mousePosition);
//	
//	
//	if (Physics.Raycast(ray, hit)) {
//		
//		if (hit.transform.gameObject.name == "Cube(Clone)"){
//			Debug.Log(hit.point);
//			
//		 	Debug.DrawLine (ray.origin, hit.point);
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
	var N_x : int = 500;
	var N_y : int = 50;
	var step_size_x : double = Screen.width/N_x ;
	var step_size_y : double = Screen.height/N_y ;
	
	for ( j = 0; j < N_y;j++){
		
//		// var extrusion_line = new Array();
//		// var line_points = new Vector3[N_x];
		var go = new GameObject();
//		// GameObject.Instantiate(go);
		var lineRenderer : LineRenderer = go.AddComponent(LineRenderer);
//		//var lineRenderer : LineRenderer = GameObject.Instantiate(LineRenderer);
//		
		lineRenderer.material = new Material (Shader.Find("Particles/Additive"));
		lineRenderer.SetColors(Color.yellow, Color.red);
		lineRenderer.SetWidth(5,5);
		lineRenderer.SetVertexCount(N_x);
		
		for (i = 0;i < N_x ;i++) {
			
			var hit: RaycastHit;
			var ray: Ray = camera.ScreenPointToRay(Vector3(i*step_size_x,j*step_size_y,0));
			if (Physics.Raycast(ray, hit)) {
			
				if (hit.transform.gameObject.name == "Cube(Clone)"){
					Debug.Log(hit.point);
					lineRenderer.SetPosition(i, hit.point);
					
					//line_points[i] = hit.point;
					
//				 	Debug.DrawLine (ray.origin, hit.point);
				 	//GameObject.Instantiate(ray_point,hit.point, Quaternion.identity);
				 }
				  
//			    var objectHit: Transform = hit.transform;
		    
			}	
		}
				 
		
	}
		
			
}