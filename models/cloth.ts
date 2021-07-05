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
    volunteer_id:number;
    type_cloth_id:number;
    gender_cloth_id:number;
    delivery_id:number | null;
    association_id?:number;
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
        volunteer_id:{
            type:DataTypes.BIGINT
        },
        type_cloth_id:{
            type:DataTypes.BIGINT
        },
        gender_cloth_id:{
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
