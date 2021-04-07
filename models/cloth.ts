import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
} from "sequelize";

export interface clothProps{
    id:number;
    name:string;
    size:number;
    type_cloth:string;
    gender:string;
}

export interface clothCreationProps extends Optional<clothProps, "id">{}

export interface clothInstance extends Model<clothProps,clothCreationProps>,clothProps{

}

export default function(sequelize:Sequelize): ModelCtor<clothInstance>{
    return sequelize.define<clothInstance>("cloth",{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING
        },
        size:{
            type:DataTypes.BIGINT
        },
        type_cloth:{
            type:DataTypes.STRING
        },
        gender:{
            type:DataTypes.STRING
        }

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}