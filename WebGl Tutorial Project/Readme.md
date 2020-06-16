(CC-NC-BY) Park Jae Hyoung 2019

다음 html 문서는 Computer Graphics Transformation 에대한 문서이다.
정육면체(Planet)와 그 주변을 도는 위성형 정육면체(Moon)들을 통해 Transformation이 어떻게 일어나는지  확인할 수 있다.

 
1. 각 버튼의 기능 명세  
  
  Visible/InVisible : 물체를 가시모드/비가시모드로 전환해준다.
  Rotate Speed Up : 각각의 물체마다 임의로 정해진 회전축을 기준으로 회전하는 속도를 올려준다.
  Rotate Pause : 회전하고 있는 물체의 회전을 멈춘다.
  Move X +0.01 : 물체의 X 좌표를 0.01 만큼 증가시킨다.
  Move X -0.01 : 물체의 X 좌표를 0.01 만큼 감소시킨다.
  Move Y +0.01 : 물체의 Y 좌표를 0.01 만큼 증가시킨다.
  Move Y -0.01 : 물체의 Y 좌표를 0.01 만큼 감소시킨다.
  Move Z +0.01 : 물체의 Z 좌표를 0.01 만큼 증가시킨다.
  Move Z -0.01 : 물체의 Z 좌표를 0.01 만큼 감소시킨다.
  

2. 기능 구현 방법
   
  [1] 정육면체의 정점 위치 정의 
     - 윗면, 아랫면, 오른쪽옆면, 왼쪽옆면, 앞면, 밑면 
     - webgl 에서는 삼각형 2개를 그려 사각형을 만드므로 각각의 면마다 삼각형 2개를 그려줌
 
  [2] 정점의 색상 정의
     - ( r, g, b, a ) 로 RED, GREEN,BLUE , ALPHA(투명도) 값으로 Vertex구성
 
  [3] index 배열 정의
     - [1]과 [2]를 합쳐서 만들어낸 vertex 배열을 gl에 전달
     - gl.vertexBuffer = gl.createBuffer(); // buffer 생성
       gl.bindBuffer(gl.ARRAY_BUFFER, gl.vertexBuffer); // vertex buffer를 사용하기 위함 
       gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW); //GPU에 있는 vertex buffer에 데이터 복사
 
  [4] 정육면체 그리기
     - Webgl에 buffer에서 데이터를 가져오고 싶다고 알려주기 위해 attribute 작동
       gl.enableVertexAttribArray(0);
       gl.vertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 36, 0);        
     - gl.vertexAttribPointer(position AttributeLocation, size, type, normalize, stride, offset)
       position AttributeLocation = attribute 위치
       size = 한벌 실핼할때마다 사용하는 구성요소 개수 
       type = 데이터 형식 
       normalize = 정규화 여부 
       stride = 해당 값만큼 실행할때마다 다음 위치로 이동
       offset = 버퍼의 시작위치
     - VertexShader 값 설정 
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
     - Vertex Shader 생성
       gl.vertexShader = gl.createShader(gl.VERTEX_SHADER);
       gl.shaderSource(gl.vertexShader, vertexShaderSource);
       gl.compileShader(gl.vertexShader);
     - gl.programObject = gl.createProgram(); // 프로그램 객체 생성
      
       gl.attachShader(gl.programObject, gl.fragShader); //Attach the fragmentShader
       gl.attachShader(gl.programObject, gl.vertexShader); //Attach the vertexShader
       // Bind the custom vertex attribute "myVertex" to location 0
       gl.bindAttribLocation(gl.programObject, 0, "myVertex");
       gl.bindAttribLocation(gl.programObject, 1, "myColor");
	   gl.bindAttribLocation(gl.programObject, 2, "myUV");
     - Webgl에 사용할 쉐이더 프로그램을 알려줌
       gl.useProgram(gl.programObject); 
     - gl.drawArrays(gl.TRIANGLES, 0, 36); // 그리기
 
  [5] 8개의 위성 그리기
     - 동일한 위성을 그리기 위해 기준점을 설정
       var mov_matrix_child = mov_matrix.slice();
       // 해당 변수를 통해 동일한 위치, 크기에 대한 위성을 참조 할 수 있어 이후 이루어질 Transformation 연산에서 8개의 위성이 서로 독립적이도록 해줌
     - 위성이 위치할 좌표 변경
       translate$2(out,a,b); 
       out = 변환된 정육면체
       a = 기준이되는 정육면체
       b = translate 좌표 vector (x,y,z) 
     - 위성의 회전축과 회전속도 결정
       rotate$3(out, a, rad, axis);
       rad = 회전 속도값
       axis = 회전축 vector (x,y,z)
     - 위성의 크기 변화
       scale$3(out,a,v);
       v = scale 배율 vector (x,y,z)
     
  [6] translate, rotate, scale 에 들어갈 매개변수 변경을 위한 함수 선언
  [7] Button Onclick Listener에 함수 등록
  [8] 구현완료

3. 해당 Tutorial 구현 의도 및 목적
  [1]  Webgl 내에서 도형이 그려지는 과정에 대해 코드와 주석을 통해 알 수 있다.
  [2] cgProject.js 내의 RenderScene() 함수내에서 Translate, Rotate, Scale의 선언 순서를 직접 변경해보면서
      시각화된 변경 모습을 실시간으로 보며 Transformation 에 대한 이해를 할 수 있다. 