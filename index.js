(function(global) {

    var canvas, gl, program, program2, shaders=[], flag=0;
    var scaleLoc, scale = 1, membesar = 1, theta = 0, thetaLoc;
    
    glUtils.SL.init({ callback:function() { main(); } });
  
    function main() {
      // Register Callbacks
      window.addEventListener('resize', resizer);
  
      // Get canvas element and check if WebGL enabled
      canvas = document.getElementById("glcanvas");
      gl = glUtils.checkWebGL(canvas);
  
      initShaders();

      resizer();
      draw();
    }

    function initShaders(){
      // Initialize the shaders and program
      var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex),
          fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
      var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex),
          fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);  
      // shaders.push(glUtils.createProgram(gl, vertexShader, fragmentShader));
      // shaders.push(glUtils.createProgram(gl, vertexShader2, fragmentShader2));
      program = glUtils.createProgram(gl, vertexShader, fragmentShader);
      program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);
    }
  
    // draw!
    function draw() {
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      var linesVertices = new Float32Array([
      -0.85, +0.8, 
      -0.5, +0.8, 
      -0.5, +0.8, 
      -0.3, +0.5,
      -0.3, +0.5,
      -0.3, +0.3,
      -0.3, +0.3,
      -0.5, +0.1,
      -0.5, +0.1,
      -0.3, -0.2,
      -0.3, -0.2,
      -0.3, -0.4,
      -0.3, -0.4,
      -0.5, -0.6,
      -0.5, -0.6,
      -0.85, -0.6,
      -0.85, -0.6,
      -0.85, +0.8,
         
      -0.85, +0.6, 
      -0.55, +0.6, 
      -0.55, +0.6, 
      -0.45, +0.45, 
      -0.45, +0.45, 
      -0.45, +0.4, 
      -0.45, +0.4, 
      -0.55, +0.3, 
      -0.55, +0.3, 
      -0.85, +0.3,
      -0.85, +0.3,
      -0.85, +0.6, 

      -0.85, -0.1, 
      -0.55, -0.1, 
      -0.55, -0.1, 
      -0.45, -0.25, 
      -0.45, -0.25,
      -0.45, -0.3, 
      -0.45, -0.3, 
      -0.55, -0.4, 
      -0.55, -0.4, 
      -0.85, -0.4,
      -0.85, -0.4,
      -0.85, -0.1, 
      ]);

      var triangleVertices = new Float32Array([
      +0.1, +0.85,  
      +0.25, -0.2,
      +0.25, +0.65, 

      +0.1, +0.85,
      +0.1, -0.0,
      +0.25, -0.2,

      +0.25, -0.55,
      +0.25, -0.4,
      +0.1, -0.55,

      +0.25, -0.55,
      +0.25, -0.4,
      +0.8, -0.4,

      +0.25, -0.55,
      +0.7, -0.55,
      +0.8, -0.4,
      
      +0.65, -0.4,
      +0.65, +0.35,
      +0.8, +0.17,

      +0.65, -0.4,
      +0.8, -0.4,
      +0.8, +0.18,
      
      +0.65, -0.4,
      +0.55, -0.4,
      +0.65, -0.25,
      
      +0.35, +0.35,
      +0.65, +0.35,
      +0.65, -0.0,

      +0.25, -0.0,
      +0.25, +0.35,
      +0.55, +0.35,
      
      +0.2, +0.15,
      +0.6, +0.15,
      +0.6, +0.3,
      ]);

      // program=shaders[0];
      gl.useProgram(program);
      
      thetaLoc = gl.getUniformLocation(program, 'theta');
      drawA(gl.LINES, linesVertices, program);

      // program2=shaders[1];
      gl.useProgram(program2);
      
      scaleLoc = gl.getUniformLocation(program2, 'scale');
      drawA2(gl.TRIANGLES, triangleVertices, program2);
      requestAnimationFrame(draw);
    }

    function drawA(type, vertices, programs) {
      var n = initBuffers(vertices, programs);
      if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
      }
      gl.drawArrays(type, 0, n);
    }

    function drawA2(type, vertices, programs) {
      var n = initBuffers2(vertices, programs);
      if (n < 0) {
        console.log('Failed to set the positions of the vertices');
        return;
      }
      gl.drawArrays(type, 0, n);
    }

    function initBuffers(vertices, programs) {
      var n = vertices.length / 2;

      var vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(programs, 'vPosition');
      if (vPosition < 0) {
        console.log('Failed to get the storage location of vPosition');
        return -1;
      }

      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);

      var angle = 0.0071;                       //NRP
      theta += Math.PI * angle;
      // theta += Math.PI * angle / 180.0;
      gl.uniform1f(thetaLoc, theta);
      
      return n;
    }

    function initBuffers2(vertices, programs) {
      var n = vertices.length / 2;

      var vertexBuffer = gl.createBuffer();
      if (!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
      }

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(programs, 'vPosition');
      if (vPosition < 0) {
        console.log('Failed to get the storage location of vPosition');
        return -1;
      }

      gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(vPosition);

      if (scale >= 1) membesar = -1;
      else if (scale <= -1) membesar = 1;
      scale = scale + (membesar * 0.0071);            //NRP
      gl.uniform1f(scaleLoc, scale);

      return n;
    }

    function resizer() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

})(window || this);