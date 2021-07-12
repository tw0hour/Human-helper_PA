# API Human-helper_PA


###***Association :***
- ####get by id **Association** 
  - (required attributes : `association_id`)
    

- ####add **Association** 
  - (required attributes : `name`, `mail`, `password` and `money`)
    

- ####get all **Association**
  

- ####get by name **Association** 
  - (required attributes : `name`)
    

- ####connexion **Association** 
  - (required attributes : `name`, `password`)
    -  angular app, stock management
    

- ####update **Association** 
  - (need for 1 minimum attribute)
    

- ####delete **Association** 
  - (required attributes : `association_id`)

- ####needs **Association**
  - (required attributes : `association_id`)
      - Get the name of the table which has the least stock





###***Camp :***
- ####get all **Camp**
  

- ####get by id **Camp**
    - (required attributes : `camp_id`)
      

- ####update **Camp**
  - (need for 1 minimum attribute)


- ####delete **Camp**
    - (required attributes : `camp_id`)

- ####add **Camp**
    - (required attributes : `nbPeople`, `city`, `address` and `postalCode`)
    
- ####add **Association** to **Camp**
    - (required attributes : `camp_id`, `association_id`)
      - **Association** must exist
    
- ####add **PlanningCamp** to **Camp**
    - (required attributes : `camp_id`, `planningCamp_id`)
      - **PlanningCamp** must exist




###***Cloth :***
- ####get all **Cloth**


- ####get all **Cloth** in stock
  - get all **Cloth** where `delivery_id` is *null*


- ####get by id **Cloth**
    - (required attributes : `cloth_id`)


- ####update `genderCloth_id` in **Cloth**
  - ( required attributes : `cloth_id`, `idGenderCloth`)


- ####delete **Cloth**
    - (required attributes : `cloth_id`)


- ####add **Cloth**
    - (required attributes : `name`, `size`, `volunteer_id`, `type_cloth_id`, `gender_cloth_id` and `association_id`)


- ####update **Cloth**
    - ( `name` and/or `size` and/or `delivery_id` )
  

- ####update `typeCloth_id` in **Cloth**
    - ( required attributes : `idCloth`, `idTypeCloth`)

  
- #### get **Cloth** by `delivery_id`


###***Delivery :***
- ####get all *Delivery*


- ####get **Delivery** by id
  - (required attributes : `delivery_id`)
  

- ####get **Delivery** by `status` *delivered* 


- ####get **Delivery** by `status` *delivery*


- ####add **Delivery**
  - (by default `status` = *delivery*)


- ####set `status` **Delivery** at *delivered*
  - (required attributes : `delivery_id`)

- ####delete **Delivery**
  - (required attributes : `delivery_id`)



###***Donation :***
- ####get all **Donation**


- ####get **Donation** by `donation_id`


- ####add **Donation**
  - (required attributes : `date` `amountGiven` `association_id` `volunteer_id`)

- ####delete **Donation** by `donation_id`



###***Food :***
- ####get all **Food**


- ####get all **Food** in stock
  - (`delivery_id` == *null*)

  
- ####get **Food** by `food_id`

- ####add **Food** by **Volunteer**
  - (required attributes : `name` `expirationDate` `volunteer_id` `type_food_id` `association_id`)

- ####add **Food** by **Association**
  - (required attributes : `name` `expirationDate` `type_food_id` `association_id`)

- ####update **Food** `name` and/or `type_food_id` and/or `expirationDate`

- ####delete **Food** by `id`

- ####get **Food** by `delivery_id`



###***GenderCloth :***
- ####get all **GenderCloth**

- ####get **GenderCloth** by `id`

- ####add **GenderCloth**
  - (required attributes : `type`) [ man woman girl boy ]
  
- ####delete **GenderCloth** by `id`



###***Medicament :***
- ####get all **Medicament**

- ####get all **Medicament** in stock
  - (where `delivery_id` == *null*)
  
- ####get **Medicament** by `id`

- ####add **Medicament** by **Volunteer**
  - (required attributes : `name` `expirationDate` `association_id` `volunteer_id`)

- ####add **Medicament** by **Association**
  - (required attributes : `name` `expirationDate` `association_id`)

- ####update **Medicament `name` `expirationDate`

- ####delete **Medicament** by `id`


###***PlanningCamp :***
- ####get all **PlanningCamp**

- ####get **PlanningCamp** by `id`

- ####add **PlanningCamp**
  - (required attributes : `day` `timeslot`)

- ####delete **PlanningCamp** by `id`



###***TypeCloth :***
- ne peut pas ajouter un type déjà existant -> ```checkDoublonTypeCloth(type: string)```

- ####get all **TypeCloth**

- ####get **TypeCloth** by `id`

- ####add **TypeCloth**
  - (required attributes: `type`) [ pantalon pull veste ... ]
  
- ####update **TypeCloth** `type`

- ####delete **TypeCloth** by `id`



###***TypeFood :***
- ne peut pas ajouter un type déjà existant -> ```checkDoublonTypeFood(type: string)```

- ####get all **TypeFood**

- ####get **TypeFood** by `id`

- ####add **TypeFood**
  - (required attributes : `type` )
  
- ####delete **TypeFood** by `id`

###***Volunteer :***
- lors d'un update le mot de passe ne peut pas être identique à l'ancien -> ```passwordSameAsTheOldOne(id:string, newPassword: string)```
- un user ne peut pas être ajouter avec un email déja existant dans la bdd -> ```checkDoublonMail(mail: string)```

- ####get all **Volunteer**

- #### get **Volunteer** by `id`

- #### add **Volunteer**
  - (required attributes : `name` `mail` `password` `type` ) 
  
- #### connexion **Volunteer**
  - (required attributes : `name` `password` )
  
  
- #### update **Volunteer** `name` and/or `mail` and/or `password` and/or `type`

- #### delete **Volunteer** by `id`
