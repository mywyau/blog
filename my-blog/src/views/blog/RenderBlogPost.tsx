import { pipe } from 'fp-ts/function';
import { fold, getOrElse, Option } from 'fp-ts/Option';
import React from 'react';
import TextCountHelper from '../../helpers/TextCountHelper';
import { PostData } from '../../models/PostData';

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
                            <div className="mt-4">
                                <h1 id="post-title" className="text-2xl font-bold pt-6 pb-6">{post.title}</h1>
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
