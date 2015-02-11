#pragma strict
public var stl_mesh : GameObject; 
public var my_bytes : ByteFunctions;

private var numberOfInstances : int = 0;
private var i : int; private var j :int;
private var clone : GameObject;

// Controller for the Unity Webplayer

function Start () {
	loadFile("http://www.lanilabs.com/system/user_models/stlfiles/000/000/465/original/TROPHY_binary.stl");
//	loadFile("http://localhost:3000/comment_files/farm_comments.stl");
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
function updateColor(msg : String) {
	clone.SendMessage("ChangeColor",msg);
}
function updateScale(msg: String) {
	clone.SendMessage("ChangeSize",msg);
}
function updateQuality(msg: String){
	var ray_caster = this.GetComponent(SendRay);
	ray_caster.GenerateBoundingCylinder(double.Parse(msg)/10);
}

function updateAll(msg: String){
	var msg_prt = msg.Split(","[0]);
	updateColor(msg_prt[0]);
	updateQuality(msg_prt[1]);
	updateScale(msg_prt[2]+","+msg_prt[3]);

}

function OnGUI () {

}
	
function Update () {

}