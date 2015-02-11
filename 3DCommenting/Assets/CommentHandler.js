#pragma strict

var ray_point : GameObject;
var comment_obj : GameObject;

private var comment_positions : Array = new Array();
private var comment_messages : Array = new Array();

private var current_point : GameObject;		
private var ray_exists : boolean = false;
private var comment_enabled : boolean = false;
private var comment_message : String = "";

private var i : int; private var j : int; private var k :int;

function OnGUI () {
	
	comment_message = GUI.TextArea (Rect (10, 10, 200, 30), comment_message, 200);
	
	if (GUI.Button(Rect(240,10,100,30),"Add Comment")){
		comment_enabled = true;
		Debug.Log("You can now add a comment!");
	}

}

function Start () {	
}

function AddCommentPosition(msg : String){
	var msg_strarr = msg.Split(","[0]);
	comment_positions.Push(float.Parse(msg_strarr[0]),
		float.Parse(msg_strarr[1]),float.Parse(msg_strarr[2]));
}

function AddCommentMessage(msg : String){
	comment_messages.Push(msg);
}

function DrawComments() {
	// Gets the comments from properties of this handler
	for (i= 0 ; i < comment_messages.length; i++) {
		var go = GameObject.Instantiate(comment_obj);
		go.transform.parent = GameObject.Find("Cube(Clone)").transform;
		go.name = "comment";
		go.GetComponent(Message).comment = comment_messages[i];
		go.transform.localPosition = comment_positions[i];	
	}
}

function Update () {
	var hit: RaycastHit;
	var ray: Ray = camera.ScreenPointToRay(Input.mousePosition);
	
	if ( ray_exists ){
		Destroy (current_point);
		ray_exists = false;
	}
	
	if (Physics.Raycast(ray, hit) && 
		(hit.transform.gameObject.transform.name == "model_part" ||
		hit.transform.gameObject.transform.name == "fill_line")) {
		Debug.Log(hit.transform.name);
		current_point = GameObject.Instantiate(ray_point, hit.point, Quaternion.identity);
		ray_exists = true;
		
		if(Input.GetMouseButtonDown(0)){
			if (comment_enabled == true){
				var go = GameObject.Instantiate(comment_obj, hit.point, Quaternion.identity);
				go.transform.parent =  GameObject.Find("Cube(Clone)").transform;
				go.name = "comment";
				comment_enabled = false;
				go.GetComponent(Message).comment = comment_message;
				Debug.Log("Placed a comment at : ");
				Debug.Log(go.transform.localPosition);
			}
		}
	
	}
	
}
