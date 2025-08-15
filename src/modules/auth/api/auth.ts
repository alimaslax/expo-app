import { apiClient } from 'src/services/ApiClient';
import { ILoginData } from 'src/types/services/ILoginData';
import { ILoginSuccessResponse } from 'src/types/services/ILoginSuccessResponse';

export const authApi = {
  login: async (creds: ILoginData) => {
    try {
      const resp = await apiClient.post<ILoginSuccessResponse>('user/login', creds);
      // Set authorization token if login is successful
      if (resp.accessToken) {
        apiClient.setAuthToken(resp.accessToken);
      }
      
      return resp;
    } catch (error: any) {
      // Handle 400 errors (invalid credentials) - return the error response instead of throwing
      if (error.response && error.response.status === 400) {
        return error.response.data;
      }
      
      // For other errors (500, network issues, etc.), let them bubble up
      throw error;
    }
  },
} as const;
