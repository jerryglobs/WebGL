function idMatrix(m){
    var array = [
        1,0,0,0,
        0,1,0,0,
        0,0,1,0,
        0,0,0,1
    ];
    m = array;
    return m;
}

function mulMatrix(m,k){
    for(var i in m){
        m[i] = m[i]*k;
    }
}

function mulStoreMatrix(r,m,k){
    for(var i in m){
        m[i] = m[i]*k;
    }
    r = m;
}

function mulMatrixVec(rv,m,v){
    var sum;
    var mul;
    var cnt = 0;
    for(i = 0; i<4;i++){
        sum = 0;
        for(j =0; j<16; j+=4){
            mul = m[i+j] * v[i];
            sum += mul;        
        }
        rv[cnt] = sum;
        cnt++;
    }
}