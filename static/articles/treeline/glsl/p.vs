uniform float size;
uniform float time;
uniform float reducSpeed;
uniform float velocity;
uniform float rotation;
uniform float tornado;
uniform float tornadoSize;
uniform float power;
uniform vec3 powerPosition;
attribute float aTime;

void main() {
	vec3 pos = position;
	// pos.y = pos.y-mod((time+aTime)*20.,9000.);
	pos.z = pos.z-time*velocity;

	float angle = atan(-normal.y,normal.x);
		  angle += rotation*pos.z/10.+3.14*6.*tornado;
	pos.y = mix(pos.y,cos(angle)*(pos.y-600.)/1000.*tornadoSize+600.,tornado);
	pos.x = mix(pos.x,sin(angle)*pos.x/200.*tornadoSize,tornado);

	// pos += power * smoothstep(0., 200., distance(pos, powerPosition)) * normalize(pos-powerPosition);

	vec4 mvPosition = modelViewMatrix * vec4( pos, 1.0 );

	gl_PointSize = (size-time/reducSpeed) * ( 8000. / length( mvPosition.xyz ) );//+10.*size*sin((aTime+time)/100.);
	// gl_PointSize *= ;
	// gl_PointSize = size*2.-time/reducSpeed;
	gl_Position = projectionMatrix * mvPosition;

}
