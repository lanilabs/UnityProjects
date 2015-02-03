#pragma strict
public var stl_meshes : GameObject; 
var selGridInt : int = 0;
var selStrings : String[] = ["Grid 1", "Grid 2", "Grid 3", "Grid 4"];
var price : int = 20;
var selTexture : Texture[];
var style : GUIStyle;


function Start () {
	style.normal.textColor = Color.black;
}
function OnGUI () {

	GUI.Label (Rect (10, 10, 100, 20), "Choose Texture", style);
	selGridInt = GUI.SelectionGrid (Rect (25, 35, 240, 40), selGridInt, selStrings, 2);
		
//  	var stl_file = stl_meshes.GetComponent(STLFile);
  	stl_meshes.renderer.material.mainTexture = selTexture[selGridInt];
//  stl_meshes.renderer.material.color = stl_file.default_color;
}
	
function Update () {

}