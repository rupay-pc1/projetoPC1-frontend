import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from 'date-fns';

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

export const formatDate = (dateString) => {
  if (!dateString) {
    return '';
  }

  const date = new Date(dateString);
  return format(date, 'dd/MM/yyyy HH:mm:ss');
};

export function orderByDate(list) {
  var sortedList = list.slice(0);

  sortedList.sort(function (a, b) {
    var dateA = new Date(a.purchaseDate);
    var dateB = new Date(b.purchaseDate);
    return dateB - dateA;
  });

  return sortedList;
}


export const sortTableContentByDateField = (content, order, dateField) => {
  return [...content].sort((a, b) => {
    const dateA = a[dateField] ? new Date(a[dateField].split('/').reverse().join('-')) : null;
    const dateB = b[dateField] ? new Date(b[dateField].split('/').reverse().join('-')) : null;

    if (dateA === null && dateB === null) return 0;
    if (dateA === null) return 1;
    if (dateB === null) return -1;

    return order === 'asc' ? dateA - dateB : dateB - dateA;
  });
};