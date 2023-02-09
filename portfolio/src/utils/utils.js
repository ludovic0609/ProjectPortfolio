// retourne la  date au format FR
export function displayDate(date_command){
    const date_format = new Date(date_command);
    return date_format.toLocaleDateString("fr-FR");
}

//retourne l'année d'une date en YYYY (ex : 2022)
export function displayDateYear(date_command){
    const date_format = new Date(date_command);
    return date_format.getFullYear();
}
// return le mois et l'année en YYYY (ex : Octobre 2022)
export function displayDateMonthYear(date_command){
    const date_format = new Date(date_command);
    const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
];
    return monthNames[date_format.getMonth()] + " "+date_format.getFullYear();
}

