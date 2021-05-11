import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
} from "sequelize";

export interface Type_clothProps {
    id:number;
    type:string;
}

export interface Type_clothCreationProps extends Optional<Type_clothProps, "id">{}

export interface Type_clothInstance extends Model<Type_clothProps,Type_clothCreationProps>,Type_clothProps{

}

export default function(sequelize:Sequelize): ModelCtor<Type_clothInstance>{
    return sequelize.define<Type_clothInstance>("type_cloth",{
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