import { pipe } from 'fp-ts/function';
import { fold, getOrElse, Option } from 'fp-ts/Option';
import React from 'react';
import TextCountHelper from '../../helpers/TextCountHelper';
import { PostData } from '../../models/PostData';
import Spacer from '../components/Spacer';

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
                            <Spacer size="pt-20" />
                            <h1 id={post.post_id} className={`text-4xl text-black font-bold pt-6`}>
                                {post.title}
                            </h1>

                            {/* Flex container for word count and read time */}
                            <div className="flex justify-between items-center mt-10 mb-10 text-sm">
                                <p className="text-left text-blue-600">
                                    Word Count: {textCountHelper.countWords(post.body)}
                                </p>
                                <p className="text-right text-pink-600">
                                    Read Time: {textCountHelper.calculateReadingTime(textCountHelper.countWords(post.body))}
                                </p>
                            </div>

                            <div className="mt-6">
                                {paragraph(post.body)}
                            </div>
                        </div>
                    )
                )
            )
        );
    }

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
