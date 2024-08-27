// import React, { useEffect, useState } from 'react';
// import EditSkill from '../hooks/EditSkill';
// import GetAllSkills from '../hooks/GetAllSkills';
// import EditSkillPage from '../views/components/skills/EditSkillPage';
// import SkillsPage from '../views/pages/SkillsPage';
// import { Option, some, none } from 'fp-ts/lib/Option';
// import { SkillData } from '../models/SkillData';

// const ShowSkillsPageController: React.FC = () => {
//     const { skills, getAllSkillErrorMessage } = GetAllSkills();

//     const { getSkillToEdit, editSkillFunction, errorMessage } = EditSkill();

//     const [optGetSkillToEdit, setOptGetSkillToEdit] = useState<Option<SkillData>>(none);

//     useEffect(() => {
//         const fetchSkillToEdit = async () => {
//             const skillToEdit = await getSkillToEdit();
//             setOptGetSkillToEdit(skillToEdit);
//         };
        
//         fetchSkillToEdit();
//     }, []);

//     const renderSkillsPage = () => {
//         return (
//             <SkillsPage skills={skills} errorMessage={getAllSkillErrorMessage ?? ''} />
//         );
//     };

//     const renderEditSkillPage = () => {
//         return (
//             <EditSkillPage getSkillToEdit={optGetSkillToEdit} editSkillFunction={editSkillFunction} errorMessage={errorMessage} />
//         );
//     };

//     // Logic to determine which page to render
//     const isEditing = false; // Replace with actual logic to check if editing
//     return isEditing ? renderEditSkillPage() : renderSkillsPage();
// };

// export default ShowSkillsPageController;

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
