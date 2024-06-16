import { api } from "@/utils/api";


export interface PreSignedUrlResponse {
    pre_signed_url: string;
}

const postPreSignedUrl = async (file: File) => {
    try {
        const response: PreSignedUrlResponse = await api
            .post(`pre-signed-url`, {
                json: { file_name: file?.name },
            })
            .json();
        return response.pre_signed_url;
    } catch (error) {
        throw new Error('pre signed url 전송 실패');
    }
}

export default postPreSignedUrl;