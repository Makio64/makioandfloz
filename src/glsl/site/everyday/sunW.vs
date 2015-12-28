$st_snoise3D

// varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
uniform float time;

void main() {
	// vUv = uv;
	vNormal = normal;
	vec3 pos = position + (.5+.5*snoise(position.xyz*50000.+time*1.))*normal*.5;
	vPos = (projectionMatrix * modelViewMatrix*vec4( pos, 1.0 )).xyz;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( pos, 1.0 );
}
