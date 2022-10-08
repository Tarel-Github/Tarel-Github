const mongoose = require ("mongoose");          //몽구스를 사용하겠다는 명령어
require('dotenv').config()
let variable = process.env.MONGODB
const connect = () => {
    mongoose
      .connect(`${variable}`,{ ignoreUndefined: true })
      .catch(err => console.log(err));
  };
  
  mongoose.connection.on("error", err => {
    console.error("몽고DB 연결 에러", err);
  });
  
  module.exports = connect; // 위의 내용을 다른 js 파일에서 읽을 수 있게 한다. 여기서 출력하는 대상은 바로 위의 const connect다
