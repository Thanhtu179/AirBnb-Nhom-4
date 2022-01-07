import { baseService } from "./baseService";

export class ManagerLocationService extends baseService {
    constructor() {
        super();
    }

    createLocation = (location) => {
        return this.post('api/locations', location);
    }

    deleteLocation = (locationId) => {
        return this.delete(`api/locations/${locationId}`);
    }

    getLocationList = (data) => {
        return this.get('api/locations', data);
    }

    getLocationInfo = (locationId) => {
        return this.get(`api/locations/${locationId}`);
    }

    updateLocationInfo = (locationId, data) => {
        return this.put(`api/locations/${locationId}`, data);
    }

    updateLocationInfoAvatart = (locationId, data) => {
        return this.put(`api/locations/upload-images/${locationId}`, data);
    }

    getLocationListByValueate = (valueate) => {
        return this.get(`api/locations/by-valueate?valueate=${valueate}`);
    }

    getAllLocations = () => {
        return this.get(`api/locations`);
    }



}

export const managerLocationService = new ManagerLocationService();
