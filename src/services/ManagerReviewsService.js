import { baseService } from "./baseService";

export class ManagerReviewsService extends baseService {
    constructor() {
        super();
    }

    createReview = (roomId, content) => {
        return this.post(`api/reviews?roomId=${roomId}`, content);
    }

    getReviewListByRoomId = (roomId) => {
        return this.get(`api/reviews/byRoom?roomId=${roomId}`);
    }

    deleteReview = (userId) => {
        return this.delete(`api/reviews/${userId}`)
    }

    getReviewInfoByUserId = (userId) => {
        return this.get(`api/reviews/${userId}`)
    }


}

export const managerReviewsService = new ManagerReviewsService();
