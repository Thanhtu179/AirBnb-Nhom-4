import { baseService } from "./baseService";

export class ManagerTicketsService extends baseService {
    constructor() {
        super();
    }

    layDanhSachVe = () => {
        return this.get(`api/tickets`);
    }

    layThongTinChiTietVe = (ticketId) => {
        return this.get(`api/tickets/${ticketId}`);
    }

    capNhatThongTinVe = (ticketId, data) => {
        return this.put(`api/tickets/${ticketId}`, data);
    }

    xoaVe = (ticketId) => {
        return this.delete(`api/tickets/${ticketId}`);
    }

    createTicket = () => {
        return this.post(`api/tickets`);
    }

    getTicketByUserId = (userId) => {
        return this.get(`api/tickets/by-user?userId=${userId}`);
    }

    getTicketByRoomId = (roomId) => {
        return this.get(`api/tickets/by-room?roomId=${roomId}`)
    }




}

export const managerTicketsService = new ManagerTicketsService();
