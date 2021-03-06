import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToSetAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    BelongsToGetAssociationMixin,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    BelongsToMany,
    BelongsToManyGetAssociationsMixin,
    BelongsToManySetAssociationsMixin,
    HasManySetAssociationsMixin
} from "sequelize";
import {CampInstance} from "./camp";
import {DonationInstance} from "./donation";
import { ClothInstance } from "./cloth";
import { FoodInstance } from "./food";
import { MedicamentInstance } from "./medicament";


export interface AssociationProps{
    id:number;
    name:string;
    mail: string;
    password:string;
    money: number;
}

export interface AssociationCreationProps extends Optional<AssociationProps, "id"> {}

export interface AssociationInstance extends Model<AssociationProps,AssociationCreationProps>,AssociationProps{
    getGiven: HasManyGetAssociationsMixin<CampInstance>;
    setGiven: HasManySetAssociationsMixin<CampInstance, "id">;

    getDonation: HasManyGetAssociationsMixin<DonationInstance>;
    setDonation: HasManySetAssociationsMixin<DonationInstance, "id">

    getCloth: HasManyGetAssociationsMixin<ClothInstance>;
    setCloth: HasManySetAssociationsMixin<ClothInstance, "id">

    getFood: HasManyGetAssociationsMixin<FoodInstance>;
    setFood: HasManySetAssociationsMixin<FoodInstance, "id">

    getMedicament: HasManyGetAssociationsMixin<MedicamentInstance>;
    setMedicament: HasManySetAssociationsMixin<MedicamentInstance, "id">

}
export default function(sequelize:Sequelize):ModelCtor<AssociationInstance>{
    return sequelize.define<AssociationInstance>("association",{
        id:{
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
        money:{
            type:DataTypes.BIGINT
        }
    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
