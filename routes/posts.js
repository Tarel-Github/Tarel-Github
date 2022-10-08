const express = require("express");
const Posts = require("../schemas/posts")                                   //스키마 폴더에 있는 posts 양식을 가져온다.
const router = express.Router();
//여기서는 게시판에서 출력할 HTML을 지정하고, 내가 글을 올릴 때, 글을 수정할때, 글을 삭제할 때의 지시사항이 들어있다.
//이곳의 주소는  /api/posts로 시작

// Posting(정보등록): 클라이언트 html에서 입력한 정보 => DB로 보내기
router.post("/", (req, res) => {  //async를 지움
    const { user, password, title, content } = req.body     //왼쪽의 내용들이 요청의 body에 들어간다.

    //postsId: 날짜기준으로 번호 만들기
    const date = new Date()                                                     //날짜를 만드는데 사용
    // let postId = date.getFullYear()+"" +date.getMonth()+"" + date.getDate()+ ""+date.getHours()+""+date.getMinutes()+""+date.getSeconds()
    let postsId = date.valueOf();                                               //date.valueOf는 1970년부터 지금 이순간까지의 시간 차이를 밀리초로 표시한 숫자를 가져온다. 숫자가 클수록 나중이다.

    //빈칸이 있을 경우 그것들을 채워달라는 코드지만 일단 주석처리!!
    // if (!user){
    //     res.status(400).send({errorMessage: '이름을 입력하세요'});
    //     return;
    // } 

    // if (!password){
    //     res.status(400).send({errorMessage: '"비밀번호를 입력하세요'});
    //     return;
    // } 

    // if (!title){
    //     res.status(400).send({errorMessage: '제목을 입력하세요'});
    //     return;
    // } 

    // if (!content){
    //     res.status(400).send({errorMessage: '내용을 입력하세요'});
    //     return;
    // } 
    
    let createdAt = date;

    //if (user,password,title,content){                                           //4가지 모든 데이터가 있는것이 확인되면  //조건따위 일단 주석처리!!!
        Posts.create({ postsId, user, password, title, content, createdAt })         //게시글의 고유번호, 이름, 비번, 제목, 내용을 post로 생성! (await를 지움)
        return res.status(200).send({Message: '저장완료'});                    //200은 성공적으로 수행했을 때를 위한 코드다. 즉 저장에 성공했다는 메시지를 리스폰(res)하라는 뜻
    //}
});


//원하는 글을 클릭했을 때 반응 시작=====================================================================================
// Posting detail(상세조회): 클라이언트에 HTML 연결정보 보내기                  //원하는 게시글을 클릭했을 때 그 게시글을 보는 페이지로 이동한다(이때, HTML 파일도 같이 가져온다)
router.get('/:postsId', (req, res) => {
    const path = require("path")
    res.sendFile(path.join(__dirname + '/../static/detail.html'))           //html 정보를 보내주는 명령
});

//게시글 상세보기시 이동코드                             //게시글 상세조회 페이지로 넘어오면 보고자 하는 내용을 DB로부터 가져와야 한다.
router.get('/:postsId/detail', async (req, res) => {
    console.log("")
    const { postsId } = req.params;
    const existPosts = await Posts.find({ postsId: Number(postsId) });
    res.json(existPosts);
});

//게시글 수정시 필요한 HTML 전송코드
router.get('/:postsId/edit', (req, res) => {
    const path = require("path")
    res.sendFile(path.join(__dirname + '/../static/edit.html'))
});
//원하는 글을 클릭했을 때 반응 종료=====================================================================================
//  // Posting: detail > Edit: DB의 내용가져오기
// router.get("/:postsId/get", async (req, res) => {
//     const { postsId } = req.params;
//     const existPosts = await Posts.find({ postsId: Number(postsId) });
//     res.json(existPosts);
// })

 //게시글 편집 기능
 router.put("/:postsId/edit", async (req, res) => {
    const { postsId } = req.params;                                                            //입력받은 파람스데이터는 postsId가 된다.
    const { password, title, content } = req.body;                                             //입력받은 바디데이터는 비번, 제목, 콘텐츠가 된다.

    const posts = await Posts.find();                                                          // await는 기다린다는 함수다. 즉 Post.find() 명령이 수행될때까지 기다리고 그것이 찾아지면 posts가 된다.
    const postsIds = posts.map((post) => post.postsId);  
    const postsPws = posts.map((post) => post.password);
    
    for(let i=0; i< postsIds.length; i++){
        if(postsIds[i] === Number(postsId) && postsPws[i] === password){
            await Posts.updateOne({ postsId: Number(postsId)}, { $set: {title, content} })
            return res.status(200).json({ msg: '수정 완료' });

        } else if (postsIds[i] === Number(postsId) && postsPws[i] != password){             //상술했듯 postsIds의 값이 p
            return res.json({ msg: '비밀번호 불일치' });

        } else if (!password){
            return res.json({ msg: "비밀번호를 입력해주세요" })
        }
    }
});

// 게시글 삭제기능
router.delete("/:postsId", async (req, res) => {
    const { postsId } = req.params;
    const { password } = req.body;

    const posts = await Posts.find();
    const postsIds = posts.map((post) => post.postsId);
    const postsPws = posts.map((post) => post.password);

    for (let i=0; i<postsIds.length; i++){
        if(postsIds[i] === Number(postsId) && postsPws[i] === password){
            await Posts.deleteOne({ postsId });
            return res.json({ msg: '삭제 완료' });

        } else if (postsIds[i] === Number(postsId) && postsPws[i] != password){  
            return res.json({ msg: '비밀번호 불일치' });

        } else if (!password){
            return res.json({ msg: "비밀번호를 입력해주세요" })
        } 
    }
});

module.exports = router;                                    //이 모듈을 외부로 내보낸다.