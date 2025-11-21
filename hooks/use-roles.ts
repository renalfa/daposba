import {
    getRoles,
    getUserRole,
    UserRoleResponse,
    RoleListResponse,
    updateUserRole,
    UpdateUserRoleInput,
} from "@/lib/services/role";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";

export function useRoles() {
    return useQuery<RoleListResponse, Error>({
        queryKey: ["roles"],
        queryFn: () => getRoles(),
    });
}

export function useUserRole(userId: number | string) {
    return useQuery<UserRoleResponse, Error>({
        queryKey: ["user-role", userId],
        queryFn: () => {
            if (!userId) {
                throw new Error("No user id");
            }
            return getUserRole(userId);
        },
        enabled: !!userId,
    });
}

type UpdateUserRoleVars = {
    userId: number | string;
    data: UpdateUserRoleInput;
};

export function useUpdateUserRole() {
    const queryClient = useQueryClient();

    return useMutation<UserRoleResponse, Error, UpdateUserRoleVars>({
        mutationKey: ["update-user-role"],
        mutationFn: ({userId, data}) => updateUserRole(userId, data),
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ["user-role", res.user_id],
            });

            queryClient.invalidateQueries({queryKey: ["users"]});
        },
    });
}
