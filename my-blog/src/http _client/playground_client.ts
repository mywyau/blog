import axios from 'axios';

// interface PostData {
//     title: string;
//     content: string;
// }

const baseUrl = "http://localhost:8080"

// Example: Fetch all posts
const fetchPosts = async () => {
    try {
        const response = await axios.get(baseUrl + "/blog/posts/retrieve/1"); // Replace with your endpoint URL
        console.log(response.data); // Handle the data
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};


// Example usage
const postData = {
    title: 'New Post Title',
    body: 'This is the content of the new post.',
};


// Example: Create a new post
// const createPost = async (postData) => {
//     try {
//         const response =
//             await axios.post(
//                 baseUrl + "/blog/post/create",
//                 postData
//             );
//         console.log('Post created successfully:', response.data);
//     } catch (error) {
//         console.error('Error creating post:', error);
//     }
// };

// Example: Delete all posts
const deleteAllPosts = async () => {
    try {
        const response = await axios.delete(baseUrl + "/blog/posts/all");
        console.log(response.data.message); // Handle the result
    } catch (error) {
        console.error('Error deleting posts:', error);
    }
};

// // Call functions
// fetchPosts();
// deleteAllPosts();
