import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatter.format(value);
}

export function formatDate(date) {
  var dia = String(date.getDate()).padStart(2, "0");
  var mes = String(date.getMonth() + 1).padStart(2, "0");
  var ano = date.getFullYear();
  var horas = String(date.getHours()).padStart(2, "0");
  var minutos = String(date.getMinutes()).padStart(2, "0");

  return dia + "/" + mes + "/" + ano + " " + horas + ":" + minutos;
}

export function orderByDate(list) {
  var sortedList = list.slice(0);

  sortedList.sort(function (a, b) {
    var dateA = new Date(a.purchaseDate);
    var dateB = new Date(b.purchaseDate);
    return dateB - dateA;
  });

  return sortedList;
}
