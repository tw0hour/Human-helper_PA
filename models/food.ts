import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
} from "sequelize";

export interface FoodProps{
    id:number;
    name:string;
    expirationDate:string;
    volunteer_id:number | null;
    type_food_id:number;
    delivery_id:number | null;
    association_id?:number;
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
        expirationDate:{
            type:DataTypes.STRING
        },
        volunteer_id: {
            type:DataTypes.BIGINT
        },
        type_food_id: {
            type:DataTypes.BIGINT
        },
        delivery_id:{
            type:DataTypes.BIGINT
        },
        association_id:{
            type:DataTypes.BIGINT
        }

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
