varying vec3 vPos;
varying vec3 vNormal;
uniform float time;
uniform float value1;
uniform float value2;

$st_snoise3D

float noise_sum_abs(vec3 p)
{
	float f = 0.0;
	p = p * value1;
	f += 1.0000 * abs(snoise(p)); p = value2 * p;
	f += 0.5000 * abs(snoise(p)); p = value2 * p;
	f += 0.2500 * abs(snoise(p)); p = value2 * p;
	f += 0.1250 * abs(snoise(p)); p = value2 * p;

	return f;
}

float noise_sum_abs_sin(vec3 p)
{
	float f = noise_sum_abs(p);
	f = sin(f * 2.5 + p.x * 5.0 - 1.5);
	return f * f;
}

vec3 draw_fire(float f)
{
	// f = f * 0.5;
	return mix(	vec3(.99, .99, .99),
				vec3(.0, .0, 0.),
				pow(f, .3));
}

void main(void) {
	float noise = noise_sum_abs_sin(vPos/15.+vec3(time/55.,time/21.,time/3.2));
	vec3 color = draw_fire(noise);
	float d = dot(vec3(0.,0.,1.8),1.-abs(vNormal));
	// color+=d;
	// color += smoothstep(0.5, 1., d);
	// d = dot(vec3(0.,0.,1.8),1.-abs(vNormal));
	// d = 1.-smoothstep(0.1, 0.2, d);
	// color += d;
	// d = dot(vec3(0.,0.,1.8),1.-abs(vNormal));
	// d = smoothstep(0.05, 0.1, d);
	// color = mix(vec3(0.),color,d);
	color = 0.95*color+(1.-color)*mix(vec3(.99,.95,.1),vec3(.8,.7,-.2),pow(color.x,.2));
	// color+=vec3(0.,-.4,0.);
	// color *= color;
	gl_FragColor = vec4(color, 1.-smoothstep(0.2, 1., d));
	// gl_FragColor = vec4(vec3(d), 1.0);
}
