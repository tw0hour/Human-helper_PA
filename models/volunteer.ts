import {
    Sequelize,
    Optional,
    Model,
    DataTypes,
    ModelCtor,
} from "sequelize";

export interface VolunteerProps {
    id:number;
    name:string;
    mail:string;
    password:string;
    type:string;
}

export interface VolunteerCreationProps extends Optional<VolunteerProps, "id">{}

export interface VolunteerInstance extends Model<VolunteerProps,VolunteerCreationProps>,VolunteerProps{

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
