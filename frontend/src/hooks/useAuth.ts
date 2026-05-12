import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/errors";


export const useAuth = () => {
  const loginAction = useAuthStore(s => s.login);

  const loginMutation = useMutation({
    mutationFn: loginAction,
    onSuccess: () => {},
    onError: (error: unknown) => {
      toast.error("Неверные данные", {
        description: getErrorMessage(error, "Ошибка входа"),
      });
    }
  });

  return {
    signIn: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending
  };
};