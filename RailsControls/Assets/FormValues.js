#pragma strict

private var material_string : String = "Red PLA";
private var  quality_string : String = "50";
private var 	size_string : String = "50";
private var 	 stl_string : String = "None";
function OnGUI() {
	
	// Styling for labels
	var style : GUIStyle = new GUIStyle();
	style.normal.textColor = Color.black;

	// Row 0 : STL URL
	GUI.Label (Rect (10, 10, 100, 20), "STL Location : ",style);
	GUI.Label (Rect (100, 10, 100, 20), stl_string, style);
			
	// Row 1 : Material
	GUI.Label (Rect (10, 40, 100, 20), "Material : ",style);
	GUI.Label (Rect (100, 40, 100, 20), material_string,style);
	
	// Row 2 : Quality
	GUI.Label (Rect (10, 80, 100, 20), "Quality: ",style);
	GUI.Label (Rect (100, 80, 100, 20), quality_string,style);

	// Row 3 : Size
	GUI.Label (Rect (10, 120, 100, 20), "Size: ",style);
	GUI.Label (Rect (100, 120, 100, 20), size_string,style);
	
}
function ReceivedMessage(msg : String) {
	var msg_data = msg.Split(","[0]);
	// Function is called when a message is received from javascript
	material_string =  msg_data[0];
	quality_string = msg_data[1];
	size_string = msg_data[2];
	//stl_string = msg;
	
	SendAMessage(msg);
}

function SendAMessage(msg : String) {
	
	// Functions sends data back to a javascript function in the html page
	Application.ExternalCall( "ReceivedFromUnity", msg );
}


function Start () {

	
}

function Update () {

}