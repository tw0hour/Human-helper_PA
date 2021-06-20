import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
} from "sequelize";

export interface donationProps {
    id:number;
    amountGiven?:number;
    date?:string;
    association_id?:number;
    volunteer_id?:number;
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
        amountGiven:{
            type:DataTypes.BIGINT
        },
        date :{
            type:DataTypes.STRING
        },
        association_id:{
            type:DataTypes.BIGINT
        },
        volunteer_id:{
            type:DataTypes.BIGINT
        }
    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}
