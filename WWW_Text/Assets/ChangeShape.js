#pragma strict
public var url = "http://blacklabelsociety.com/home/wp-content/uploads/2014/01/spacer.jpg";

// Url to find the STL FIle
public var stl_url = "file:///Users/lucaszw/Documents/Lanilabs/Side Projects/UnityProjects/WWW_Text/pyramid.stl";
public var shape = new Array ();
public var triangle = Vector3(0,0,0);

function Start () {

  // this code creates a pyramid mesh that replaces a generic cube (that essentially is just there
  // so that we can make sure that each model fills the same bounds unlike our old renderer in threejs
  //  var p0 =  Vector3(0,0,0);
  //  var p1 =  Vector3(1,0,0);
  //  var p2 =  Vector3(0.5f,0,Mathf.Sqrt(0.75f));
  //  var p3 =  Vector3(0.5f,Mathf.Sqrt(0.75f),Mathf.Sqrt(0.75f)/3);
  
  // load an image from the web onto the mesh (WWW class is the only class
  // that can connect to the network with WebGL so we should
  // limit ourselves to it while developing

  // Read the file line by line
  // Grab the file via a WWW request
  var www_stl : WWW = new WWW (stl_url);
  
  // pause running until the file has been retrieved
  yield www_stl;
  
  // split the file based on spaces (eventually ill change to a better solution)
  var file_content = www_stl.text.Split(" "[0]); 
  var mesh : Mesh = GetComponent(MeshFilter).mesh;
  
  // read each word in file
  for (var i=0;i<file_content.Length;i++){
    // look for the word 'vertex', as you know that a vector is soon to follow
    if (file_content[i] == "vertex"){
      for (var j=1;j<= 3; j++){
      	// add item to 3D vector
      	triangle[j-1] = double.Parse(file_content[i+j]);
      }
      shape.push(triangle);
      Debug.Log(shape[shape.length-1]);
    }
  }
   
  mesh.Clear();
  
  mesh.vertices = shape;
  Debug.Log("First Mesh Vertices");
  Debug.Log(mesh.vertices[1]);

  var all_triangles = new int[shape.length];
  
  
  var m = 0;
  
  Debug.Log("Number of Triangles : ");
  Debug.Log(shape.length);
  
  for ( var k=0;k<shape.length;k++) {
      all_triangles[k] = k ;
  }
  mesh.triangles = all_triangles;
  
   
  mesh.RecalculateNormals();
  mesh.RecalculateBounds();
  mesh.Optimize();
  
  var www : WWW = new WWW (url);
  
  yield www;
  this.renderer.material.mainTexture = www.texture;

 
}

function Update () {

}