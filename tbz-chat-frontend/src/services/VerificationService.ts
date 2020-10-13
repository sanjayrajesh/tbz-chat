import api from "./api";
import { UserResponse } from "./UserService";

export interface ActivateAccountRequest {
    username: string;
    password: string;
}

const activateAccount = (account: ActivateAccountRequest, token: string) => api.post<UserResponse>(`/verification/activate-account/${token}`, account);

const VerificationService = {
    activateAccount
}

export default VerificationService;