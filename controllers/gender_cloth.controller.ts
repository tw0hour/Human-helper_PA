import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {Gender_clothCreationProps, Gender_clothInstance, Gender_clothProps} from "../models/gender_cloth";



export interface Gender_clothUpdateOption {
    id:string;
    type:string;
}

export class Gender_clothController {

    Gender_cloth: ModelCtor<Gender_clothInstance>;

    private static instance: Gender_clothController;

    public static async getInstance(): Promise<Gender_clothController> {
        if(Gender_clothController.instance == undefined) {
            const {Gender_cloth} = await SequelizeManager.getInstance();
            Gender_clothController.instance = new Gender_clothController(Gender_cloth);
        }
        return Gender_clothController.instance;
    }

    constructor(Gender_cloth: ModelCtor<Gender_clothInstance>) {
        this.Gender_cloth = Gender_cloth;
    }

    public async getAll(limit?: number, offset?: number): Promise<Gender_clothInstance[] | null>{
        return await this.Gender_cloth.findAll({
            limit,
            offset
        });
    }

    public async add(props: Gender_clothCreationProps): Promise<Gender_clothInstance | null> {
        return await this.Gender_cloth.create({
            ...props
        });
    }

    public async getById(id: string): Promise<Gender_clothInstance | null> {
        return await this.Gender_cloth.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: Gender_clothUpdateOption): Promise<Gender_clothInstance | null> {

        const gender_clothUpdate = await this.getById(options.id.toString());

        if(gender_clothUpdate === null)
        {
            return null;
        }
        else
        {
            return await gender_clothUpdate.update({
                ...options
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeById (id: string):Promise<Boolean> {
        const gender_clothDelete = await this.getById(id);
        if(gender_clothDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Gender_cloth.destroy({
                    where:{
                        id: gender_clothDelete.id
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
