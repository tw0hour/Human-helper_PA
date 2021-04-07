import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
} from "sequelize";

export interface gender_clothProps{
    id:number;
    name:string;
}

export interface gender_clothCreationProps extends Optional<gender_clothProps, "id">{}

export interface gender_clothInstance extends Model<gender_clothProps,gender_clothCreationProps>,gender_clothProps{

}

export default function(sequelize:Sequelize): ModelCtor<gender_clothInstance>{
    return sequelize.define<gender_clothInstance>("gender_cloth",{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING
        }

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}