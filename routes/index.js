//수많은 라우터들을 여기서 관리한다.

const express = require("express");                 //먼저 익스프레스 모듈을 가져오고
const postRouter = require("./posts");              //post를 위한 파일인 posts를 가져오고
const userRouter = require("./user");               //사용자를 위한 파일인 user를 가져오고
const commentRouter = require("./comments");        //덧글기능을 파일인 comments를 가져온다.
                                                    //즉, 자신과 같은 폴더내의 파일들을 모두 이곳에 집중한다는 뜻이다.

const router = express.Router();                    //router라는 키워드는 이제 express의 라우터를 뜻한다.

router.use('/', userRouter);                          //유저를 위한 라우트를 가져오고
router.use('/posts', postRouter);                    //포스팅을 위한 라우트를 가져오고
router.use('/comments', commentRouter);               //덧글기능을 위한 라우트를 가져온다.


module.exports = router;