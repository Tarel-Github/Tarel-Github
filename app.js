//npm install로 깔아야하는 대상 express, mongoose(서버), ejs(html을 대신할거인데 아마 안쓸지도?), bcrypt(비번 암호화 툴), dotenv(몽고DB링크 가져올거), cors (http 활용장치), jsonwebtoken(토큰발행용)
const express = require("express");
const connect = require("./schemas/index.js");
const cors = require("cors")                              //자신이 아닌 다른 도메인, 다른 프로토콜, 다른 포트에 있는 리소스를 요청하는 장치

require('dotenv').config()
                                                            //정확히 알 수 없으나 index.html이 기본 파일로서 불러와진다.
const routers = require("./routes")
const app = express();
const port = 5000;







connect();                                                      //위에 선언한 connect함수를 실행한다. connect는 앞서 선언한 스키마 폴더의 인덱스 js파일을 가져오도록 지시한다.
//여기까지가 기본코드

//여기서부터 미들웨어로 이곳에 위치 해야 한다.
const requestMiddleware = (req, res, next) => {
    console.log('Request URL:', req.originalUrl, ' - ', new Date());        //콘솔로그니까 지워도 되지 않을까???
    next();
}


//app는 선술했듯 express()다. 여기에 뭘 쓸지 적용을 한다.
app.use(cors());
app.use(express.static("static"))                   //html 파일을 불러오겠다는 뜻이다.
app.use(express.urlencoded({extended: false}))      //
app.use(express.json());                            //
app.use(requestMiddleware);     //requestMiddleware란 선술한 미들웨어다. 이것을 express에 쓰겠다는 뜻이다.
                                //express를 쓰는데 위와 같은 기능을 추가하겠다는 뜻이다.


app.use('/api', routers);//api 주소에 routers를 사용한다. routes라는 폴더에 있는 것들을 다 가져오는데 이때부터 URL에 api가 붙는다.


app.listen(port, () => {                                        //서버를 켜고, 서버가 정상적으로 켜지면 메시지를 출력하는 코드
    console.log('서버가 가동되었습니다! 포트넘버:', port)
  }); 