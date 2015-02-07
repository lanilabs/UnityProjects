using UnityEngine;
using System.Collections;

public class TrackBall : MonoBehaviour {
	
	// Use this for initialization
	void Start ()
	{
		
	}
	
	void OnMouseDrag ()
	{
		RaycastHit hit;
		
		if (Input.GetMouseButton(0))
		{
			if (Physics.Raycast (Camera.main.ScreenPointToRay(Input.mousePosition), out hit))
			{
				float x = -Input.GetAxis("Mouse X");
				float y = -Input.GetAxis("Mouse Y");
				float speed = 10;
				transform.rotation *= Quaternion.AngleAxis(x*speed, Vector3.up);
				transform.rotation *= Quaternion.AngleAxis(y*speed, Vector3.right);
			}
		}
	}
	
}
