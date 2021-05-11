import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {PlanningCampCreationProps, PlanningCampInstance} from "../models/planningCamp";


export interface PlanningCampUpdateOption {
    id: string;
    day?: number;
    time_slots?: string;
}

export class PlanningCampController {

    Planning_camp: ModelCtor<PlanningCampInstance>;

    private static instance: PlanningCampController;

    public static async getInstance(): Promise<PlanningCampController> {
        if(PlanningCampController.instance == undefined) {
            const {PlanningCamp} = await SequelizeManager.getInstance();
            PlanningCampController.instance = new PlanningCampController(PlanningCamp);
        }
        return PlanningCampController.instance;
    }

    constructor(Planning_camp: ModelCtor<PlanningCampInstance>) {
        this.Planning_camp = Planning_camp;
    }

    public async getAll(limit?: number, offset?: number): Promise<PlanningCampInstance[] | null>{
        return await this.Planning_camp.findAll({
            limit,
            offset
        });
    }

    public async add(props: PlanningCampCreationProps): Promise<PlanningCampInstance | null> {
        return await this.Planning_camp.create({
            ...props
        });
    }

    public async getById(id: string): Promise<PlanningCampInstance | null> {
        return await this.Planning_camp.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: PlanningCampUpdateOption): Promise<PlanningCampInstance | null> {

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
