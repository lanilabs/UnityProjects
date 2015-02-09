#pragma strict

var ray_point : GameObject;
var comment_obj : GameObject;

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

function FillWithComments(header : String) {
	
	var domain_info = header.Split("/"[0]);
 
  	if (domain_info[2] == "localhost:3000" || domain_info[2] == "lanilabs.com"){
		var www_header : WWW = new WWW (header);
	  
		
	  	// pause running until the file has been retrieved
	  	yield www_header;
	  	
	  	// Print the header data to the console
	  	var header_data = www_header.text.Split(","[0]);
	  	// Data goes as follows : x , y ,z ,comment
	  	var num_comments = header_data.Length/4;
	  	
		var comment_positions = new Vector3[num_comments];
		var comment_messages  = new String [num_comments];
		k = 0;
		
		for (i = 0;i<num_comments*4;i+=4) {
			comment_positions[k] = 
				Vector3(float.Parse(header_data[i]), float.Parse(header_data[i+1]),float.Parse(header_data[i+2]));
			comment_messages[k] = header_data[i+3];
			k += 1;
		}
			
		for (i = 0; i < comment_messages.length; i ++ ) {
	    	var go = GameObject.Instantiate(comment_obj);
	    	go.transform.parent = GameObject.Find("Cube(Clone)").transform;
	    	go.name = "comment";
	    	go.GetComponent(Message).comment = comment_messages[i];
	    	go.transform.localPosition = comment_positions[i];	
		}
	}else {
		Debug.Log("Stl File does not support comments");
	}
}

function ParseForComments(header : String) {

	var www_header : WWW = new WWW (header);
  
  	Debug.Log("Grabbing data from server. ");  	
  	// pause running until the file has been retrieved
  	yield www_header;
  	
  	// Print the header data to the console
  	var header_data = www_header.text.Split(","[0]);
  	// Data goes as follows : x , y ,z ,comment
  	var num_comments = header_data.Length/4;
  	
	var comment_positions = new Vector3[num_comments];
	var comment_messages  = new String[num_comments];
	k = 0;
	
	for (i = 0;i<num_comments;i+=4) {
		comment_positions[k] = 
			Vector3(float.Parse(header_data[i]), float.Parse(header_data[i+1]),float.Parse(header_data[i+2]));
		comment_messages[k] = header_data[i+3];
		k += 1;
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
				go.name = "comment";
				comment_enabled = false;
				go.GetComponent(Message).comment = comment_message;
				Debug.Log("Placed a comment at : ");
				Debug.Log(go.transform.localPosition);
			}
		}
	
	}
	
}
