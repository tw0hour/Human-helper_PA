import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor, HasManyGetAssociationsMixin, HasManySetAssociationsMixin,
} from "sequelize";
import {ClothInstance} from "./cloth";

export interface TypeClothProps {
    id:number;
    type:string;
}

export interface TypeClothCreationProps extends Optional<TypeClothProps, "id">{}

export interface TypeClothInstance extends Model<TypeClothProps,TypeClothCreationProps>,TypeClothProps{
    getCloth: HasManyGetAssociationsMixin<ClothInstance>;
    setCloth: HasManySetAssociationsMixin<ClothInstance, "id">;
}

export default function(sequelize:Sequelize): ModelCtor<TypeClothInstance>{
    return sequelize.define<TypeClothInstance>("typeCloth",{
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
