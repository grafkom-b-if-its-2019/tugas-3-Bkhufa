(function (global) {

  var canvas;

  glUtils.SL.init({ callback: function() { main(); } });

  function main() {

    window.addEventListener('resize', resizer);
    
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);

    // Inisialisasi shaders dan program
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var vertexShaderCube = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShaderCube = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v3.vertex);
    var fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v3.fragment);

    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    var program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);
    var programCube = glUtils.createProgram(gl, vertexShaderCube, fragmentShaderCube);

    //For Triangles
    var thetaLoc = gl.getUniformLocation(program, 'theta'); 
    var transLoc = gl.getUniformLocation(program, 'vec');
    var sizeLoc = gl.getUniformLocation(program, 'size');
    var thetaLoc2 = gl.getUniformLocation(program2, 'theta'); 
    var transLoc2 = gl.getUniformLocation(program2, 'vec');
    var sizeLoc2 = gl.getUniformLocation(program2, 'size');
    var size = 0.4;
    var thetaT = [20, 60, 0];
    var vec = [0, 0, 0];
    var vecX = 0.009;
    var vecY = 0.006;
    var vecZ = 0.003;
    var adder = 0.71;
  
    var thetaLocCube = gl.getUniformLocation(programCube, 'theta');
    var thetaCube = [20, 60, 0];

    
    function triangle(){
      gl.useProgram(program);

      var triangleVertices = [
        //x,y         r,g,b
        +0.1, +0.85,    0.5,0.5,0.5,
        +0.25, -0.2,    0.5,0.5,0.5,
        +0.25, +0.65,   0.5,0.5,0.5,

        +0.1, +0.85,    0.5,0.5,0.5,
        +0.1, -0.0,     0.5,0.5,0.5,
        +0.25, -0.2,    0.5,0.5,0.5,

        +0.25, -0.55,   0.5,0.5,0.5,
        +0.25, -0.4,    0.5,0.5,0.5,
        +0.1, -0.55,    0.5,0.5,0.5,

        +0.25, -0.55,   0.5,0.5,0.5,
        +0.25, -0.4,    0.5,0.5,0.5,  
        +0.8, -0.4,     0.5,0.5,0.5,

        +0.25, -0.55,   0.5,0.5,0.5,
        +0.7, -0.55,    0.5,0.5,0.5,
        +0.8, -0.4,     0.5,0.5,0.5,
        
        +0.65, -0.4,    0.5,0.5,0.5,
        +0.65, +0.35,   0.5,0.5,0.5,
        +0.8, +0.17,    0.5,0.5,0.5,

        +0.65, -0.4,    0.5,0.5,0.5,
        +0.8, -0.4,     0.5,0.5,0.5,
        +0.8, +0.18,    0.5,0.5,0.5,
        
        +0.65, -0.4,    0.5,0.5,0.5,
        +0.55, -0.4,    0.5,0.5,0.5,
        +0.65, -0.25,   0.5,0.5,0.5,
        
        +0.35, +0.35,   0.5,0.5,0.5,
        +0.65, +0.35,   0.5,0.5,0.5,
        +0.65, -0.0,    0.5,0.5,0.5,

        +0.25, -0.0,    0.5,0.5,0.5,
        +0.25, +0.35,   0.5,0.5,0.5,
        +0.55, +0.35,   0.5,0.5,0.5,
        
        +0.2, +0.15,    0.5,0.5,0.5,
        +0.6, +0.15,    0.5,0.5,0.5,
        +0.6, +0.3,     0.5,0.5,0.5,
      ];

      var triangleVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(program, 'vPosition');
      var vColor = gl.getAttribLocation(program, 'vColor');

      gl.vertexAttribPointer(
        vPosition, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0
      );
      gl.vertexAttribPointer(
        vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT
      );

      gl.uniform1f(sizeLoc, size);

      //Hit the Wall

      if(vec[0] > 0.5*(1-size) || vec[0] < -0.5*(1-size) ){
        vecX = vecX * -1;
      }
      vec[0] += vecX;

      if(vec[1] > 0.5*(1-size) || vec[1] < -0.5*(1-size) ){
        vecY = vecY * -1;
      }
      vec[1] += vecY;

      if(vec[2] > 0.5*(1-size) || vec[2] < -0.5*(1-size) ){
        vecZ = vecZ * -1;
      }
      vec[2] += vecZ;

      gl.uniform3fv(transLoc, vec);

      thetaT[1] += ( adder * 3 );

      gl.uniform3fv(thetaLoc, thetaT);
    }

    function line(){
      gl.useProgram(program2);

      // Definisi vertex and buffer
      var lineVertices = [
        //x,y         r,g,b
        -0.85, +0.8,    0.5,0.5,0.5,
        -0.5, +0.8,     0.5,0.5,0.5,
        -0.5, +0.8,     0.5,0.5,0.5,
        -0.3, +0.5,     0.5,0.5,0.5,
        -0.3, +0.5,     0.5,0.5,0.5,
        -0.3, +0.3,     0.5,0.5,0.5,
        -0.3, +0.3,     0.5,0.5,0.5,
        -0.5, +0.1,     0.5,0.5,0.5,
        -0.5, +0.1,     0.5,0.5,0.5,
        -0.3, -0.2,     0.5,0.5,0.5,
        -0.3, -0.2,     0.5,0.5,0.5,
        -0.3, -0.4,     0.5,0.5,0.5,
        -0.3, -0.4,     0.5,0.5,0.5,
        -0.5, -0.6,     0.5,0.5,0.5,
        -0.5, -0.6,     0.5,0.5,0.5,
        -0.85, -0.6,    0.5,0.5,0.5,
        -0.85, -0.6,    0.5,0.5,0.5,
        -0.85, +0.8,    0.5,0.5,0.5,
          
        -0.85, +0.6,    0.5,0.5,0.5,
        -0.55, +0.6,    0.5,0.5,0.5,
        -0.55, +0.6,    0.5,0.5,0.5,
        -0.45, +0.45,   0.5,0.5,0.5,
        -0.45, +0.45,   0.5,0.5,0.5,
        -0.45, +0.4,    0.5,0.5,0.5, 
        -0.45, +0.4,    0.5,0.5,0.5, 
        -0.55, +0.3,    0.5,0.5,0.5, 
        -0.55, +0.3,    0.5,0.5,0.5, 
        -0.85, +0.3,    0.5,0.5,0.5,
        -0.85, +0.3,    0.5,0.5,0.5,
        -0.85, +0.6,    0.5,0.5,0.5, 

        -0.85, -0.1,    0.5,0.5,0.5, 
        -0.55, -0.1,    0.5,0.5,0.5, 
        -0.55, -0.1,    0.5,0.5,0.5, 
        -0.45, -0.25,   0.5,0.5,0.5, 
        -0.45, -0.25,   0.5,0.5,0.5,
        -0.45, -0.3,    0.5,0.5,0.5, 
        -0.45, -0.3,    0.5,0.5,0.5, 
        -0.55, -0.4,    0.5,0.5,0.5, 
        -0.55, -0.4,    0.5,0.5,0.5, 
        -0.85, -0.4,    0.5,0.5,0.5,
        -0.85, -0.4,    0.5,0.5,0.5,
        -0.85, -0.1,    0.5,0.5,0.5, 
      ];

      var lineVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, lineVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(lineVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(program2, 'vPosition');
      var vColor = gl.getAttribLocation(program2, 'vColor');

      gl.vertexAttribPointer(
        vPosition, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0
      );
      gl.vertexAttribPointer(
        vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT
      );

      gl.uniform1f(sizeLoc2, size);

      if(vec[0] > 0.5*(1-size) || vec[0] < -0.5*(1-size) ){
        vecX = vecX * -1;
      }
      vec[0] += vecX;

      if(vec[1] > 0.5*(1-size) || vec[1] < -0.5*(1-size) ){
        vecY = vecY * -1;
      }
      vec[1] += vecY;

      if(vec[2] > 0.5*(1-size) || vec[2] < -0.5*(1-size) ){
        vecZ = vecZ * -1;
      }
      vec[2] += vecZ;

      gl.uniform3fv(transLoc2, vec);

      thetaT[1] += ( adder * 3 );

      gl.uniform3fv(thetaLoc2, thetaT);
    }

    function cube(){
      gl.useProgram(programCube);
      // Missing Lines : AD, DC, EF, DH
      var cubeVertices = [
        // x, y, z             r, g, b
        //ABCD
        -0.5, -0.5, 0.5,    1.0, 0.0, 0.0,    //A
        -0.5, 0.5, 0.5,     1.0, 0.0, 0.0,    //B
        -0.5, 0.5, 0.5,     0.0, 1.0, 0.0,    //B
        0.5, 0.5, 0.5,      0.0, 1.0, 0.0,    //C
        0.5, 0.5, 0.5,      0.0, 0.0, 1.0,    //C
        0.5, -0.5, 0.5,     0.0, 0.0, 1.0,    //D
        0.5, -0.5, 0.5,     1.0, 1.0, 0.0,    //D
        -0.5, -0.5, 0.5,    1.0, 1.0, 0.0,    //A
        
        //DCGH
        0.5, 0.5, 0.5,      0.0, 1.0, 1.0,    //C
        0.5, 0.5, -0.5,     0.0, 1.0, 1.0,    //G
        0.5, -0.5, 0.5,     0.1, 0.0, 1.0,    //D
        0.5, -0.5, -0.5,    0.1, 0.0, 1.0,    //H

        //ABFE
        -0.5, -0.5, 0.5,    1.0, 1.0, 0.0,    //A
        -0.5, -0.5, -0.5,   1.0, 1.0, 0.0,    //E
        -0.5, 0.5, 0.5,     0.0, 1.0, 1.0,    //B
        -0.5, 0.5, -0.5,    0.0, 1.0, 1.0,    //F

        //EFGH
        -0.5, -0.5, -0.5,   0.5, 0.5, 0.0,    //E
        -0.5, 0.5, -0.5,    0.5, 0.5, 0.0,    //F
        -0.5, 0.5, -0.5,    0.0, 0.5, 0.5,    //F
        0.5, 0.5, -0.5,     0.0, 0.5, 0.5,    //G
        0.5, 0.5, -0.5,     0.5, 0.0, 0.5,    //G
        0.5, -0.5, -0.5,    0.5, 0.0, 0.5,    //H
        0.5, -0.5, -0.5,    0.0, 0.5, 1.0,    //H
        -0.5, -0.5, -0.5,   0.0, 0.5, 1.0,    //E

      ];

      var cubeVertexBufferObject = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cubeVertexBufferObject);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(programCube, 'vPosition');
      var vColor = gl.getAttribLocation(programCube, 'vColor');
      gl.vertexAttribPointer(
        vPosition, 3, gl.FLOAT, gl.FALSE, 6 * Float32Array.BYTES_PER_ELEMENT, 0);
      gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 
        6 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vColor);

      gl.uniform3fv(thetaLocCube, thetaCube);
    }

    function render() {
      // Bersihkan layar jadi hitam
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.enable(gl.DEPTH_TEST);
      
      // Bersihkan buffernya canvas
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      
      line(); 
      gl.drawArrays(gl.LINES, 0, 40);

      triangle(); 
      gl.drawArrays(gl.TRIANGLES, 0, 33);

      cube();
      gl.drawArrays(gl.LINES, 0, 24);

      requestAnimationFrame(render);
    }

    function resizer() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

    resizer();
    render();
  }

})(window || this);