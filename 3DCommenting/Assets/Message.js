#pragma strict

public var comment = "This Comment is Nothing";

function Start () {

}

function Update () {
	var hit: RaycastHit;
	var ray = Camera.main.ScreenPointToRay(Input.mousePosition);
	
	if (Physics.Raycast(ray, hit) && hit.collider == this.collider){
		Debug.Log(comment);
		Application.ExternalCall( "RetrieveComment", comment );
	}
}
