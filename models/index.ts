import {ModelCtor, Sequelize} from "sequelize";
import campCreator,{ CampInstance} from "./camp";
import associationCreator, {AssociationInstance} from "./association";
import clothCreator,{ClothInstance} from "./cloth";
import deliveryCreator,{DeliveryInstance} from "./Delivery";
import donationCreator, {DonationInstance} from "./donation";
import foodCreator,{FoodInstance} from "./Food";
import gender_clothCreator, {Gender_clothInstance} from "./gender_cloth";
import givenCreator,{GivenInstance} from "./given";
import medicamentCreator,{MedicamentInstance} from "./medicament";
import planning_campCreator, {Planning_campInstance} from "./planning_camp";
import type_clothCreator,{Type_clothInstance} from "./type_cloth";
import volunteerCreator,{VolunteerInstance} from "./volunteer";

export interface SequelizeManagerProps{
    sequelize:Sequelize;
    Association:ModelCtor<AssociationInstance>;
    Camp:ModelCtor<CampInstance>;
    Cloth:ModelCtor<ClothInstance>;
    Delivery:ModelCtor<DeliveryInstance>;
    Donation:ModelCtor<DonationInstance>;
    Food:ModelCtor<FoodInstance>;
    Gender_cloth:ModelCtor<Gender_clothInstance>;
    Given:ModelCtor<GivenInstance>;
    Medicament:ModelCtor<MedicamentInstance>;
    Planning_camp:ModelCtor<Planning_campInstance>;
    Type_cloth:ModelCtor<Type_clothInstance>;
    Volunteer:ModelCtor<VolunteerInstance>;
}

export class SequelizeManager implements SequelizeManagerProps{

    private static instance?:SequelizeManager;

    Association: ModelCtor<AssociationInstance>;
    Camp: ModelCtor<CampInstance>;
    Cloth: ModelCtor<ClothInstance>;
    Delivery: ModelCtor<DeliveryInstance>;
    Donation: ModelCtor<DonationInstance>;
    Food: ModelCtor<FoodInstance>;
    Gender_cloth: ModelCtor<Gender_clothInstance>;
    Given: ModelCtor<GivenInstance>;
    Medicament: ModelCtor<MedicamentInstance>;
    Planning_camp: ModelCtor<Planning_campInstance>;
    Type_cloth: ModelCtor<Type_clothInstance>;
    Volunteer: ModelCtor<VolunteerInstance>;
    sequelize: Sequelize;

    public static async getInstance():Promise<SequelizeManager>{
        if(SequelizeManager.instance === undefined){
            SequelizeManager.instance = await SequelizeManager.initialize();
        }
        return SequelizeManager.instance;
    }

    private static async initialize():Promise<SequelizeManager>{
        const sequelize = new Sequelize({
           dialect:'mysql',
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            port: Number.parseInt(process.env.DB_PORT as string)
        });
        await sequelize.authenticate();
        const managersProps: SequelizeManagerProps = {
            sequelize,
            Association: associationCreator(sequelize),
            Camp: campCreator(sequelize),
            Cloth: clothCreator(sequelize),
            Delivery: deliveryCreator(sequelize),
            Donation: donationCreator(sequelize),
            Food: foodCreator(sequelize),
            Gender_cloth: gender_clothCreator(sequelize),
            Given: givenCreator(sequelize),
            Medicament: medicamentCreator(sequelize),
            Planning_camp: planning_campCreator(sequelize),
            Type_cloth: type_clothCreator(sequelize),
            Volunteer: volunteerCreator(sequelize),
        }
        SequelizeManager.associate(managersProps);
        await sequelize.sync();
        return new SequelizeManager(managersProps);
    }

    private static associate(props: SequelizeManagerProps): void {

    }

    constructor(props:SequelizeManagerProps) {
        this.Association = props.Association;
        this.Camp = props.Camp;
        this.Cloth = props.Cloth;
        this.Delivery = props.Delivery;
        this.Donation = props.Donation;
        this.Food = props.Food;
        this.Gender_cloth = props.Gender_cloth;
        this.Given = props.Given;
        this.Medicament = props.Medicament;
        this.Planning_camp = props.Planning_camp;
        this.Type_cloth = props.Type_cloth;
        this.Volunteer = props.Volunteer;
        this.sequelize = props.sequelize;
    }
}
