import { ResourceParamsApiRequest } from 'src/shared/schemas/resource';
import { type GetUserApiRequest, type GetUserApiResponse } from 'src/form/schemas/USerSchema';

export const userKeys = {
  all: ['users'] as const,
  lists: () => [...userKeys.all, 'list'] as const,
  list: (params: ResourceParamsApiRequest) => [...userKeys.lists(), params] as const,
  details: () => [...userKeys.all, 'detail'] as const,
  detail: (params: GetUserApiRequest) => [...userKeys.details(), params] as const,
};

export const userApi = {
  getDetail: async (params: GetUserApiRequest) => {
    const json = await apiClient.get<GetUserApiResponse>(`users/${params.id}`);

    return json;
  },
} as const;
