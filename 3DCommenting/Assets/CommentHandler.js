#pragma strict

var ray_point : GameObject;
var comment_obj : GameObject;

private var current_point : GameObject;		
private var ray_exists : boolean = false;
private var comment_enabled : boolean = false;

function OnGUI () {
	if (GUI.Button(Rect(300,30,100,30),"Add Comment")){
		comment_enabled = true;
		Debug.Log("You can now add a comment!");
	}

}

function Update () {
	var hit: RaycastHit;
	var ray: Ray = camera.ScreenPointToRay(Input.mousePosition);
	
	if ( ray_exists ){
		Destroy (current_point);
		ray_exists = false;
	}
	
	if (Physics.Raycast(ray, hit) && hit.transform.gameObject.name == "Cube(Clone)") {
		current_point = GameObject.Instantiate(ray_point, hit.point, Quaternion.identity);
		ray_exists = true;
		
		if(Input.GetMouseButtonDown(0)){
			if (comment_enabled == true){
				var go = GameObject.Instantiate(comment_obj, hit.point, Quaternion.identity);
				go.transform.parent =  GameObject.Find("Cube(Clone)").transform;
				comment_enabled = false;
			}
		}
	
	}

	
}
