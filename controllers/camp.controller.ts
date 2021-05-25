import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {CampCreationProps, CampInstance} from "../models/camp";


export interface CampUpdateOption {
    id:string;
    nbPeople?:number;
    city?:string;
    address?:string;
    postalCode?: number;
    association_id?:number | null;
    planning_camp_id?:number | null;
}

export class CampController {

    Camp: ModelCtor<CampInstance>;

    private static instance: CampController;

    public static async getInstance(): Promise<CampController> {
        if(CampController.instance == undefined) {
            const {Camp} = await SequelizeManager.getInstance();
            CampController.instance = new CampController(Camp);
        }
        return  CampController.instance;
    }

    constructor(Camp: ModelCtor<CampInstance>) {
        this.Camp = Camp;
    }


    public async getAll(limit?: number, offset?: number): Promise<CampInstance[] | null>{
        return await this.Camp.findAll({
            limit,
            offset
        });
    }


    public async add(props: CampCreationProps): Promise<CampInstance | null> {
        return await this.Camp.create({
            ...props
        });
    }


    public async getById(id: string): Promise<CampInstance | null> {
        return await this.Camp.findOne({
            where :{
                id: id
            }
        });
    }


    public async update(options: CampUpdateOption): Promise<CampInstance | null> {

        const campUpdate = await this.getById(options.id.toString());

        if(campUpdate === null)
        {
            return null;
        }
        else
        {
            return await campUpdate.update({
                ...options
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }


    public async removeById (id: string):Promise<Boolean> {
        const campDelete = await this.getById(id);
        if(campDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Camp.destroy({
                    where:{
                        id: campDelete.id
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
