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
    typeFoods:string;
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
        typeFoods:{
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
