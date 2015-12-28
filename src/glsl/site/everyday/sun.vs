// varying vec2 vUv;
varying vec3 vPos;
uniform float time;
varying float vBump;
varying vec3 vNormal;
$st_snoise3D

void main() {
	vPos = position;
	vNormal = normal;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
