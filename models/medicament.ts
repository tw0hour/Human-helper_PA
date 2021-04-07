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

export interface MedicamentProps{
    id:number;
    name:string;
    expirationDate: string;
}

export interface MedicamentCreationProps extends Optional<MedicamentProps, "id">{}

export interface MedicamentInstance extends Model<MedicamentProps,MedicamentCreationProps>,MedicamentProps{
    getDelivery: HasOneGetAssociationMixin<DeliveryInstance>;
    setDelivery: HasOneSetAssociationMixin<DeliveryInstance, "id">;

    getVolonteer: HasOneGetAssociationMixin<DeliveryInstance>;
    setVolonteer: HasOneSetAssociationMixin<DeliveryInstance, "id">;
}

export default function(sequelize:Sequelize): ModelCtor<MedicamentInstance>{
    return sequelize.define<MedicamentInstance>("Medicament",{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING
        },
        expirationDate:{
            type:DataTypes.DATE
        },

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}