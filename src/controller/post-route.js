import express from 'express';
import postRepository from '../repository/post-repository.js';
import puppeteer from 'puppeteer'
const router = express.Router();

async function printPDF(postId) {
   const browser = await puppeteer.launch({ headless: true });/// Puppeteer launches the Chromium browser in headless mode, which means that the browser runs in the background without displaying any graphical user interface (GUI).
   const page = await browser.newPage();///create a new page
   await page.goto(`http://localhost:3000/post/${postId}`, { waitUntil: 'networkidle0' }); //go to the selected post
   const pdf = await page.pdf({ format: 'A4' }); ///generate PDF
   await browser.close(); //close the browser
   return pdf; 
}

router.get('/', async (req, res, next) => {
   try {
      const userId = req.query.userId; // /?userId=something
      const order = req.query.order; // Get order from query parameter
      let posts;
      if (userId) {
         posts = await postRepository.getPostsByUserId(userId, order);
      } else {
         posts = await postRepository.getAllPosts(order);
      }
      return res.status(200).send(posts);
   } catch (error) {
      return next({ status: 404, message: error });
   }
});

//generate PDF by id
router.get('/pdf/:id', async (req, res, next) => {
   try {
      const pdf = await printPDF(req.params.id);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=example.pdf');
      return res.send(pdf);
   } catch (error) {
      console.error('Error generating PDF:', error);
      return next({ status: 500, message: 'Error generating PDF' })
   }
});

// Create a new post
router.post('/', async (req, res, next) => {
   try {
      const { body } = req;
      const newPost = await postRepository.createPost(body);
      return res.send(newPost);
   } catch (error) {
      return next({ status: 500, message: error.message });
   }
});


// Get a single post by id
router.get('/:id', async (req, res, next) => {
   try {
      const postId = req.params.id
      const selectedPost = await postRepository.getPostById(postId);
      if (selectedPost === null) return next({ status: 404, message: `post with id  ${postId} not found` })
      return res.status(200).send(selectedPost);
   } catch (err) {
      return next({ status: 500, message: err.message });
   }
});;



// Update a post by id
router.put('/:id', async (req, res) => {
   const { id } = req.params
   const updatedPost = req.body
   const post = await postRepository.updatePostById(id, updatedPost)
   return res.status(200).send(post);
});;




// Delete a post by id
router.delete('/:id', async (req, res) => {
   const result = await postRepository.deletePostById(req.params.id);
   if (result === 0) {
      return res.status(404).send(`Can't delete post ${req.params.id} because it doesn't even exist :)`);
   } else {
      return res.send(`Post ${req.params.id} deleted`);
   }
});


export default router;
