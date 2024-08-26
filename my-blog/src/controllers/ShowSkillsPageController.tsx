import { pipe } from 'fp-ts/lib/function';
import EditSkill from '../hooks/EditSkill';
import GetAllSkills from '../hooks/GetAllSkills';
import EditSkillPage from '../views/components/skills/EditSkillPage';
import SkillsPage from '../views/pages/SkillsPage';
import { match, fold } from 'fp-ts/lib/Option';

class ShowSkillsPageController {

    onPageLoad = () => {

        const { skills, getAllSkillErrorMessage } = GetAllSkills();
        console.log('[ShowSkillsPageController][onPageLoad] Skills:', skills);

        return (
            <SkillsPage skills={skills} errorMessage={getAllSkillErrorMessage ?? ''} />
        );
    };

    editSkill = async () => {

        const { skills, getAllSkillErrorMessage } = GetAllSkills();
        console.log('[ShowSkillsPageController][getAllPosts] Posts:', skills);

        const { getSkillToEdit, editSkillFunction, errorMessage } = EditSkill();

        const optGetSkillToEdit = await getSkillToEdit()

        return (
            <EditSkillPage getSkillToEdit={optGetSkillToEdit} editSkillFunction={editSkillFunction} errorMessage={getAllSkillErrorMessage ?? ''} />
        );
    };
}

export default new ShowSkillsPageController;
