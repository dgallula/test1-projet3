import axios from "axios";
import VacationModel from "../Models/VacationModel";
import { vacationsStore } from "../Redux/Store";
import { addVacationAction, deleteVacationAction, fetchFollowedVacationsAction, fetchVacationsAction, updateVacationAction } from "../Redux/VacationsState";
import config from "../Utils/Config";


class VacationService {
    // Get all vacations from API
    public async getAllVacations(): Promise<VacationModel[]> {
            const response = await axios.get<VacationModel[]>(config.urls.vacations);
            const vacations = response.data;
            return vacations;
      
    }

    // Get all followed vacations:
    public async getAllFollowedVacations(): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(config.urls.followedVacations);
        const followedVacations = response.data;
        return followedVacations;
    }


    // Get one vacation from API
    public async getOneVacation(id: number): Promise<VacationModel> {
        const response = await axios.get<VacationModel>(config.urls.vacations + id);
        const vacation = response.data;
        vacationsStore.dispatch(addVacationAction(vacation));
        return vacation;
    }

    // Add vacation to API
    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        const myFromData = new FormData();
        myFromData.append("vacationDestination", vacation.vacationDestination);
        myFromData.append("vacationDescription", vacation.vacationDescription);
        myFromData.append("vacationPrice", vacation.vacationPrice.toString());
        myFromData.append("fromDate", vacation.fromDate.toString());
        myFromData.append("toDate", vacation.toDate.toString());
        myFromData.append("image", vacation.image.item(0));
        const response = await axios.post<VacationModel>(config.urls.vacations, myFromData);
        const addedVacation = response.data;
        vacationsStore.dispatch(addVacationAction(addedVacation));
        return addedVacation;
    }

    // Update vacation in API
    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        const myFromData = new FormData();
        myFromData.append("vacationDestination", vacation.vacationDestination);
        myFromData.append("vacationDescription", vacation.vacationDescription);
        myFromData.append("image", vacation.image.item(0));
        myFromData.append("vacationPrice", vacation.vacationPrice.toString());
        myFromData.append("fromDate", vacation.fromDate.toString());
        myFromData.append("toDate", vacation.toDate.toString());
        const response = await axios.patch<VacationModel>(config.urls.vacations + vacation.vacationId, myFromData);
        const updatedVacation = response.data;
        vacationsStore.dispatch(updateVacationAction(updatedVacation));
        return updatedVacation;
    }

    // Delete vacation from API
    public async deleteVacation(id: number): Promise<void> {
        await axios.delete(config.urls.vacations + id);
        vacationsStore.dispatch(deleteVacationAction(id));
    }
}

const vacationsService = new VacationService();

export default vacationsService;