precision mediump float;

uniform sampler2D uNoiseTexture;
varying vec2 vUv;
varying vec3 vWorldPosition;
uniform float u_time;
uniform vec3 u_PivotPosition;
uniform float u_AlphaFalloffEnd;
uniform float u_FlameFalloffStart;
uniform float u_FlameFalloffEnd;



void main() {
 


    vec2 animatedUV = vUv + vec2(u_time * 0.2, u_time * 0.1);

   
    vec4 tNoise = texture2D(uNoiseTexture, animatedUV);

   

   
    vec3 skyBlueColor = vec3(0.529, 0.808, 0.922);
    vec3 orangeColor = vec3(1.0, 0.647, 0.0);
    
    float strength = distance(vUv, vec2(0.5)) * 2.0;
    strength = pow(strength, 2.0);
    vec3 finalColor = mix(tNoise.rgb, orangeColor, 0.5);

 
    gl_FragColor = vec4(finalColor.r * strength, finalColor.g * strength, finalColor.b * strength, tNoise.a * strength);
}
