uniform sampler2D texture;
uniform float opacity;
uniform float time;
uniform float reducAlpha;

void main() {

	float alpha = 1.-time/reducAlpha;
	gl_FragColor = vec4(vec3(.3,.3,.5), alpha*opacity )*texture2D( texture, gl_PointCoord );
}
