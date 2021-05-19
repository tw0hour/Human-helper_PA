import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin
} from "sequelize";
import {CampInstance} from "./camp";


export interface PlanningCampProps {
    id: number;
    day: number;
    time_slots: string;
}

export interface PlanningCampCreationProps extends Optional<PlanningCampProps, "id"> {}

export interface PlanningCampInstance extends Model<PlanningCampProps,PlanningCampCreationProps>,PlanningCampProps{
    getCamp: HasOneGetAssociationMixin<CampInstance>;
    setCamp: HasOneSetAssociationMixin<CampInstance, "id">;

}
export default function(sequelize:Sequelize):ModelCtor<PlanningCampInstance>{
    return sequelize.define<PlanningCampInstance>("planningCamp",{
        id:{
            type:DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
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
