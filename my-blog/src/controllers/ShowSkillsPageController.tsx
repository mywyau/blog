import React from 'react';
import GetAllSkills from '../hooks/GetAllSkills';
import SkillsPage from '../views/pages/SkillsPage';

const SkillsPageController: React.FC = () => {
    
    const { skills, getAllSkillErrorMessage } = GetAllSkills();

    return (
        <SkillsPage skills={skills} errorMessage={getAllSkillErrorMessage ?? ''} />
    );
};

export default SkillsPageController;
