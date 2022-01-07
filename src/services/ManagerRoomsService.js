import { baseService } from "./baseService";

export class ManagerRoomsService extends baseService {
    constructor() {
        super();
    }

    createRoom = (data) => {
        return this.post(`api/rooms`, data);
    }

    getRoomListByPagination = (pagination) => {
        let { current, pageSize } = pagination;
        return this.get(`api/rooms?skip=${current}&limit=${pageSize}`);
    }

    getRoomListByLocation = (data) => {
        return this.get(`api/rooms`, data);
    }

    getRoomInfo = (roomId) => {
        return this.get(`api/rooms/${roomId}`);
    }

    updateRoomInfo = (roomId, data) => {
        return this.put(`api/rooms/${roomId}`, data);
    }

    deleteRoom = (roomId) => {
        return this.delete(`api/rooms/${roomId}`);
    }

    bookingRoom = (roomId) => {
        return this.post(`api/rooms/booking/${roomId}`);
    }

    updateRoomAvatar = (roomId, data) => {
        return this.post(`api/rooms/upload-image/${roomId}`, data);
    }

    getAllRoom = () => {
        return this.get(`api/rooms`);
    }



}

export const managerRoomsService = new ManagerRoomsService();
