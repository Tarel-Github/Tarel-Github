const express = require("express");
const router = express.Router();          
const User = require("../schemas/user");//안쓰나???
const Posts = require("../schemas/posts");//포스트 스키마를 가져옴

const { status } = require("express/lib/response");
const { hash } = require("bcrypt");
const { default: mongoose } = require("mongoose");

//여기주소는 /api로 시작하는듯
// 게시글 전체목록조회: DB => 클라이언트에 보내기
router.get('/', async (req, res) => { //async 지움, 바로 아랫줄의 await도 지움!! 다시 복원!
    


    const {postsId, user, title, content} =req.query;
    const data = await Posts.find({postsId, user, title, content})


    res.json(data)

   
});

//쓸데 없다고 판단 되는거 다 지움!!!!!!!================================================
module.exports = router;