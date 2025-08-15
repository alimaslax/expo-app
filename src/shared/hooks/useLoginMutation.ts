import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { authApi } from "src/services/authService";
import { ILoginData } from "src/types/services/ILoginData";
import { ILoginSuccessResponse } from "src/types/services/ILoginSuccessResponse";

export const useLoginMutation = () =>
  useMutation<ILoginSuccessResponse, AxiosError, ILoginData>({
    onError(error: AxiosError) {
      console.debug('Failed to login', error.code, error.message, error.cause);
    },
    mutationFn: (data: ILoginData) => authApi().post(data),
  });
