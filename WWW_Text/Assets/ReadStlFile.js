#pragma strict


// Url to find the STL FIle
public var stl_url = "file:///Users/lucaszw/Documents/Lanilabs/Side Projects/UnityProjects/WWW_Text/pyramid.stl";
public var shape = new Array ();
public var triangle = Vector3(0,0,0);

// add to array using something along the lines of shape.Push(Vector3(x, y, z))

function Start () {
  // Read the file line by line
  var line_count = 0;
  // Grab the file via a WWW request
  var www_stl : WWW = new WWW (stl_url);
  
  // pause running until the file has been retrieved
  yield www_stl;
  
  // split the file based on spaces (eventually ill change to a better solution)
  var file_content = www_stl.text.Split(" "[0]);
  
  // read each word in file
  for (var i=0;i<file_content.Length;i++){
    // look for the word 'vertex', as you know that a vector is soon to follow
    if (file_content[i] == "vertex"){
      for (var j=1;j<= 3; j++){
      	// add item to 3D vector
      	triangle[j-1] = float.Parse(file_content[i+j]);
      }
      shape.push(triangle);
      Debug.Log(shape[shape.length-1]);
    }
    line_count += 1;
  }
  
  Debug.Log ("---------");
  Debug.Log (line_count);
  
  
  
  this.guiText.text = file_content[3];
}

function Update () {

}