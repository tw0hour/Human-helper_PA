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

export interface DonationCreationProps extends Optional<donationProps, "id">{}

export interface DonationInstance extends Model<donationProps,DonationCreationProps>,donationProps{

}

export default function(sequelize:Sequelize): ModelCtor<DonationInstance>{
    return sequelize.define<DonationInstance>("donation",{
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