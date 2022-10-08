const express = require("express");
const Posts = require("../schemas/posts");
const router = express.Router();


// Comment 조회
router.get('/:postsId', async (req, res) => {
    const { postsId } = req.params;
    const existPosts = await Posts.find({ postsId: Number(postsId)})
    res.json(existPosts);
});

// Comment 작성
router.post("/:postsId",/* authMiddleware,*/async (req, res) => {
    const { postsId } = req.params;                     //어느게시글에 달리는 덧글인가??
    const {nickname, content, password} = req.body
    
    const post = await Posts.findOne ({ postsId : Number(postsId)})

    //Commentid: 날짜기준으로 번호 만들기
    const date = new Date()
    const commentid = date.valueOf();           //포스트에서 그랬던것 처럼 이번엔 댓글도 날짜를 기반으로 작성


        post.comments.push({
            commentid: commentid,
            nickname: nickname,
            password: password,
            content: content,
            createdAt: date,
        })
        await post.save()          
        return res.status(200).send({});

});


// Comment 수정
router.patch("/:postsId/:commentId", /*authMiddleware,*/ async (req, res) => {
    const {postsId,commentId} = req.params;
    const {content} = req.body    //코멘트 아이디

    try {
        await Posts.updateOne(
        { postsId : Number(postsId), "comments.commentid": Number(commentId)},
        { $set: {"comments.$.content": content} });
        return res.status(200).send({});
    } catch (error) {
        return res.status(400).send({});
    }
});




// Comment 삭제
router.delete("/:postsId/:commentId", async (req, res) => {
    const {postsId, commentId} = req.params; //여기서 req.params가 덧글을 지우고자 하는 게시글의 id와 지우고자하는 덧글의 id다. 위의 주소를 그대로 가져오는건가??
    const {password} = req.body    //여기서 req.body란 내가 덧글을 지우기 위해 입력한 비밀번호를 말한다. 여기서, content는 언디파인드가 나온다. 여기서 password는 내가 입력한 비번


    const posts = await Posts.find();//모든 post와 그 내용을 다 가져옴
    const postsIds = posts.map((post) => post.postsId);//모든 포스트 게시글의 아이디를 싹다 긁어옴

    const com = posts.map((post) => post.comments);//모든 포스트 게시글의 덧글을 싹다 긁어옴

    const postsCom =posts.map((post) => post.comments[0].password)
    console.log('식별용 상단')
    console.log(com)
    
    console.log('식별용 하단')
    console.log(password)
    console.log(nickname)



    if(!password){
        console.log('비번입력안됌')
    }else{
        //문제점!!! 몽고db에서 특정 게시글의 페스워드 값만 가져오고 싶은데 그게 되질 않는다. 가져오는데 성공만 한다면 이프문으로 비밀번호를 비교해 삭제여부를 고를 수 있을 것이다.   
    //지우기 위해 필요한 명령!!
    Posts.findOneAndUpdate(
            { postsId : Number(postsId)},    //지우고자 하는 덧글이 있는 게시글
            {   $pull: {comments: {commentid: commentId}}},     //위의 게시글에 있는 덧글의 ID를 찾아서 
            { new: true},                               //몰라레후
            function(err) {
                if(err) {console.log(err)}
            }
        )
    }


});
//===========================================================================



module.exports = router;