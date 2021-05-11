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
    HasOneSetAssociationMixin
} from "sequelize";

export interface DeliveryProps{
    id:number;
    status:string;
}
export interface DeliveryCreationProps extends Optional<DeliveryProps, "id">{}

export interface DeliveryInstance extends Model<DeliveryProps,DeliveryCreationProps>,DeliveryProps{

}
export default function(sequelize:Sequelize): ModelCtor<DeliveryInstance>{
    return sequelize.define<DeliveryInstance>("delivery",{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        status:{
            type:DataTypes.STRING
        }

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
