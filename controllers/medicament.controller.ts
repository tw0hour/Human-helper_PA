import {ModelCtor} from "sequelize";
import {SequelizeManager} from "../models";
import {MedicamentCreationProps, MedicamentInstance} from "../models/medicament";


export interface MedicamentUpdateOption {
    id?:string;
    name?:string;
    expirationDate?: string;
    volunteer_id?:number;
    delivery_id?:number;
    association_id?:number;
}

export class MedicamentController {

    Medicament: ModelCtor<MedicamentInstance>;

    private static instance: MedicamentController;

    public static async getInstance(): Promise<MedicamentController> {
        if(MedicamentController.instance == undefined) {
            const {Medicament} = await SequelizeManager.getInstance();
            MedicamentController.instance = new MedicamentController(Medicament);
        }
        return MedicamentController.instance;
    }

    constructor(Medicament: ModelCtor<MedicamentInstance>) {
        this.Medicament = Medicament;
    }

    public async getAll(limit?: number, offset?: number): Promise<MedicamentInstance[] | null>{
        return await this.Medicament.findAll({
            limit,
            offset
        });
    }

    public async add(props: MedicamentCreationProps): Promise<MedicamentInstance | null> {
        return await this.Medicament.create({
            ...props
        });
    }

    public async getById(id: string): Promise<MedicamentInstance | null> {
        return await this.Medicament.findOne({
            where :{
                id: id
            }
        });
    }
    public async update(options: MedicamentUpdateOption): Promise<MedicamentInstance | null> {
        if(options.id === undefined){
            return null;
        }
        const medicamentUpdate = await this.getById(options.id.toString());

        if(medicamentUpdate === null)
        {
            return null;
        }
        else
        {
            return await medicamentUpdate.update({
                ...options
            }, {
                where: {
                    id: options.id
                }
            });
        }
    }

    public async removeById (id: string):Promise<Boolean> {
        const medicamentDelete = await this.getById(id);
        if(medicamentDelete === null)
        {
            return false;
        }
        else
        {
            try
            {
                await this.Medicament.destroy({
                    where:{
                        id: medicamentDelete.id
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
