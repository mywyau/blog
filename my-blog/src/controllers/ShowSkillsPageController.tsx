import { useEffect, useState } from 'react';
import BlogPostConnector from '../connectors/BlogPostConnector';
import { PostData } from '../models/PostData';
import LandingPage from '../views/pages/LandingPage';
import SkillsConnector from '../connectors/SkillsConnector';
import { SkillData } from '../models/SkillData';
import SkillsPage from '../views/pages/SkillsPage';

class ShowSkillsPageController {

    onPageLoad = () => {

        const [skills, setSkills] = useState<SkillData[]>([]);
        const [errorMessage, setErrorMessage] = useState<string | null>(null);
        const [loading, setLoading] = useState<boolean>(false);

        useEffect(
            () => {
                const fetchPost = async () => {
                    setErrorMessage(null);
                    setSkills([]);

                    const { data, error } = await SkillsConnector.getAllSkills();

                    if (error) {
                        setErrorMessage(error);
                    } else if (data) {
                        if (data.length === 0) {
                            setErrorMessage(`[LandingPageController][getAllPosts] No blog posts retrieved, data base likely empty`);
                        } else {
                            setSkills(data);
                            console.log('[LandingPageController][getAllPosts] Data retrieved:', data);
                        }
                    }

                    setLoading(false);
                };

                fetchPost(); 
            },
            [] 
        );

        console.log('[ShowSkillsPageController][getAllPosts] Posts:', skills);

        return (
            <SkillsPage skills={skills} errorMessage={errorMessage ?? ''} />
        );
    };
}

export default new ShowSkillsPageController;
