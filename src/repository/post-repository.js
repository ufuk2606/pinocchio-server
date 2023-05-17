import Post from "../model/post-model.js"
import User from "../model/user-model.js";

const getAllPosts = async (order = 'ASC') => {
    const posts = await Post.findAll({ order: [['createdAt', order]] });
    return posts;
}

const getPostsByUserId = async (userId, order) => {
    try {
        const posts = await Post.findAll({ where: { userId: userId }, order: [['createdAt', order]] });
        return posts;
    } catch (error) {
        console.log(error);
    }
}

const createPost = async (pPost) => {
    try {
        const newPost = await Post.create(pPost);
        return newPost;
    } catch (err) {
        console.log(err);
    }
}
const getPostById = async (postId) => {
    const post = await Post.findOne({
        where: { id: postId },
        include: [
            {
                model: User,
                attributes: ["firstName"]
            }
        ]
    });
    return post;
}
const deletePostById = async (pId) => {
    return await Post.destroy({
        where: {
            id: pId
        }
    })
}

const updatePostById = async (pId, updatedPost) => {
    try {
        const post = await Post.findByPk(pId);
        if (post) {
            await Post.update(updatedPost, { where: { id: pId } });
            return
        }
        return { msg: "No post found with this ID" };
    } catch (error) {
        console.log(error);
    }
}
export default {
    getPostsByUserId,
    getAllPosts,
    createPost,
    getPostById,
    deletePostById,
    updatePostById
}