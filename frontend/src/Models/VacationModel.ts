class VacationModel {
    public vacationId: number;
    public vacationDestination: string;
    public vacationDescription: string;
    public followers: number;
    public vacationImage: string;   //Backend return imageName to Frontend
    public fromDate: string;
    public toDate: string;
    public vacationPrice: number;
    public image: FileList;
    public isFollowed: boolean;
}

export default VacationModel;