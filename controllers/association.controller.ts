import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {AssociationCreationProps, AssociationInstance} from "../models/association";
import {VolunteerInstance} from "../models/volunteer";


export interface AssociationUpdateOption {
    id:string;
    name?:string;
    mail?: string;
    password?:string;
    money?: number;
}

export class AssociationController {

    Association: ModelCtor<AssociationInstance>;

    private static instance: AssociationController;

    public static async getInstance(): Promise<AssociationController> {
        if(AssociationController.instance == undefined) {
            const {Association} = await SequelizeManager.getInstance();
            AssociationController.instance = new AssociationController(Association);
        }
        return  AssociationController.instance;
    }

    constructor(Association: ModelCtor<AssociationInstance>) {
        this.Association = Association;
    }

    public async getAll(limit?: number, offset?: number): Promise<AssociationInstance[] | null>{
        return await this.Association.findAll({
            limit,
            offset
        });
    }

    public async add(props: AssociationCreationProps): Promise<AssociationInstance | null> {
        return await this.Association.create({
            ...props
        });
    }

    public async connection(name: string, password: string):Promise<AssociationInstance | null> {
        return await this.Association.findOne({where: {
                name,
                password
            }});
    }

    public async getById(id: string): Promise<AssociationInstance | null> {
        return await this.Association.findOne({
            where :{
                id: id
            }
        });
    }
    public async getByName(name: string): Promise<AssociationInstance | null> {
        return await this.Association.findOne({
            where :{
                name: name
            }
        });
    }


    public async update(options: AssociationUpdateOption): Promise<AssociationInstance | null> {

        const associationUpdate = await this.getById(options.id);

        if(associationUpdate === null)
        {
            return null;
        }
        else
        {
            return await associationUpdate.update({
                ...options
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeById (id: string):Promise<Boolean> {
        const associationDelete = await this.getById(id);
        if(associationDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Association.destroy({
                    where:{
                        id: associationDelete.id
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
