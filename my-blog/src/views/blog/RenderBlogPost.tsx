import { pipe } from 'fp-ts/function';
import { fold, getOrElse, Option } from 'fp-ts/Option';
import React from 'react';
import TextCountHelper from '../../helpers/TextCountHelper';
import { PostData } from '../../models/PostData';
import H1 from '../components/general/H1';
import Spacer from '../components/Spacer';
import { size } from 'fp-ts/lib/ReadonlyRecord';

interface RenderBlogPostProps {
    post: Option<PostData>;
    loading: Option<boolean>;
    errorMessage: Option<string>;
}


function paragraph(postBody: string): JSX.Element[] {
    return postBody.split('\n').map((para, index) => (
        <p key={index} className="mb-4">{para}</p>
    ));
}

const RenderBlogPost: React.FC<RenderBlogPostProps> = ({ post, loading, errorMessage }) => {

    const textCountHelper = TextCountHelper;

    function postHtml(post: Option<PostData>): JSX.Element {
        return (
            pipe(
                post,
                fold(() => <></>,
                    (post) => (
                        <div>
                            {/* <H1 id={`blog-post-${post.post_id}`} message={post.title} className={''} /> */}
                            <Spacer size="pt-20" />
                            <h1 id={post.post_id} className={`text-4xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent pt-6`}>
                                {post.title}
                            </h1>
                            <div className="mt-4">
                                <p className='text-sm text-gray-600 mb-6 pt-2'>
                                    Word Count: {textCountHelper.countWords(post.body)}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-sm mb-4">
                                    Read time: {textCountHelper.calculateReadingTime(textCountHelper.countWords(post.body))}
                                </p>
                            </div>
                            <div>
                                {paragraph(post.body)}
                            </div>
                        </div>
                    )
                )
            )
        )
    };

    function H1Html(post: Option<PostData>): JSX.Element {
        return (
            pipe(
                post,
                fold(() => <></>,
                    (post) => (
                        <H1 id={`blog-post-${post.post_id}`} message={post.title} className={''} />
                    )
                )
            )
        )
    };

    const handledError =
        pipe(
            errorMessage,
            getOrElse(() => "")
        );

    const handledLoading =
        pipe(
            loading,
            getOrElse(() => false)
        );


    return (
        <div>
            {handledLoading ? 'Loading...' : ''}
            <p className="text-red-500 mt-2">{handledError}</p>
            {postHtml(post)}
        </div>
    );
};

export default RenderBlogPost;
