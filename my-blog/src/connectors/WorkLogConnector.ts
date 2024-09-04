import axios, { AxiosError } from 'axios';
import { DeleteResponseBody } from '../models/DeleteResponseBody';
import { WorkLogData } from '../models/WorkLogData';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


class WorklogConnector {

    private baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async getWorklogById(id: number): Promise<{ data?: WorkLogData; error?: string }> {
        try {
            const response = await axios.get(`${this.baseUrl}/blog/worklog/retrieve/${id}`);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[WorklogsConnector][getWorklogById] An error occurred while fetching the worklog. The worklog likely does not exist or has been deleted.'
            };
        }
    }

    async getViaWorklogId(worklog_id: string): Promise<{ data?: WorkLogData; error?: string }> {
        try {
            const response = await axios.get(`${this.baseUrl}/blog/worklog/retrieve/worklog-id/${worklog_id}`);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[WorklogsConnector][getViaworklogId] An error occurred while fetching the worklog. The worklog likely does not exist or has been deleted.'
            };
        }
    }

    async getAllWorklogs(): Promise<{ data?: WorkLogData[]; error?: string }> {
        try {
            const response = await axios.get(`${this.baseUrl}/blog/worklog/get/all`);
            console.log('[WorklogsConnector][getAllworklogs] Data retrieved:', response.data);

            const worklogs: WorkLogData[] = response.data.map((worklog: any) => ({
                ...worklog,
                created_at: new Date(worklog.created_at),
                updated_at: new Date(worklog.updated_at),
            }));

            return { data: worklogs };
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    '[WorklogsConnector][getAllworklogs] Axios error occurred:',
                    error.response?.data?.message || error.message
                );
                return {
                    error: error.response?.data?.message ||
                        '[WorklogsConnector][getAllworklogs] An error occurred while fetching all worklogs.',
                };
            } else {
                console.error(
                    '[WorklogsConnector][getAllworklogs] Unknown error occurred:',
                    (error as Error).message
                );
                return {
                    error: '[WorklogsConnector][getAllworklogs] An unknown error occurred.',
                };
            }
        }
    }



    async updateWorklogById(worklog_id: string, newWorkLogData: WorkLogData): Promise<{ data?: WorkLogData; error?: string }> {
        try {
            const response = await axios.put(`${this.baseUrl}/blog/worklog/update/${worklog_id}`, newWorkLogData);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[WorklogsConnector][updateworklogById] An error occurred while updating the worklog. The worklog likely does not exist, has been deleted, or data sent such as worklog_id is incorrect'
            };
        }
    }

    async deletWorklog(worklog_id: string): Promise<{ data?: DeleteResponseBody; error?: string }> {
        try {
            const response = await axios.delete(`${this.baseUrl}/blog/worklog/single/${worklog_id}`);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[WorklogsConnector][deleteworklog] An error occurred while deleting the blog worklog.',
            };
        }
    }

    async deleteAllRequest(): Promise<{ data?: DeleteResponseBody; error?: string }> {
        try {
            const response = await axios.delete(`${this.baseUrl}/blog/worklog/all`);
            return { data: response.data };
        } catch (error) {
            const axiosError = error as AxiosError;
            return {
                error: axiosError.response?.data?.message ||
                    '[WorklogsConnector][deleteAllRequest] An error occurred while deleting all blog worklogs.',
            };
        }
    }
}

export default new WorklogConnector(API_BASE_URL as string);
