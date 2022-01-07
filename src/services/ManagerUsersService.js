import { baseService } from "./baseService";

export class ManagerUsersService extends baseService {
    constructor() {
        super();
    }

    login = (data) => {
        return this.post(`api/auth/login`, data);
    }

    register = (data) => {
        return this.post(`api/auth/register`, data);
    }

    createUser = (user) => {
        return this.post("api/users", user);
    }

    getUserInfoById = (userId) => {
        return this.get(`api/users/${userId}`);
    }

    getUserListByPagination = (pagination) => {
        let { current, pageSize } = pagination;
        return this.get(`api/rooms?skip=${current}&limit=${pageSize}`);
    }

    deleteUser = (userId) => {
        return this.delete(`api/users/${userId}`);
    }

    updateUserInfo = (userId, userUpdate) => {
        return this.put(`api/users/${userId}`, userUpdate);
    }

    updateUserInfoAvatar = (avatar) => {
        return this.post(`api/users/upload-avatar`, avatar);
    }

    getAllUser = () => {
        return this.get(`api/users/pagination`)
    }
}

export const managerUsersService = new ManagerUsersService();
