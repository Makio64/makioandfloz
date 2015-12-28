varying vec3 vPos;

void main(void) {
	vec3 color = vec3(0.);
	float alpha = smoothstep(30., 100., vPos.z);//*smoothstep(0., 25., vPos.y);
	alpha *= 1.-smoothstep(40., 60., vPos.z);
	gl_FragColor = vec4(color, alpha*.1);
}
