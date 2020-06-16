// (CC-NC-BY) Park Jae Hyoung 2019
// *************************************************************************gl-matrix.js 파일 함수*************************************************************************
// line number 3 ~ 298 reference to https://github.com/toji/gl-matrix/tree/master/dist/gl-matrix.js
var EPSILON = 0.000001;
/**
   * Generates a perspective projection matrix with the given bounds.
   * Passing null/undefined/no value for far will generate infinite projection matrix.
   *
   * @param {mat4} out mat4 frustum matrix will be written into
   * @param {number} fovy Vertical field of view in radians
   * @param {number} aspect Aspect ratio. typically viewport width/height
   * @param {number} near Near bound of the frustum
   * @param {number} far Far bound of the frustum, can be null or Infinity
   * @returns {mat4} out
   */
function perspective(out, fovy, aspect, near, far) { 
    var f = 1.0 / Math.tan(fovy / 2),
        nf;
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[15] = 0;

    if (far != null && far !== Infinity) {
      nf = 1 / (near - far);
      out[10] = (far + near) * nf;
      out[14] = 2 * far * near * nf;
    } else {
      out[10] = -1;
      out[14] = -2 * near;
    }

    return out;
}
/**
   * Set a mat4 to the identity matrix
   *
   * @param {mat4} out the receiving matrix
   * @returns {mat4} out
   */
function identity$3(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
   * Multiplies two mat4s
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the first operand
   * @param {mat4} b the second operand
   * @returns {mat4} out
   */
function multiply$3(out, a, b) {
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3];
    var a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];
    var a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];
    var a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15]; // Cache only the current line of the second matrix

    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return out;
}

/**
   * Translate a mat4 by the given vector
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to translate
   * @param {vec3} v vector to translate by
   * @returns {mat4} out
   */
function translate$2(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;

    if (a === out) {
      out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
      out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
      out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
      out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
      a00 = a[0];
      a01 = a[1];
      a02 = a[2];
      a03 = a[3];
      a10 = a[4];
      a11 = a[5];
      a12 = a[6];
      a13 = a[7];
      a20 = a[8];
      a21 = a[9];
      a22 = a[10];
      a23 = a[11];
      out[0] = a00;
      out[1] = a01;
      out[2] = a02;
      out[3] = a03;
      out[4] = a10;
      out[5] = a11;
      out[6] = a12;
      out[7] = a13;
      out[8] = a20;
      out[9] = a21;
      out[10] = a22;
      out[11] = a23;
      out[12] = a00 * x + a10 * y + a20 * z + a[12];
      out[13] = a01 * x + a11 * y + a21 * z + a[13];
      out[14] = a02 * x + a12 * y + a22 * z + a[14];
      out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
}

  /**
   * Scales the mat4 by the dimensions in the given vec3 not using vectorization
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to scale
   * @param {vec3} v the vec3 to scale the matrix by
   * @returns {mat4} out
   **/
function scale$3(out, a, v) {
    var x = v[0],
        y = v[1],
        z = v[2];
    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
}

  /**
   * Rotates a mat4 by the given angle around the given axis
   *
   * @param {mat4} out the receiving matrix
   * @param {mat4} a the matrix to rotate
   * @param {Number} rad the angle to rotate the matrix by
   * @param {vec3} axis the axis to rotate around
   * @returns {mat4} out
   */
function rotate$3(out, a, rad, axis) {
    var x = axis[0],
        y = axis[1],
        z = axis[2];
    var len = Math.hypot(x, y, z);
    var s, c, t;
    var a00, a01, a02, a03;
    var a10, a11, a12, a13;
    var a20, a21, a22, a23;
    var b00, b01, b02;
    var b10, b11, b12;
    var b20, b21, b22;

    if (len < EPSILON) {
      return null;
    }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;
    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;
    a00 = a[0];
    a01 = a[1];
    a02 = a[2];
    a03 = a[3];
    a10 = a[4];
    a11 = a[5];
    a12 = a[6];
    a13 = a[7];
    a20 = a[8];
    a21 = a[9];
    a22 = a[10];
    a23 = a[11]; // Construct the elements of the rotation matrix

    b00 = x * x * t + c;
    b01 = y * x * t + z * s;
    b02 = z * x * t - y * s;
    b10 = x * y * t - z * s;
    b11 = y * y * t + c;
    b12 = z * y * t + x * s;
    b20 = x * z * t + y * s;
    b21 = y * z * t - x * s;
    b22 = z * z * t + c; // Perform rotation-specific matrix multiplication

    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) {
      // If the source and destination differ, copy the unchanged last row
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }

    return out;
}

// *************************************************************************gl-matrix.js 파일 함수*************************************************************************

var gl;
var any = new Array();
var showFlag = [-1,-1,-1,-1,-1,-1,-1,-1]; // satellite 를 보이게 하는 flag
//RotValue
rotValue = 0.0; 
satellite = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

//RotValueUp
planetRotValue = 0.0;
satellite_RotValue = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

//Scale Vector
scaleV = [0.25, 0.25, 0.25 ];

transV0 = [ 0.0, 0.0, 0.0 ]; // main Cube Translate Vector
//Satellite translate Vector
transV1 = [ 0.75, 0.75, 0.75 ]; //moon1 translate Vector
transV2 = [ 0.75, 0.75 , -0.75]; //moon2 translate Vector
transV3 = [ 0.75, -0.75 , 0.75]; //moon3 translate Vector
transV4 = [ 0.75, -0.75 , -0.75]; //moon4 translate Vector
transV5 = [ -0.75, 0.75 , 0.75]; //moon5 translate Vector
transV6 = [ -0.75, 0.75 , -0.75]; //moon6 translate Vector
transV7 = [ -0.75, -0.75 , 0.75]; //moon7 translate Vector
transV8 = [ -0.75, -0.75 , -0.75]; //moon8 translate Vector


function testGLError(functionLastCalled) {

    var lastError = gl.getError();

    if (lastError != gl.NO_ERROR) {
        alert(functionLastCalled + " failed (" + lastError + ")");
        return false;
    }

    return true;
}

function initialiseGL(canvas) {
    try {
 // Try to grab the standard context. If it fails, fallback to experimental
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        gl.viewport(0, 0, canvas.width, canvas.height);
    }
    catch (e) {
    }

    if (!gl) {
        alert("Unable to initialise WebGL. Your browser may not support it");
        return false;
    }

    return true;
}

var shaderProgram;

function initialiseBuffer() {
		
    var vertexData = [
        // 윗면
		-0.5, 0.5, 0.5,		1.0, 1.0, 1.0, 0.5,		0.0, 1.0,//3
        0.5, 0.5, 0.5,		1.0, 1.0, 1.0, 0.5,		1.0, 1.0,//1
		0.5, 0.5, -0.5,		1.0, 1.0, 1.0, 0.5,		1.0, 1.0,//2
		-0.5, 0.5, 0.5,		1.0, 1.0, 1.0, 0.5,		0.0, 1.0,//3
		0.5, 0.5, -0.5,		1.0, 1.0, 1.0, 0.5,		1.0, 1.0,//2
		-0.5, 0.5, -0.5,	1.0, 1.0, 1.0, 0.5,		0.0, 1.0,//4
        
        //뒷면
		0.5, 0.5, -0.5,		0.0, 0.0, 0.0, 0.5,		1.0, 1.0,//2
		0.5, -0.5, -0.5,	0.0, 0.0, 0.0, 0.5,		1.0, 0.0,//6
		-0.5,-0.5,-0.5,		0.0, 0.0, 0.0, 0.5,		0.0, 0.0,//8
		-0.5, 0.5, -0.5,	0.0, 0.0, 0.0, 0.5,		0.0, 1.0,//4
		0.5, 0.5, -0.5,		0.0, 0.0, 0.0, 0.5,		1.0, 1.0,//2
		-0.5,-0.5,-0.5,		0.0, 0.0, 0.0, 0.5,		0.0, 0.0,//8
            
        //오른쪽 옆면
		0.5, -0.5, 0.5,		1.0, 0.5, 0.0, 0.5,		0.0, 1.0,//5
		0.5, -0.5, -0.5,	1.0, 0.5, 0.0, 0.5,		0.0, 1.0,//6
		0.5, 0.5, -0.5,		1.0, 0.5, 0.0, 0.5,		1.0, 1.0,//2
		0.5, -0.5, 0.5,		1.0, 0.5, 0.0, 0.5,		0.0, 1.0,//5
		0.5, 0.5, -0.5,		1.0, 0.5, 0.0, 0.5,		1.0, 1.0,//2
		0.5, 0.5, 0.5,		1.0, 0.5, 0.0, 0.5,		1.0, 1.0,//1
                 
        //왼쪽 옆면
		-0.5, 0.5, -0.5,	1.0, 0.0, 0.0, 0.5,		0.0, 1.0,//4
		-0.5,-0.5, -0.5,	1.0, 0.0, 0.0, 0.5,		0.0, 0.0,//8
		-0.5, -0.5, 0.5,	1.0, 0.0, 0.0, 0.5,		0.0, 0.0,//7
		-0.5, 0.5, 0.5,		1.0, 0.0, 0.0, 0.5,		0.0, 1.0,//3
		-0.5, 0.5, -0.5,	1.0, 0.0, 0.0, 0.5,		0.0, 1.0,//4
		-0.5, -0.5, 0.5,	1.0, 0.0, 0.0, 0.5,		0.0, 0.0,//7
        
        //앞면
		-0.5, -0.5, 0.5,	0.0, 0.0, 1.0, 0.5,		0.0, 0.0,//7
		0.5, -0.5, 0.5,		0.0, 0.0, 1.0, 0.5,		1.0, 0.0,//5
		0.5, 0.5, 0.5,		0.0, 0.0, 1.0, 0.5,		1.0, 1.0,//1 
		-0.5, -0.5, 0.5,	0.0, 0.0, 1.0, 0.5,		0.0, 0.0,//7
		0.5, 0.5, 0.5,		0.0, 0.0, 1.0, 0.5,		1.0, 1.0,//1
		-0.5, 0.5, 0.5,		0.0, 0.0, 1.0, 0.5,		0.0, 1.0,//3
        
        //밑면
		 0.5, -0.5, -0.5,	0.0, 1.0, 0.0, 0.5,		1.0, 0.0,//6
		 0.5, -0.5, 0.5,	0.0, 1.0, 0.0, 0.5,		1.0, 0.0,//5
		-0.5, -0.5, 0.5,	0.0, 1.0, 0.0, 0.5,		0.0, 0.0,//7
		-0.5,-0.5, -0.5,	0.0, 1.0, 0.0, 0.5,		0.0, 0.0,//8
		 0.5, -0.5, -0.5,	0.0, 1.0, 0.0, 0.5,		1.0, 0.0,//6
		-0.5, -0.5, 0.5,	0.0, 1.0, 0.0, 0.5,		0.0, 0.0,//7
    ];
	
    // Generate a buffer object
    gl.vertexBuffer = gl.createBuffer();
    // Bind buffer as a vertex buffer so we can fill it with data
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
    return testGLError("initialiseBuffers");
}

function initialiseShaders() {

    var fragmentShaderSource = '\
			varying mediump vec4 color; \
			void main(void) \
			{ \
				gl_FragColor = 1.0 * color;\
			}';

    gl.fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(gl.fragShader, fragmentShaderSource);
    gl.compileShader(gl.fragShader);
    if (!gl.getShaderParameter(gl.fragShader, gl.COMPILE_STATUS)) {
        alert("Failed to compile the fragment shader.\n" + gl.getShaderInfoLog(gl.fragShader));
        return false;
    }
//vertexShader 값 설정 
    var vertexShaderSource = '\
			attribute highp vec3 myVertex; \
			attribute highp vec4 myColor; \
			attribute highp vec2 myUV; \
			uniform mediump mat4 Pmatrix; \
			uniform mediump mat4 Vmatrix; \
			uniform mediump mat4 Mmatrix; \
			varying mediump vec4 color; \
			varying mediump vec2 texCoord;\
			void main(void)  \
			{ \
				gl_Position = Pmatrix*Vmatrix*Mmatrix*vec4(myVertex, 1.0);\
				color = myColor;\
				texCoord = myUV; \
			}';

    //Vertex Shader 생성
    gl.vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(gl.vertexShader, vertexShaderSource); // 사용할 자원 설정
    gl.compileShader(gl.vertexShader);
    if (!gl.getShaderParameter(gl.vertexShader, gl.COMPILE_STATUS)) {
        alert("Failed to compile the vertex shader.\n" + gl.getShaderInfoLog(gl.vertexShader));
        return false;
    }

    gl.programObject = gl.createProgram();

    // Attach the fragment and vertex shaders to it
    gl.attachShader(gl.programObject, gl.fragShader);
    gl.attachShader(gl.programObject, gl.vertexShader);
    // Bind the custom vertex attribute "myVertex" to location 0
    gl.bindAttribLocation(gl.programObject, 0, "myVertex");
    gl.bindAttribLocation(gl.programObject, 1, "myColor");
	gl.bindAttribLocation(gl.programObject, 2, "myUV");

    // Link the program
    gl.linkProgram(gl.programObject);

    if (!gl.getProgramParameter(gl.programObject, gl.LINK_STATUS)) {
        alert("Failed to link the program.\n" + gl.getProgramInfoLog(gl.programObject));
        return false;
    }

    gl.useProgram(gl.programObject); // Webgl에 사용할 쉐이더 프로그램을 알려줌

    return testGLError("initialiseShaders");
}

var proj_matrix = perspective(any,30, 1.0, 1, 10.0);
// perspective 설명
//30은 angle 값인데 클수록 큐브가 작아짐
// 1.0 은 a 값임 화면 비율임. 1:1 정비율을 맞추려면 width/height 해주면 됨
//5.0 값이 작아지면 작아질수록 뒤에 그림이 짤릴거고 커지면 앞이 짤림

var mov_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
var view_matrix = [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];

view_matrix[14] = view_matrix[14]-5; // 카메라의 위치값으로 해당 값의 변화를 통해 시야를 넓히거나 좁혀줌
frames = 1;

function planetPause() // 메인 행성만 멈추는 함수
{
    planetRotValue = 0.0;
}

function allPause() // 모둔 물체를 멈추는 함수
{
    var count;
    planetRotValue = 0.0;
    for(count =0; count<8; count++){
        satellite_RotValue[count] = 0.0;
    }
}

function allRotate() // 모든 물체를 회전시키는 함수
{
    var count;
    planetRotValue += 0.01;
    for(count =0; count<8;count++){
        satellite_RotValue[count] += 0.01;

    }
}

function satellite_Rotate(num) // 특정 위성을 회전시키는 함수
{
    switch(num){
        case 1:
        satellite_RotValue[0] += 0.01;
        break;
        case 2:
        satellite_RotValue[1] += 0.01;
        break;
        case 3:
        satellite_RotValue[2] += 0.01;
        break;
        case 4:
        satellite_RotValue[3] += 0.01;
        break;
        case 5:
        satellite_RotValue[4] += 0.01;
        break;
        case 6:
        satellite_RotValue[5] += 0.01;
        break;
        case 7:
        satellite_RotValue[6] += 0.01;
        break;
        case 8:
        satellite_RotValue[7] += 0.01;
        break;
    }
}

function satellite_Pause(num) // 특정 위성을 멈추는 함수
{
    switch(num){
        case 1:
        satellite_RotValue[0] = 0.0;
        break;
        case 2:
        satellite_RotValue[1] = 0.0;
        break;
        case 3:
        satellite_RotValue[2] = 0.0;
        break;
        case 4:
        satellite_RotValue[3] = 0.0;
        break;
        case 5:
        satellite_RotValue[4] = 0.0;
        break;
        case 6:
        satellite_RotValue[5] = 0.0;
        break;
        case 7:
        satellite_RotValue[6] = 0.0;
        break;
        case 8:
        satellite_RotValue[7] = 0.0;
        break;
    }
}

function trMoon_Position_Plus(num, axis){ // 특정 위성의 특정 좌표를 증가시키는 함수
    switch(num){
        case 1:
            if(axis == 0)
                transV1[0] += 0.01;
            else if(axis == 1)
                transV1[1] += 0.01;
            else
                transV1[2] += 0.01;
        break;
        case 2:
            if(axis == 0)
                transV2[0] += 0.01;
            else if(axis == 1)
                transV2[1] += 0.01;
            else
                transV2[2] += 0.01;
        break;
        case 3:
            if(axis == 0)
                transV3[0] += 0.01;
            else if(axis == 1)
                transV3[1] += 0.01;
            else
                transV3[2] += 0.01;
        break;
        case 4:
            if(axis == 0)
                transV4[0] += 0.01;
            else if(axis == 1)
                transV4[1] += 0.01;
            else
                transV4[2] += 0.01;
        break;
        case 5:
            if(axis == 0)
                transV5[0] += 0.01;
            else if(axis == 1)
                transV5[1] += 0.01;
            else
                transV5[2] += 0.01;
        break;
        case 6:
            if(axis == 0)
                transV6[0] += 0.01;
            else if(axis == 1)
                transV6[1] += 0.01;
            else
                transV6[2] += 0.01;
        break;
        case 7:
            if(axis == 0)
                transV7[0] += 0.01;
            else if(axis == 1)
                transV7[1] += 0.01;
            else
                transV7[2] += 0.01;
        break;
        case 8:
            if(axis == 0)
                transV8[0] += 0.01;
            else if(axis == 1)
                transV8[1] += 0.01;
            else
                transV8[2] += 0.01;
        break;        
    }
}


function trMoon_Position_Minus(num, axis){ // 특정 위성의 특정 좌표를 감소시키는 함수
    switch(num){
        case 1:
            if(axis == 0)
                transV1[0] -= 0.01;
            else if(axis == 1)
                transV1[1] -= 0.01;
            else
                transV1[2] -= 0.01;
        break;
        case 2:
            if(axis == 0)
                transV2[0] -= 0.01;
            else if(axis == 1)
                transV2[1] -= 0.01;
            else
                transV2[2] -= 0.01;
        break;
        case 3:
            if(axis == 0)
                transV3[0] -= 0.01;
            else if(axis == 1)
                transV3[1] -= 0.01;
            else
                transV3[2] -= 0.01;
        break;
        case 4:
            if(axis == 0)
                transV4[0] -= 0.01;
            else if(axis == 1)
                transV4[1] -= 0.01;
            else
                transV4[2] -= 0.01;
        break;
        case 5:
            if(axis == 0)
                transV5[0] -= 0.01;
            else if(axis == 1)
                transV5[1] -= 0.01;
            else
                transV5[2] -= 0.01;
        break;
        case 6:
            if(axis == 0)
                transV6[0] -= 0.01;
            else if(axis == 1)
                transV6[1] -= 0.01;
            else
                transV6[2] -= 0.01;
        break;
        case 7:
            if(axis == 0)
                transV7[0] -= 0.01;
            else if(axis == 1)
                transV7[1] -= 0.01;
            else
                transV7[2] -= 0.01;
        break;
        case 8:
            if(axis == 0)
                transV8[0] -= 0.01;
            else if(axis == 1)
                transV8[1] -= 0.01;
            else
                transV8[2] -= 0.01;
        break;        
    }
}

function planetRotate() // 행성을 회전 시키는 함수
{
    planetRotValue += 0.01;
}

function calcRotate() // 회전 변화량을 측정하는 함수
{
    var count;
    rotValue += planetRotValue; 
    for(count=0; count<8; count++){
        satellite[count] += satellite_RotValue[count];
    }
}

function showSatellite(num){ // 위성의 화면에 대한 표시 여부를 변경해주는 함수
    if(showFlag[num]== -1){
        showFlag[num] = 1;
    }else{
        showFlag[num] = -1;
    }
}

function renderScene() { // canvas 에 rendering 을 하는 함수

    //console.log("Frame "+frames+"\n");
    frames += 1 ;
	rotAxis = [1,1,0];
    rotBxis = [1,0,1];
    rotCxis = [0,1,1];
    rotDxis = [1,0,0];
    rotExis = [0,1,0];
    rotFxis = [0,0,1];
    rotGxis = [1,1,1];
    var Pmatrix = gl.getUniformLocation(gl.programObject, "Pmatrix"); //원근법
    var Vmatrix = gl.getUniformLocation(gl.programObject, "Vmatrix"); // 카메라 이동 
    var Mmatrix = gl.getUniformLocation(gl.programObject, "Mmatrix"); 
     
    gl.uniformMatrix4fv(Pmatrix, false, proj_matrix);
    gl.uniformMatrix4fv(Vmatrix, false, view_matrix);
    gl.uniformMatrix4fv(Mmatrix, false, mov_matrix);

    if (!testGLError("gl.uniformMatrix4fv")) {
        return false;
    }
/*
    gl.vertexAttribPointer(position AttributeLocation, size, type, normalize, stride, offset)
       position AttributeLocation = attribute 위치
       size = 한벌 실핼할때마다 사용하는 구성요소 개수 
       type = 데이터 형식 
       normalize = 정규화 여부 
       stride = 해당 값만큼 실행할때마다 다음 위치로 이동
       offset = 버퍼의 시작위치
*/
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 36, 0);
    gl.enableVertexAttribArray(1);
    gl.vertexAttribPointer(1, 4, gl.FLOAT, gl.FALSE, 36, 12);
	gl.enableVertexAttribArray(2);
    gl.vertexAttribPointer(2, 2, gl.FLOAT, gl.FALSE, 36, 28);


    if (!testGLError("gl.vertexAttribPointer")) {
        return false;
    }
    // gl.enable(gl.DEPTH_TEST);
    // gl.depthFunc(gl.LEQUAL); 
	// gl.enable(gl.CULL_FACE);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA); // fs *s + (1-fs)*d source over 소스가 앞에 있고 dest가 뒤에
	gl.blendEquation(gl.FUNC_ADD);

    gl.clearColor(0.6, 0.8, 1.0, 1.0);
    gl.clearDepth(1.0); 
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    
    identity$3(mov_matrix); 
    translate$2(mov_matrix ,mov_matrix, transV0); // X방향으로 이동 ex) 회전축은 원점일때 x만큼 이동하면 회전하는 범위가 늘어남 
    rotate$3(mov_matrix,mov_matrix, rotValue, rotAxis);
    gl.uniformMatrix4fv(Mmatrix,false,mov_matrix);
	gl.drawArrays(gl.TRIANGLES, 0, 36);
    
    var mov_matrix_child = mov_matrix.slice(); // 배열을 복사 slice가 없으면 그냥 주소 복사임
    // 해당 변수를 통해 동일한 위치, 크기에 대한 위성을 참조 할 수 있어 이후 이루어질 Transformation 연산에서 8개의 위성이 서로 독립적이도록 해줌

    //1st moon
    if(showFlag[0]==1){
        rotate$3(mov_matrix, mov_matrix, satellite[0], rotGxis);
        translate$2(mov_matrix ,mov_matrix, transV1); // X방향으로 이동 ex) 회전축은 원점일때 x만큼 이동하면 회전하는 범위가 늘어남 
        scale$3(mov_matrix,mov_matrix,scaleV);
        gl.uniformMatrix4fv(Mmatrix,false,mov_matrix);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        mov_matrix = mov_matrix_child.slice();
    }
    //2nd moon
    if(showFlag[1]==1){
        rotate$3(mov_matrix, mov_matrix, satellite[1], rotFxis);
        translate$2(mov_matrix ,mov_matrix, transV2); // X방향으로 이동 ex) 회전축은 원점일때 x만큼 이동하면 회전하는 범위가 늘어남 
        scale$3(mov_matrix,mov_matrix,scaleV);
        gl.uniformMatrix4fv(Mmatrix,false,mov_matrix);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        mov_matrix = mov_matrix_child.slice();
    }
    //3rd moon
    if(showFlag[2]==1){
        rotate$3(mov_matrix, mov_matrix, satellite[2], rotExis);
        translate$2(mov_matrix ,mov_matrix, transV3); // X방향으로 이동 ex) 회전축은 원점일때 x만큼 이동하면 회전하는 범위가 늘어남 
        scale$3(mov_matrix,mov_matrix,scaleV);
        gl.uniformMatrix4fv(Mmatrix,false,mov_matrix);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        mov_matrix = mov_matrix_child.slice();
    }
    //4th moon
    if(showFlag[3]==1){
        rotate$3(mov_matrix, mov_matrix, satellite[3], rotDxis);
        translate$2(mov_matrix ,mov_matrix, transV4); // X방향으로 이동 ex) 회전축은 원점일때 x만큼 이동하면 회전하는 범위가 늘어남 
        scale$3(mov_matrix,mov_matrix,scaleV);
        gl.uniformMatrix4fv(Mmatrix,false,mov_matrix);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        mov_matrix = mov_matrix_child.slice();
    }
    //5th moon
    if(showFlag[4]==1){
        rotate$3(mov_matrix, mov_matrix, satellite[4], rotCxis);
        translate$2(mov_matrix ,mov_matrix, transV5); // X방향으로 이동 ex) 회전축은 원점일때 x만큼 이동하면 회전하는 범위가 늘어남 
        scale$3(mov_matrix,mov_matrix,scaleV);
        gl.uniformMatrix4fv(Mmatrix,false,mov_matrix);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        mov_matrix = mov_matrix_child.slice();
    }
    //6th moon
    if(showFlag[5]==1){
        rotate$3(mov_matrix, mov_matrix, satellite[5], rotBxis);
        translate$2(mov_matrix ,mov_matrix, transV6); // X방향으로 이동 ex) 회전축은 원점일때 x만큼 이동하면 회전하는 범위가 늘어남 
        scale$3(mov_matrix,mov_matrix,scaleV);
        gl.uniformMatrix4fv(Mmatrix,false,mov_matrix);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        mov_matrix = mov_matrix_child.slice();
    }
    //7th moon
    if(showFlag[6]==1){
        rotate$3(mov_matrix, mov_matrix, satellite[6], rotAxis);
        translate$2(mov_matrix ,mov_matrix, transV7); // X방향으로 이동 ex) 회전축은 원점일때 x만큼 이동하면 회전하는 범위가 늘어남 
        scale$3(mov_matrix,mov_matrix,scaleV);
        gl.uniformMatrix4fv(Mmatrix,false,mov_matrix);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        mov_matrix = mov_matrix_child.slice();
    }
    //8th moon
    if(showFlag[7]==1){
        rotate$3(mov_matrix, mov_matrix, satellite[7], rotFxis);
        translate$2(mov_matrix ,mov_matrix, transV8); // X방향으로 이동 ex) 회전축은 원점일때 x만큼 이동하면 회전하는 범위가 늘어남 
        scale$3(mov_matrix,mov_matrix,scaleV);
        gl.uniformMatrix4fv(Mmatrix,false,mov_matrix);
        gl.drawArrays(gl.TRIANGLES, 0, 36);
        mov_matrix = mov_matrix_child.slice();
    }

    calcRotate();
    
    if (!testGLError("gl.drawArrays")) {
        return false;
    }

    return true;
}

function main() {
    var canvas = document.getElementById("cgProjects");

    console.log("Start");

    if (!initialiseGL(canvas)) {
        return;
    }

    if (!initialiseBuffer()) {
        return;
    }

    if (!initialiseShaders()) {
        return;
    }

    // Render loop
    requestAnimFrame = (
	function () {
        //	return window.requestAnimationFrame || window.webkitRequestAnimationFrame 
	//	|| window.mozRequestAnimationFrame || 
	   	return function (callback) {
			    // console.log("Callback is"+callback); 
			    window.setTimeout(callback, 10, 10); };
    })();

    (function renderLoop(param) {
        if (renderScene()) {
            // Everything was successful, request that we redraw our scene again in the future
            requestAnimFrame(renderLoop);
        }
    })();
}
