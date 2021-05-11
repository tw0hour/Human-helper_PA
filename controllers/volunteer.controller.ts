import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {VolunteerCreationProps, VolunteerInstance} from "../models/volunteer";


export interface VolunteerUpdateOption {
    id:string;
    name:string;
    mail:string;
    password:string;
    type:string;
}

export class VolunteerController {

    Volunteer: ModelCtor<VolunteerInstance>;

    private static instance: VolunteerController;

    public static async getInstance(): Promise<VolunteerController> {
        if(VolunteerController.instance == undefined) {
            const {Volunteer} = await SequelizeManager.getInstance();
            VolunteerController.instance = new VolunteerController(Volunteer);
        }
        return VolunteerController.instance;
    }

    constructor(Volunteer: ModelCtor<VolunteerInstance>) {
        this.Volunteer = Volunteer;
    }

    public async getAll(limit?: number, offset?: number): Promise<VolunteerInstance[] | null>{
        return await this.Volunteer.findAll({
            limit,
            offset
        });
    }

    public async add(props: VolunteerCreationProps): Promise<VolunteerInstance | null> {
        return await this.Volunteer.create({
            ...props
        });
    }

    public async getById(id: string): Promise<VolunteerInstance | null> {
        return await this.Volunteer.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: VolunteerUpdateOption): Promise<VolunteerInstance | null> {

        const VolunteerUpdate = await this.getById(options.id.toString());

        if(VolunteerUpdate === null)
        {
            return null;
        }
        else
        {
            return await VolunteerUpdate.update({
                ...options
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeById (id: string):Promise<Boolean> {
        const VolunteerDelete = await this.getById(id);
        if(VolunteerDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Volunteer.destroy({
                    where:{
                        id: VolunteerDelete.id
                    }
                });
                return true;
            }
            catch (err)
            {
                console.error(err);
                return false;
            }
        }
    }
}
