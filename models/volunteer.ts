import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor, HasManySetAssociationsMixin, HasManyGetAssociationsMixin,
} from "sequelize";
import {ClothInstance} from "./cloth";
import {MedicamentInstance} from "./medicament";
import {FoodInstance} from "./food";
import {DonationInstance} from "./donation";

export interface VolunteerProps {
    id:number;
    name:string;
    mail:string;
    password:string;
    type:string;
}

export interface VolunteerCreationProps extends Optional<VolunteerProps, "id">{}

export interface VolunteerInstance extends Model<VolunteerProps,VolunteerCreationProps>,VolunteerProps{
    getCloth: HasManyGetAssociationsMixin<ClothInstance>;
    setCloth: HasManySetAssociationsMixin<ClothInstance, "id">;

    getMedicament : HasManyGetAssociationsMixin<MedicamentInstance>;
    setMedicament : HasManySetAssociationsMixin<MedicamentInstance, "id">;

    getFood: HasManyGetAssociationsMixin<FoodInstance>;
    setFood: HasManySetAssociationsMixin<FoodInstance, "id">;

    getDonation: HasManyGetAssociationsMixin<DonationInstance>;
    setDonation: HasManySetAssociationsMixin<DonationInstance, "id">;
}

export default function(sequelize:Sequelize): ModelCtor<VolunteerInstance>{
    return sequelize.define<VolunteerInstance>("volunteer",{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING
        },
        mail:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        },
        type:{
            type:DataTypes.STRING
        },

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
