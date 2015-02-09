#pragma strict
public var stl_mesh : GameObject; 
public var my_bytes : ByteFunctions;

private var numberOfInstances : int = 0;
private var i : int; private var j :int;
private var clone : GameObject;

// Controller for the Unity Webplayer

function Start () {
	//loadFile("http://www.lanilabs.com/system/user_models/stlfiles/000/000/453/original/farm_fixed.stl");
	//updateAppearance("1,1.1");
}

function loadFile(stl : String) : boolean {
	// Check if there are any instances already and remove them
	if (numberOfInstances >= 1){
		Destroy (clone);
	}
	
	// Create a new instance
	clone = GameObject.Instantiate(stl_mesh);
	
	clone.SendMessage("SetByteFunctions",my_bytes);
	clone.SendMessage("SetScale",100);
	clone.SendMessage("loadMesh",stl);
	
	// Add one to the number of inititated instances
	// right now we only ever have one, but later we may want more
	numberOfInstances += 1;
	
	
}

function updateAppearance(msg : String) {
	// Send a message to the gameobject to change its texture , and size
	clone.SendMessage("ReceivedMessage",msg);
	
	// Check to see if there is a third and fourth entry as inputs:
	var msg_data = msg.Split(","[0]);
	if ( msg_data.Length > 2 ){
		// Then we assume they want to see quality as well..
		// Get data from the ray casting component of the camera
		var ray_caster = this.GetComponent(SendRay);
		// Draw layers around the object
		ray_caster.GenerateBoundingCylinder(double.Parse(msg_data[2])/10);
	}
}

function OnGUI () {

}
	
function Update () {

}