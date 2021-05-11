import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor
} from "sequelize";

export interface TypeFoodProps{
    id:number;
    type:string;
}
export interface TypeFoodCreationProps extends Optional<TypeFoodProps, "id">{}

export interface TypeFoodInstance extends Model<TypeFoodProps,TypeFoodCreationProps>,TypeFoodProps{

}
export default function(sequelize:Sequelize): ModelCtor<TypeFoodInstance>{
    return sequelize.define<TypeFoodInstance>("type_food",{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        type:{
            type:DataTypes.STRING
        }

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}