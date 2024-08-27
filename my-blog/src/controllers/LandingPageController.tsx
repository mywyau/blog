import { useEffect, useState } from 'react';
import BlogPostConnector from '../connectors/BlogPostConnector';
import { PostData } from '../models/PostData';
import LandingPage from '../views/pages/LandingPage';

interface State {
    posts: PostData[];
    errorMessage: string | null;
    loading: boolean;
}

class LandingPageController {

    onPageLoad = () => {

        const [state, setState] = useState<State>({
            posts: [],
            errorMessage: null,
            loading: true,
        });

        useEffect(() => {
            console.log("Component rendered");
            const fetchPost = async () => {
                try {
                    const { data, error } = await BlogPostConnector.getAllPosts();

                    if (error) {
                        setState(prevState => ({
                            ...prevState,
                            errorMessage: error,
                            loading: false,
                        }));
                    } else if (data) {
                        if (data.length === 0) {
                            setState(prevState => ({
                                ...prevState,
                                errorMessage: '[LandingPageController][getAllPosts] No blog posts retrieved, database likely empty',
                                loading: false,
                            }));
                        } else {
                            setState({
                                posts: data,
                                errorMessage: null,
                                loading: false,
                            });
                        }
                    }
                } catch (err) {
                    setState(prevState => ({
                        ...prevState,
                        errorMessage: `[LandingPageController][getAllPosts] Unexpected error: ${err}`,
                        loading: false,
                    }));
                }
            };

            fetchPost(); // Call the async function when the component mounts
        }, []); // Empty dependency array ensures this effect runs only once
        
        console.log('[LandingPageController][getAllPosts] Data retrieved:', state.posts);

        // if (state.loading) {
        //     return <div>Loading...</div>; // Optionally show a loading state
        // }

        return (
            <LandingPage posts={state.posts} errorMessage={state.errorMessage ?? ''} />
        );
    };
}

export default new LandingPageController();
