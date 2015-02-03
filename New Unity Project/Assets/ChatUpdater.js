#pragma strict

private var message : String = "Hello there javascript im Unityscript. How are you?";
private var received_message : String = "";

	
function OnGUI() {
	var style : GUIStyle = new GUIStyle();
	style.normal.textColor = Color.black;
	
	GUI.Label (Rect (10, 10, 100, 20), "Sent to Javascript : ",style);
	GUI.Label (Rect (400, 10, 100, 20), "Received from Javascript: ",style);
	message = GUI.TextArea (Rect (10, 100, 200, 100), message, 200);
	
	received_message = GUI.TextArea (Rect (400, 100, 200, 100), received_message, 200);
	
	if (GUI.Button(Rect(10,200,200,20),"Send A Message")){
		SendAMessage(message);
	}
			
}

function SendAMessage(msg : String) {
	Application.ExternalCall( "ReceivedFromUnity", msg );
}

function ReceivedMessage(msg : String) {
	received_message = msg;
}

