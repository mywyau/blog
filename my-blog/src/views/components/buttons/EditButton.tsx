import { Link } from 'react-router-dom';


const EditButton = () => {

    return (
        <div>
            <Link
                id="edit-blog-post-button"
                to="/edit-blog-post"
                className="inline-block font-nunito p-2 pr-6 pl-6 rounded-md focus:outline-none bg-gradient-to-r from-primary-start to-primary-end text-white hover:animate-light-up "
            >
                Edit
            </Link>
        </div>
    )
}


export default EditButton;