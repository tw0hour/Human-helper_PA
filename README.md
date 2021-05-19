# API Human-helper_PA

**association :**

**camp :**
**cloth :**
**delivery :**
**donation :**
**donation :**
**food :**
**genderCloth :**
**medicament :**

**planningCamp :**


**typeCloth :**
- ne peut pas ajouter un type déjà existant -> ```checkDoublonTypeCloth(type: string)```

**typeFood :**
- ne peut pas ajouter un type déjà existant -> ```checkDoublonTypeFood(type: string)```

**volunteer :**
- lors d'un update le mot de passe ne peut pas être identique à l'ancien -> ```passwordSameAsTheOldOne(id:string, newPassword: string)```
- un user ne peut pas être ajouter avec un email déja existant dans la bdd -> ```checkDoublonMail(mail: string)```




