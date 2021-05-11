import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {Planning_campCreationProps, Planning_campInstance} from "../models/planningCamp";


export interface Planning_campUpdateOption {
    id: string;
    day?: number;
    time_slots?: string;
}

export class Planning_campController {

    Planning_camp: ModelCtor<Planning_campInstance>;

    private static instance: Planning_campController;

    public static async getInstance(): Promise<Planning_campController> {
        if(Planning_campController.instance == undefined) {
            const {Planning_camp} = await SequelizeManager.getInstance();
            Planning_campController.instance = new Planning_campController(Planning_camp);
        }
        return Planning_campController.instance;
    }

    constructor(Planning_camp: ModelCtor<Planning_campInstance>) {
        this.Planning_camp = Planning_camp;
    }

    public async getAll(limit?: number, offset?: number): Promise<Planning_campInstance[] | null>{
        return await this.Planning_camp.findAll({
            limit,
            offset
        });
    }

    public async add(props: Planning_campCreationProps): Promise<Planning_campInstance | null> {
        return await this.Planning_camp.create({
            ...props
        });
    }

    public async getById(id: string): Promise<Planning_campInstance | null> {
        return await this.Planning_camp.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: Planning_campUpdateOption): Promise<Planning_campInstance | null> {

        const planning_campUpdate = await this.getById(options.id.toString());

        if(planning_campUpdate === null)
        {
            return null;
        }
        else
        {
            return await planning_campUpdate.update({
                ...options
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeById (id: string):Promise<Boolean> {
        const planning_campDelete = await this.getById(id);
        if(planning_campDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Planning_camp.destroy({
                    where:{
                        id: planning_campDelete.id
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
