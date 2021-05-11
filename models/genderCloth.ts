import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
} from "sequelize";

export interface GenderClothProps {
    id:number;
    type:string;
}

export interface GenderClothCreationProps extends Optional<GenderClothProps, "id">{}

export interface GenderClothInstance extends Model<GenderClothProps,GenderClothCreationProps>,GenderClothProps{

}

export default function(sequelize:Sequelize): ModelCtor<GenderClothInstance>{
    return sequelize.define<GenderClothInstance>("genderCloth",{
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
