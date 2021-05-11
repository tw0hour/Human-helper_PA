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
import {PlanningCampInstance} from "./planningCamp";
import {AssociationInstance} from "./association";


export interface CampProps{
    id:number;
    nb_people:number;
    city:string;
    address:string;
    postal_code: number;
}

export interface CampCreationProps extends Optional<CampProps, "id"> {}

export interface CampInstance extends Model<CampProps,CampCreationProps>,CampProps{
    getPlanningCamp: HasOneGetAssociationMixin<PlanningCampInstance>;
    setPlanningCamp : HasOneSetAssociationMixin<PlanningCampInstance, "id">;

    getAssociation: HasOneGetAssociationMixin<AssociationInstance>;
    setAssociation: HasOneSetAssociationMixin<AssociationInstance, "id">
    
    
}
export default function(sequelize:Sequelize):ModelCtor<CampInstance>{
    return sequelize.define<CampInstance>("camp",{
        id:{
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        nb_people:{
            type:DataTypes.BIGINT
        },
        city:{
            type:DataTypes.STRING
        },
        address:{
            type:DataTypes.STRING
        },
        postal_code:{
            type:DataTypes.INTEGER
        }
    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
