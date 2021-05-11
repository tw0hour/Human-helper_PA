import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {GenderClothCreationProps, GenderClothInstance, GenderClothProps} from "../models/genderCloth";



export interface GenderClothUpdateOption {
    id:string;
    type:string;
}

export class GenderClothController {

    Gender_cloth: ModelCtor<GenderClothInstance>;

    private static instance: GenderClothController;

    public static async getInstance(): Promise<GenderClothController> {
        if(GenderClothController.instance == undefined) {
            const {GenderCloth} = await SequelizeManager.getInstance();
            GenderClothController.instance = new GenderClothController(GenderCloth);
        }
        return GenderClothController.instance;
    }

    constructor(Gender_cloth: ModelCtor<GenderClothInstance>) {
        this.Gender_cloth = Gender_cloth;
    }

    public async getAll(limit?: number, offset?: number): Promise<GenderClothInstance[] | null>{
        return await this.Gender_cloth.findAll({
            limit,
            offset
        });
    }

    public async add(props: GenderClothCreationProps): Promise<GenderClothInstance | null> {
        return await this.Gender_cloth.create({
            ...props
        });
    }

    public async getById(id: string): Promise<GenderClothInstance | null> {
        return await this.Gender_cloth.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: GenderClothUpdateOption): Promise<GenderClothInstance | null> {

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
