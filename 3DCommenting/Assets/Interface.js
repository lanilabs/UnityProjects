#pragma strict
public var stl_mesh : GameObject; 
public var my_bytes : ByteFunctions;

private var numberOfInstances : int = 0;
private var i : int; private var j :int;
private var clone : GameObject;

// Controller for the Unity Webplayer

function Start () {
	loadFile("http://www.lanilabs.com/system/user_models/stlfiles/000/000/446/original/Skinny_Jimmy3b516932a11720d49a160763e7e7b3ff-skinnyjimmy_fixed.stl");
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
}

function OnGUI () {

}
	
function Update () {

}