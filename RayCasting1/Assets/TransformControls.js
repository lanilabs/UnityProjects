#pragma strict

var speed : int; 
var lerpSpeed : float; 
private var xDeg : float = 0; 
private var yDeg : float = 0; 
private var fromRotation : Quaternion; 
private var toRotation : Quaternion;

function Start () {

}

function Update () {
 if(Input.GetMouseButton(0)) { 
 	xDeg -= Input.GetAxis("Mouse X")*speed; 
 	yDeg -= Input.GetAxis("Mouse Y")*speed; 
 	fromRotation = transform.rotation; 
 	toRotation = Quaternion.Euler(yDeg,xDeg,0); 
 	transform.rotation = Quaternion.Lerp(fromRotation,toRotation,Time.deltaTime * 10 * lerpSpeed); 
 	}
}
