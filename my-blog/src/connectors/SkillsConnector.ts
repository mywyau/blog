import axios, { AxiosError } from 'axios';
import { DeleteResponseBody } from '../models/DeleteResponseBody';
import { SkillData } from '../models/SkillData';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


class SkillsConnector {

    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getSkillById(id: number): Promise<{ data?: SkillData; error?: string }> {
        try {
            const response = await axios.get(`${this.baseUrl}/blog/skill/retrieve/${id}`);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[SkillsConnector][getSkillById] An error occurred while fetching the post. The post likely does not exist or has been deleted.'
            };
        }
    }

    async getViaSkillId(skill_id: string): Promise<{ data?: SkillData; error?: string }> {
        try {
            const response = await axios.get(`${this.baseUrl}/blog/skill/retrieve/skill-id/${skill_id}`);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[SkillsConnector][getViaSkillId] An error occurred while fetching the post. The post likely does not exist or has been deleted.'
            };
        }
    }

    async getAllSkills(): Promise<{ data?: SkillData[]; error?: string }> {
        try {
            const response = await axios.get(`${this.baseUrl}/blog/skill/get/all`);
            console.log('[SkillsConnector][getAllSkills] Data retrieved:', response.data);
            return { data: response.data };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    '[SkillsConnector][getAllSkills] Axios error occurred:',
                    error.response?.data?.message || error.message
                );
                return {
                    error: error.response?.data?.message ||
                        '[SkillsConnector][getAllSkills] An error occurred while fetching all posts.',
                };
            } else {
                console.error(
                    '[SkillsConnector][getAllSkills] Unknown error occurred:',
                    (error as Error).message
                );
                return {
                    error: '[SkillsConnector][getAllSkills] An unknown error occurred.',
                };
            }
        }
    }


    async updateSkillById(skill_id: string, newSkillData: SkillData): Promise<{ data?: SkillData; error?: string }> {
        try {
            const response = await axios.put(`${this.baseUrl}/blog/skill/update/${skill_id}`, newSkillData);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[SkillsConnector][updateSkillById] An error occurred while updating the post. The post likely does not exist, has been deleted, or data sent such as skill_id is incorrect'
            };
        }
    }

    async deleteSkill(skill_id: string): Promise<{ data?: DeleteResponseBody; error?: string }> {
        try {
            const response = await axios.delete(`${this.baseUrl}/blog/skill/single/${skill_id}`);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[SkillsConnector][deleteSkill] An error occurred while deleting the blog post.',
            };
        }
    }

    async deleteAllRequest(): Promise<{ data?: DeleteResponseBody; error?: string }> {
        try {
            const response = await axios.delete(`${this.baseUrl}/blog/skill/all`);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[SkillsConnector][deleteAllRequest] An error occurred while deleting all blog posts.',
            };
        }
    }
}

export default new SkillsConnector(API_BASE_URL as string);
