import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
} from "sequelize";

export interface donationProps {
    id:number;
    amount_given:number;
    date:string;
}

export interface donationCreationProps extends Optional<donationProps, "id">{}

export interface donationInstance extends Model<donationProps,donationCreationProps>,donationProps{

}

export default function(sequelize:Sequelize): ModelCtor<donationInstance>{
    return sequelize.define<donationInstance>("donation",{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        amount_given:{
            type:DataTypes.BIGINT
        },

        date :{
            type:DataTypes.STRING
        }

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}