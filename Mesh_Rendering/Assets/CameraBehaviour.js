#pragma strict

public var min_fov_limit = 30 ;
public var max_fov_limit = 90;
public var drag_sensitivity = 1.5;
public var pan_sensitivity = 2;
private var screenCenter = Vector2(0,0);
function Start () {
  screenCenter = Vector2(Screen.width/2, Screen.height/2);
}


function Update () {
	 // Change the field of view based on the scroll wheel (ie Zoom)
	 if (Input.GetAxis("Mouse ScrollWheel")) {
	    // Ensure that changing the field of view wont go beyond the specified limits
	    var newFieldOfView = this.camera.fieldOfView + 10* Input.GetAxis("Mouse ScrollWheel");
	    // If not, then adjust the field of view accordingly
	    if (newFieldOfView <= max_fov_limit && newFieldOfView >= min_fov_limit)
	 	  this.camera.fieldOfView = newFieldOfView;
	 	Debug.Log(Input.GetAxis("Mouse ScrollWheel"));
	 }
	 
	 // Base the drag sensitivity around distance from center
	 var normalized_sensitivity = Vector2(Mathf.Abs(Input.mousePosition.x - screenCenter.x)/(Screen.width/2),
	 								Mathf.Abs(Input.mousePosition.y - screenCenter.y)/(Screen.height/2));
	 
	 // If left click change viewing angle , and change it at a rate specified in the drag 
	 // sensitivity. The same applies for pan but instead change actual camera position
	 
	   if (Input.mousePosition.x > screenCenter.x){
	   	 if(Input.GetMouseButton(0)){
	       this.camera.transform.rotation.eulerAngles.y += drag_sensitivity*normalized_sensitivity.x;
	     } else if (Input.GetMouseButton(1)){
	       this.camera.transform.position.z -= pan_sensitivity*normalized_sensitivity.x;
	     }
	   }else if (Input.mousePosition.x < screenCenter.x){
	     if(Input.GetMouseButton(0)){
	       this.camera.transform.rotation.eulerAngles.y -= drag_sensitivity*normalized_sensitivity.x;
	     }else if (Input.GetMouseButton(1)){
	       this.camera.transform.position.z += pan_sensitivity*normalized_sensitivity.x;
	     }
	   }
	   if (Input.mousePosition.y > screenCenter.y){
	     if(Input.GetMouseButton(0)){
	       this.camera.transform.rotation.eulerAngles.x -= drag_sensitivity*normalized_sensitivity.y;
	     } else if (Input.GetMouseButton(1)){
	       this.camera.transform.position.y += pan_sensitivity*normalized_sensitivity.y;
	     }
	   }else if (Input.mousePosition.y < screenCenter.y){
	     if(Input.GetMouseButton(0)){
	       this.camera.transform.rotation.eulerAngles.x += drag_sensitivity*normalized_sensitivity.y;
	     }else if (Input.GetMouseButton(1)){
	       this.camera.transform.position.y -= pan_sensitivity*normalized_sensitivity.y;
	     }
	   }   

}