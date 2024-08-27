import React from 'react';

import { fold, getOrElse, Option } from 'fp-ts/Option';
import { pipe } from 'fp-ts/function';
import { DeleteResponseBody } from '../../../models/DeleteResponseBody';

interface OnDeleteReturn {
    handleDelete: () => Promise<void>;
    loading: Option<boolean>;
    errorMessage: Option<string>;
    deleteResponseBody: Option<DeleteResponseBody>;
}

function deletetHtml(deleteResponseBody: Option<DeleteResponseBody>): JSX.Element {
    return (
        pipe(
            deleteResponseBody,
            fold(
                () => <></>,
                (deleteResponseBody) => (
                    <div className="mt-4">
                        <p id="delete-button-response-body" className="mb-4">{deleteResponseBody.message}</p>
                    </div>
                )
            )
        )
    )
};

const DeleteSkillButton: React.FC<OnDeleteReturn> = (
    {
        handleDelete,
        loading,
        errorMessage,
        deleteResponseBody,
    }
) => {

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
        <form
            onSubmit={
                (e) => {
                    e.preventDefault();
                    handleDelete();
                }
            }
        >
            <div>
                <button
                    type="submit"
                    disabled={handledLoading}
                    className="inline-block font-nunito p-1 pr-3 pl-3 text-sm rounded-md focus:outline-none bg-gradient-to-r from-primary-start to-primary-end text-white hover:animate-light-up"
                >
                    Delete this skill
                </button>
            </div>
            <p className="text-red-500 mt-2">{handledError}</p>
            <p className="text-xl text-red-500 mt-2">{deletetHtml(deleteResponseBody)}</p>
        </ form>
    );
};

export default DeleteSkillButton;
