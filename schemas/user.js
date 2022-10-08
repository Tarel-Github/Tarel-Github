const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nickname: String,
  password: String,
});

module.exports = mongoose.model("User", UserSchema);//이것이 바로 db에 폴더를 생성시키는 명령이다!!! 그런데 컬렉션을 고를 수는 없나??