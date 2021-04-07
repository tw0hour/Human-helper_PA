import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    BelongsToSetAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    BelongsToGetAssociationMixin,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    BelongsToMany,
    BelongsToManyGetAssociationsMixin,
    BelongsToManySetAssociationsMixin,
    HasManySetAssociationsMixin
} from "sequelize";
import {CampInstance} from "./camp";


export interface Planning_campProps{
    id: number;
    day: number;
    time_slots: string;
}

export interface Planning_campCreationProps extends Optional<Planning_campProps, "id"> {}

export interface Planning_campInstance extends Model<Planning_campProps,Planning_campCreationProps>,Planning_campProps{
    getCamp: HasOneGetAssociationMixin<CampInstance>;
    setCamp: HasOneSetAssociationMixin<CampInstance, "id">;


}
export default function(sequelize:Sequelize):ModelCtor<Planning_campInstance>{
    return sequelize.define<Planning_campInstance>("Planning_camp",{
        id:{
            type:DataTypes.BIGINT
        },
        day:{
            type:DataTypes.BIGINT
        },
        time_slots:{
            type:DataTypes.STRING
        }
    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
