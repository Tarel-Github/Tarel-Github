const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({ //일단 주석
  nickname : String,
  content : String,
  commentid : Number,
  password : String,
  createdAt : Date
});

const postsSchema = new mongoose.Schema({ //포스트 아이디, 이름, 비번, 제목, 콘텐츠, 작성시간을 받는다.
    postsId: {
        type: Number, 
        unique: true
    },  
    user: {
        type: String,
        min: 3,
        max: 10,
        required: true,
    },
    password: {
        type: String,
        required: true,
      },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
    },
    createdAt: {
        type: Date,
        defalt: Date.now(),                         //날짜정보, 마찬가지로 일단 주석
    },
    comments: [commentSchema]                   //이거는 댓글인듯? 위에 정의되어 있는걸 말하는 듯 하다. 일단은 주석
  }
  ,
  {
    timestamps: true                   //일단 주석
  }
  );


module.exports = mongoose.model("Comment", commentSchema);// db에 코멘트 라는 폴더를 생성한다. 들어가는 내용은 위에 선언되어 있다. 일단 이건 주석
module.exports = mongoose.model("Posts", postsSchema);

