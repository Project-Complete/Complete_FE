import { api } from "@/utils/api";


export interface PreSignedUrlResponse {
    image_url: string
    pre_signed_url: string;
}

const postPreSignedUrl = async (file: File) => {
    try {
        const response: PreSignedUrlResponse = await api
            .post(`pre-signed-url`, {
                json: { file_name: file?.name },
            })
            .json();
        return response;
    } catch (error) {
        throw new Error('pre signed url 전송 실패');
    }
}

export default postPreSignedUrl;