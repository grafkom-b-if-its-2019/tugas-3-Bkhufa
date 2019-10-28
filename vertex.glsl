precision mediump float;

attribute vec4 vPosition;
uniform float theta;
uniform float scale;

void main() {
  mat4 rotasi = mat4(
    cos(theta), -sin(theta), 0.0, 0.0,
    sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  mat4 translasi = mat4(
    1.0, 0.0, 0.0, -0.5,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.2
  );
  // gl_Position = (vPosition-vec4(-0.4,0,0,0)) * rotasi + vec4(-0.4,0,0,0);
  gl_Position = (vPosition-vec4(-0.4,0,0,0)) * rotasi;
  gl_Position = gl_Position * translasi;
}