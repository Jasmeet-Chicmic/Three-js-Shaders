uniform mat4 projectionMatrix;
        uniform mat4 viewMatrix;
        uniform mat4 modelMatrix;
        varying vec2 vUv;
        attribute vec3 position;
        attribute vec2 uv;
        varying vec3 vViewPosition;
varying vec3 vWorldPosition;
    #include <normal_pars_vertex>
        void main()
        {
            vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectedPosition = projectionMatrix * viewPosition;
            
            gl_Position = projectedPosition;
             vViewPosition = -viewPosition.xyz;
             vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
            vUv = uv;
        }