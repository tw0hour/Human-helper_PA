import {
    DataTypes, HasManyGetAssociationsMixin, HasManySetAssociationsMixin,
    HasOneGetAssociationMixin,
    HasOneSetAssociationMixin,
    Model,
    ModelCtor,
    Optional,
    Sequelize
} from "sequelize";
import {CampInstance} from "./camp";
import {VolunteerInstance} from "./volunteer";

export interface GivenProps {
    id: number
    money: number;
    date: string;
}

export  interface GivenCreationProps extends Optional<GivenProps, "id"> {}

export interface GivenInstance extends Model<GivenProps, GivenCreationProps>, GivenProps {
    getCamp: HasManyGetAssociationsMixin<CampInstance>;
    setCamp: HasManySetAssociationsMixin<CampInstance, "id">

    getVolonteer: HasManyGetAssociationsMixin<VolunteerInstance>;
    setVolonteer: HasManySetAssociationsMixin<VolunteerInstance, "id">
}

export default function (sequelize: Sequelize): ModelCtor<GivenInstance> {
    return sequelize.define<GivenInstance>("Given", {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        money: {
            type: DataTypes.STRING,
        },
        date: {
            type: DataTypes.DATE,
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}