uniform float size;
uniform float scale;
uniform float time;
uniform float pathLength;

attribute float aTime;
attribute float aSpeed;
attribute vec3 aOffset;

varying float vT;
varying vec3 vPos;

void main() {
	vec3 pos = position;
	float t = (time+aTime*50.)/80.;
	float i = mod(t, pathLength)+1.;
	vT = i/pathLength;
	float extra = mod(i,1.);
	int ii = int(floor(i));
	pos = mix(path[ii-1],path[ii],extra);
	pos += aOffset*(.4+1.-smoothstep(0.9, 1., vT));
	vPos = pos;
	gl_PointSize = 1.+size*sin((time/400.+aTime))*.5;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}
