import {ModelCtor, where} from "sequelize";
import {SequelizeManager} from "../models";
import {AssociationCreationProps, AssociationInstance} from "../models/association";
import {ClothController} from "./cloth.controller";
import {FoodController} from "./food.controller";
import {MedicamentController} from "./medicament.controller";


export interface AssociationUpdateOption {
    id:number;
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

    public async checkDoublonMail (mail: string): Promise<Boolean> {
        const doublonMail = await this.Association.findOne({
            where :{
                mail: mail
            }
        });

        if(doublonMail === null){
            return false;
        }
        return true;
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

        const associationUpdate = await this.getById(options.id.toString());

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

    public async updatePassword(id:string, password: string): Promise<AssociationInstance | null> {

        const associationUpdate = await this.getById(id.toString());

        if(associationUpdate === null)
        {
            return null;
        }
        else
        {
            return await associationUpdate.update({
                password: password
            }, {
                where: {
                    id: id
                }
            });
        }
    }

    public async passwordSameAsTheOldOne(id: string, newPassword: string): Promise<boolean | null> {
        const association = await this.Association.findOne({
            where :{
                id: id
            }
        });
        if(!association){
            return null;
        }
        const oldPassword = association.password;

        if(oldPassword === newPassword){
            return true;
        }
        return false;
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


    /**
     * Return the name of the table which has the least stock
     * @param associationId
     */
    public async needs(associationId: string): Promise<{ name: string; quantity: number }[] | null>{
        const association = await this.getById(associationId);
        if(!association) {
            return null;
        }

        const clothController = await ClothController.getInstance();
        const nbClothDonation = await clothController.nbClothDonation(associationId);

        const foodController = await FoodController.getInstance();
        const nbFoodDonation = await foodController.nbFoodDonation(associationId);

        const medicamentController = await MedicamentController.getInstance();
        const nbMedicamentDonation = await medicamentController.nbMedicamentDonation(associationId);

        if(nbClothDonation === null || nbFoodDonation === null || nbMedicamentDonation === null) {
            return null;
        }

        const needsTab = [nbClothDonation, nbFoodDonation, nbMedicamentDonation];

        return needsTab.filter((value) => {
            const min = Math.min(nbClothDonation.quantity, nbFoodDonation.quantity, nbMedicamentDonation.quantity);
            console.log("min : " + min);
            if (value.quantity === min) {
                console.log("forEach : " + value.name);
                return value.name;
            }
        });
    }

    public async updateMoney(association_id: number, amountGiven:number) : Promise<boolean | null> {

        const association = await this.getById(association_id.toString());
        if (!association) return null;


        const associationUpdate = await association.update({
            money: parseInt(association.money+"") + parseInt(amountGiven+"")
        }, {
            where: {
                id: association_id
            }
        });

        if (!associationUpdate) return false;
        return true;
    }
}
