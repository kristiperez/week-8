class User {
    constructor(userId=null,username) {
        this.userId = userId
        this.username = username
        this.blogs = []
    }

    addBlog(blog){
        //validate that you are not adding duplicate trips
        this.blogs.push(blog)
    }


}

class Blog {
    constructor(title,body,author) {
        this.title = title
        this.body = body
        this.author = author
    }
}

//don't understand the object below
module.exports = {
    User: User,
    Blog: Blog
}