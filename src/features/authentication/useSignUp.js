import { useMutation } from "@tanstack/react-query";
import { signUp as signUpAPI } from "../../services/apiAuth";
import toast from "react-hot-toast";
export function useSignUp() {
   const {mutate:signUp,isLoading:isSigningUp} = useMutation({
        mutationFn: signUpAPI,
        onSuccess:(user) => {
            console.log(user);
            toast.success("Account successfully created, Please verify your email");
        }
    });
    return {signUp,isSigningUp};
}