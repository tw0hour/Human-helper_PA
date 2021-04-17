import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
} from "sequelize";

export interface ClothProps {
    id:number;
    name:string;
    size:number;
    type_cloth:string;
    gender:string;
}

export interface ClothCreationProps extends Optional<ClothProps, "id">{}

export interface ClothInstance extends Model<ClothProps,ClothCreationProps>,ClothProps{

}

export default function(sequelize:Sequelize): ModelCtor<ClothInstance>{
    return sequelize.define<ClothInstance>("cloth",{
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