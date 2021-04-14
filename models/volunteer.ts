import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
} from "sequelize";

export interface volunteerProps{
    id:number;
    name:string;
    mail:string;
    password:string;
    type:string;
}

export interface VolunteerCreationProps extends Optional<volunteerProps, "id">{}

export interface VolunteerInstance extends Model<volunteerProps,VolunteerCreationProps>,volunteerProps{

}

export default function(sequelize:Sequelize): ModelCtor<VolunteerInstance>{
    return sequelize.define<VolunteerInstance>("volunteer",{
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name:{
            type:DataTypes.STRING
        },
        mail:{
            type:DataTypes.STRING
        },
        password:{
            type:DataTypes.STRING
        },
        type:{
            type:DataTypes.STRING
        },

    },{
        freezeTableName: true,
        underscored: true,
        paranoid: true,
        timestamps: true
    });
}