import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
} from "sequelize";
import {PlanningCampInstance} from "./planningCamp";
import {AssociationInstance} from "./association";


export interface CampProps{
    id:number;
    nbPeople:number;
    city:string;
    address:string;
    postalCode: number;
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
        nbPeople:{
            type:DataTypes.BIGINT
        },
        city:{
            type:DataTypes.STRING
        },
        address:{
            type:DataTypes.STRING
        },
        postalCode:{
            type:DataTypes.INTEGER
        }
    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
