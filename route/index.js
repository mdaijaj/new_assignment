const express= require('express')
const router=express()
const postController= require('../controller/post_controller')
const userController= require('../controller/user_controller')

const {login_required}= require('../middleware/index')

//routes for Dish crude
router.post('/api/register', userController.register)
router.post('/api/signin', userController.signin)
router.get('/api/profile_details/:id', login_required, userController.getUserDetails)
router.get('/api/getUserList', login_required, userController.getUserList)
router.put('/api/editUsertDetails/:id',login_required, userController.editUserDetails)


//post
router.post('/api/createPost', login_required, postController.createPost)
router.get('/api/getPostList',login_required,  postController.getPostList)
router.get('/api/getPostDetails/:id',login_required,  postController.getPostDetails)
router.put('/api/editPostDetails/:id',login_required, postController.editPostDetails)
router.put('/api/deletePostDetails/:id',login_required, postController.deletePostDetails)


module.exports = router;