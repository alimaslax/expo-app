import { http } from '#shared/services/http';
import { ILogin } from 'src/types/services/ILoginData';
import { ILoginSuccessResponse } from 'src/types/services/ILoginSuccessResponse';

export const authApi = {
  login: async (creds: ILogin) => {
    const resp = await http
      .post(`auth/login`, {
        throwHttpErrors: false,
        json: creds,
        hooks: {
          afterResponse: [
            async (request, _options, response) => {
              if (response.status === 200) {
                const data = (await response.json()) as ILoginSuccessResponse;
                // set 'Authorization' headers
                request.headers.set('Authorization', `Bearer ${data.token}`);
              }
            },
          ],
        },
      })
      .json<ILoginSuccessResponse>();
      
    return resp;
  },
} as const;
