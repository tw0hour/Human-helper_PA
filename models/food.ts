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
    HasOneSetAssociationMixin
} from "sequelize";

export interface FoodProps{
    id:number;
    name:string;
    type_food:string;
    expirationDate:string;
}
export interface FoodCreationProps extends Optional<FoodProps, "id">{}

export interface FoodInstance extends Model<FoodProps,FoodCreationProps>,FoodProps{

}
export default function(sequelize:Sequelize): ModelCtor<FoodInstance>{
    return sequelize.define<FoodInstance>("food",{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING
        },
        type_food:{
            type:DataTypes.STRING
        },
        expirationDate:{
            type:DataTypes.STRING
        }

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
