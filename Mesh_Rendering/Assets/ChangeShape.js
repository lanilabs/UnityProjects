#pragma strict
public var url = "http://blacklabelsociety.com/home/wp-content/uploads/2014/01/spacer.jpg";

function Start () {

  // this code creates a pyramid mesh that replaces a generic cube (that essentially is just there
  // so that we can make sure that each model fills the same bounds unlike our old renderer in threejs
  var p0 =  Vector3(0,0,0);
  var p1 =  Vector3(1,0,0);
  var p2 =  Vector3(0.5f,0,Mathf.Sqrt(0.75f));
  var p3 =  Vector3(0.5f,Mathf.Sqrt(0.75f),Mathf.Sqrt(0.75f)/3);
  
  // load an image from the web onto the mesh (WWW class is the only class
  // that can connect to the network with WebGL so we should
  // limit ourselves to it while developing
  

  
  var mesh : Mesh = GetComponent(MeshFilter).mesh;
  
  mesh.Clear();
   
  mesh.vertices = [
      p0,p1,p2,
      p0,p2,p3,
      p2,p1,p3,
      p0,p3,p1
  ];
  mesh.triangles = [
      0,1,2,
      3,4,5,
      6,7,8,
      9,10,11
  ];
   
  mesh.RecalculateNormals();
  mesh.RecalculateBounds();
  mesh.Optimize();
  
  var www : WWW = new WWW (url);
  yield www;
  this.renderer.material.mainTexture = www.texture;

 
}

function Update () {

}