import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
} from "sequelize";

export interface Gender_clothProps {
    id:number;
    type:string;
}

export interface Gender_clothCreationProps extends Optional<Gender_clothProps, "id">{}

export interface Gender_clothInstance extends Model<Gender_clothProps,Gender_clothCreationProps>,Gender_clothProps{

}

export default function(sequelize:Sequelize): ModelCtor<Gender_clothInstance>{
    return sequelize.define<Gender_clothInstance>("gender_cloth",{
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