uniform sampler2D texture;
uniform float opacity;

void main() {
	gl_FragColor = vec4( 1., opacity ) * texture2D( texture, gl_PointCoord );
}
