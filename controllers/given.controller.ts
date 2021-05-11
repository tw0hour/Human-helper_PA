import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {GivenCreationProps, GivenInstance} from "../models/given";


export interface GivenUpdateOption {
    id: string;
    money: number;
    date: string;
}

export class GivenController {

    Given: ModelCtor<GivenInstance>;

    private static instance: GivenController;

    public static async getInstance(): Promise<GivenController> {
        if(GivenController.instance == undefined) {
            const {Given} = await SequelizeManager.getInstance();
            GivenController.instance = new GivenController(Given);
        }
        return GivenController.instance;
    }

    constructor(Given: ModelCtor<GivenInstance>) {
        this.Given = Given;
    }

    public async getAll(limit?: number, offset?: number): Promise<GivenInstance[] | null>{
        return await this.Given.findAll({
            limit,
            offset
        });
    }

    public async add(props: GivenCreationProps): Promise<GivenInstance | null> {
        return await this.Given.create({
            ...props
        });
    }

    public async getById(id: string): Promise<GivenInstance | null> {
        return await this.Given.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: GivenUpdateOption): Promise<GivenInstance | null> {

        const givenUpdate = await this.getById(options.id.toString());

        if(givenUpdate === null)
        {
            return null;
        }
        else
        {
            return await givenUpdate.update({
                ...options
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeById (id: string):Promise<Boolean> {
        const givenDelete = await this.getById(id);
        if(givenDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Given.destroy({
                    where:{
                        id: givenDelete.id
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
