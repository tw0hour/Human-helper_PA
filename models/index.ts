import { Association, ModelCtor, Sequelize } from "sequelize";
import campCreator,{ CampInstance} from "./camp";
import associationCreator, {AssociationInstance} from "./association";
import clothCreator,{ClothInstance} from "./cloth";
import deliveryCreator,{DeliveryInstance} from "./delivery";
import donationCreator, {DonationInstance} from "./donation";
import foodCreator,{FoodInstance} from "./food";
import typeFoodCreator,{TypeFoodInstance} from "./typeFood";
import genderClothCreator, {GenderClothInstance} from "./genderCloth";
import medicamentCreator,{MedicamentInstance} from "./medicament";
import planningCampCreator, {PlanningCampInstance} from "./planningCamp";
import typeClothCreator,{TypeClothInstance} from "./typeCloth";
import volunteerCreator,{VolunteerInstance} from "./volunteer";

export interface SequelizeManagerProps{
    sequelize:Sequelize;
    Association:ModelCtor<AssociationInstance>;
    Camp:ModelCtor<CampInstance>;
    Cloth:ModelCtor<ClothInstance>;
    Delivery:ModelCtor<DeliveryInstance>;
    Donation:ModelCtor<DonationInstance>;
    Food:ModelCtor<FoodInstance>;
    TypeFood: ModelCtor<TypeFoodInstance>;
    GenderCloth:ModelCtor<GenderClothInstance>;
    Medicament:ModelCtor<MedicamentInstance>;
    PlanningCamp:ModelCtor<PlanningCampInstance>;
    TypeCloth:ModelCtor<TypeClothInstance>;
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
    TypeFood: ModelCtor<TypeFoodInstance>;
    GenderCloth: ModelCtor<GenderClothInstance>;
    Medicament: ModelCtor<MedicamentInstance>;
    PlanningCamp: ModelCtor<PlanningCampInstance>;
    TypeCloth: ModelCtor<TypeClothInstance>;
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
            TypeFood: typeFoodCreator(sequelize),
            GenderCloth: genderClothCreator(sequelize),
            Medicament: medicamentCreator(sequelize),
            PlanningCamp: planningCampCreator(sequelize),
            TypeCloth: typeClothCreator(sequelize),
            Volunteer: volunteerCreator(sequelize),
        }
        SequelizeManager.associate(managersProps);
        await sequelize.sync();
        return new SequelizeManager(managersProps);
    }

    private static associate(props: SequelizeManagerProps): void {
        props.Association.hasMany(props.Camp);
        props.Association.hasMany(props.Donation);

        props.Volunteer.hasMany(props.Donation);
        props.Volunteer.hasMany(props.Food);
        props.Volunteer.hasMany(props.Medicament);
        props.Volunteer.hasMany(props.Cloth);

        props.Food.belongsTo(props.Volunteer);
        props.Food.belongsTo(props.TypeFood);
        props.Food.belongsTo(props.Delivery);

        props.TypeFood.hasMany(props.Food);

        props.Medicament.belongsTo(props.Volunteer);
        props.Medicament.belongsTo(props.Delivery);

        props.Cloth.belongsTo(props.TypeCloth);
        props.Cloth.belongsTo(props.Volunteer);
        props.Cloth.belongsTo(props.GenderCloth);
        props.Cloth.belongsTo(props.Delivery);

        props.TypeCloth.hasMany(props.Cloth);

        props.GenderCloth.hasMany(props.Cloth);

        props.Delivery.hasMany(props.Food);
        props.Delivery.hasMany(props.Medicament);
        props.Delivery.hasMany(props.Cloth);
        props.Delivery.belongsTo(props.Camp);

        props.Camp.belongsTo(props.PlanningCamp);
        props.Camp.belongsTo(props.Association);
        props.Camp.hasMany(props.Delivery);

    }

    constructor(props:SequelizeManagerProps) {
        this.Association = props.Association;
        this.Camp = props.Camp;
        this.Cloth = props.Cloth;
        this.Delivery = props.Delivery;
        this.Donation = props.Donation;
        this.Food = props.Food;
        this.TypeFood = props.TypeFood;
        this.GenderCloth = props.GenderCloth;
        this.Medicament = props.Medicament;
        this.PlanningCamp = props.PlanningCamp;
        this.TypeCloth = props.TypeCloth;
        this.Volunteer = props.Volunteer;
        this.sequelize = props.sequelize;
    }
}
