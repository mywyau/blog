import { Option, fold } from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/function';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { SkillData } from '../../../models/SkillData';



interface EditSkillPageProp {
    getSkillToEdit: Option<SkillData>;
    editSkillFunction: () => Promise<void>;
    errorMessage: string;
}


const EditSkillPage: React.FC<EditSkillPageProp> = (prop) => {

    const defaultSkill: SkillData = {
        id: 0,
        skill_id: "",
        skill_name: "",
        body: ""
    };

    const handleGetSkillToEdit =
        pipe(
            prop.getSkillToEdit,
            fold(
                () => defaultSkill,
                (value) => value
            )
        )


    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const maxTitleLength = 100;
    const maxPostIdLength = 50;
    const maxContentLength = 400;

    const { post_id } = useParams<{ post_id: string }>();
    const postIdDefaulted = post_id ?? 'default-post-id'; // Replace 'default-post-id' with an appropriate default value or handle it accordingly

    const remainingTitleChars = maxTitleLength - title.length;
    const remainingPostIdChars = maxPostIdLength - handleGetSkillToEdit.skill_id.length;
    const remainingContentChars = maxContentLength - content.length;

    return (
        <div className="p-4">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    prop.editSkillFunction();
                }}
            >
                <div className="mb-4">
                    <label className="block mb-2">
                        Title:
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full border border-gray-300 rounded p-2"
                            maxLength={maxTitleLength}
                        // disabled={isLoading}
                        />
                    </label>
                    <p className="text-gray-600 text-sm">
                        {remainingTitleChars} characters remaining
                    </p>
                </div>
                <div className="mt-4 mb-4">
                    <label className="block mb-2">
                        Content:
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-64 border border-gray-300 rounded p-2"
                            maxLength={maxContentLength}
                        // disabled={isLoading}
                        />
                    </label>
                    <p className="text-gray-600 text-sm">
                        {remainingContentChars} characters remaining
                    </p>
                </div>
                <button
                    type="submit"
                    // disabled={isLoading}
                    className="bg-true-blue text-white hover:bg-cambridge-blue px-4 py-2 rounded"
                >
                    {/* {isLoading ? 'Updating...' : 'Update Post'} */}
                </button>
            </form>
            {prop.errorMessage && <p className="text-red-500 mt-4">{prop.errorMessage}</p>}
        </div>
    );
};

export default EditSkillPage;